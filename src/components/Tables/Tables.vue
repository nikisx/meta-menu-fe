<template>
    <section style="text-align: center;">
          <h1>Добави маси</h1>
          <button @click="isAddTablesOpen = true" class="btn-solid-lg" style="margin-bottom: 20px;">+ Добавяне на маси</button>
          <section style="width: 500px; margin: 0 auto; text-align: left; border: 2px solid #CCC; border-bottom: none; border-radius: 10px;">
              <div style="border-bottom: 2px solid #CCC;padding: 10px 20px;display: flex;align-items: center;">
                <b style="width: 185px;">Номер на маса</b>
                <b style="width:155px;">Редактиране</b>
                <b>Изтегли QR код</b>
              </div>
              <div v-for="(table, index) in tables" style="border-bottom: 2px solid #CCC;padding: 10px 20px;display: flex;align-items: center;" :key="index">
                  <div style="width: 223px;">
                    <b v-if="currentTable.id != table.id" >{{table.number}}</b>
                    <input v-if="currentTable.id == table.id" class="category-name" style="width: 162px;" type="text" v-model="tableNumber">
                  </div>
                  <div style="width: 162px;">
                    <font-awesome-icon v-if="currentTable.id == table.id" @click="editTable(table)" style="font-size: 20px;" class="edit-table-name" icon="fa-solid fa-check" />
                    <font-awesome-icon v-else @click="currentTable = table;tableNumber = table.number" style="font-size: 20px;" class="edit-table-name" icon="fa-solid fa-pen-to-square" />
                  </div>
                  <a v-if="!table.loader" @click="downloadQrImage(table)" href="#"><font-awesome-icon style="font-size: 20px; margin-top: 6px;" icon="fa-solid fa-qrcode" /></a>
                  <small-loader v-if="table.loader" style="width: 20px;height: 20px;" ></small-loader>   
              </div>
          </section>
          <create-tables-modal :visible="isAddTablesOpen"  @close="isAddTablesOpen = false;" v-show="isAddTablesOpen" @success="getAllTables"></create-tables-modal>
    </section>
  </template>
  
  <script>
  import {post, get} from '../../request.js';
  import CreateTablesModal from '../Tables/CreateTablesModa.vue';
  import SmallLoader from '../Shared/SmallLoader.vue';
  
  export default {
      data() {
         return {
           isAddTablesOpen: false,
           tables:[],
           currentTable: {},
           tableNumber: null,
         };
       },
       computed:{
       user(){
         return this.$store.state.user;
       }
     },
     created(){
      this.getAllTables();
     },
     components:{
        CreateTablesModal,
        SmallLoader,
     },
     methods:{
        editTable(table){
            this.currentTable = {};
            let obj = {
                id: table.id,
                number: this.tableNumber,
            };

            post('/tables/edit', obj)
            .then(response => {
                if(response.data.success){
                    this.tableNumber = null;
                    this.getAllTables();
                }
            })
        },
        getAllTables(){
          get('/tables/get-all')
          .then(response => {
                if(response.data.success){
              this.tables = response.data.data;
            }
            })
         },
         downloadQrImage(table){
            if(!table.number){
                alert("Please enter number for table!");
                return;
            }

            table.loader = true;

            get(`/tables/download-qr?id=${table.id}`)
          .then(response => {
                    let arr = this.base64ToArrayBuffer(response.data);
                    const url = window.URL.createObjectURL(new Blob([arr], {type: "image/png"}));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'qr-code-tabe-' + table.number);
                    document.body.appendChild(link);
                    link.click();
                    table.loader = false;
            
            }).catch(e => {alert(e.message)})
         },
         base64ToArrayBuffer(base64){
            var binaryString = window.atob(base64);
            var binaryLen = binaryString.length;
            var bytes = new Uint8Array(binaryLen);
            for (var i = 0; i < binaryLen; i++) {
            var ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
            }
            return bytes;
         },
     }
  }
  </script>
  
  <style>
    .edit-table-name{
        cursor: pointer;
        margin-right: 20px;
        padding: 2px;
        border-radius: 4px;
    }
    .edit-table-name:hover{
        background: gainsboro;
    }
  </style>