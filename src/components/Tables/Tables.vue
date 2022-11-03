<template>
    <section style="text-align: center;">
          <h1>Add tables</h1>
          <h3 @click="isAddTablesOpen = true" style="cursor: pointer;">+ Add tables</h3>
          <section style="width: 500px; margin: 0 auto; text-align: left; border-right: 2px solid black; border-left: 2px solid black; border-top: 2px solid black">
              <div v-for="(table, index) in tables" style="border-bottom: 2px solid black" :key="index">
                  <span style="margin-right: 22px;">{{index + 1}}</span> 
                  <span v-if="currentTable.id != table.id" style="margin-right: 100px;">{{table.number}}</span>
                  <input v-if="currentTable.id == table.id" type="text" v-model="tableNumber">
                  <font-awesome-icon v-if="currentTable.id == table.id" @click="editTable(table)" class="edit-table-name" icon="fa-solid fa-check" />
                  <font-awesome-icon @click="currentTable = table;tableNumber = table.number" class="edit-table-name" icon="fa-solid fa-pen-to-square" />
                  <a @click="downloadQrImage(table)" href="#">download qr code</a>
              </div>
          </section>
          <create-tables-modal :visible="isAddTablesOpen"  @close="isAddTablesOpen = false;" v-show="isAddTablesOpen" @success="getAllTables"></create-tables-modal>
    </section>
  </template>
  
  <script>
  import {post, get} from '../../request.js';
  import axios from 'axios';
  import CreateTablesModal from '../Tables/CreateTablesModa.vue';
  
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

            get(`/tables/download-qr?id=${table.id}`)
          .then(response => {
            debugger;
                console.log(response)
                    let arr = this.base64ToArrayBuffer(response.data);
                    const url = window.URL.createObjectURL(new Blob([arr], {type: "image/png"}));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'qr-code-tabe-' + table.number);
                    document.body.appendChild(link);
                    link.click();
            
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