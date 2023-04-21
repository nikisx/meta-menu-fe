<template>
    <section style="text-align: center;">
          <h1>Добави маси</h1>
          <button @click="isAddTablesOpen = true" class="btn-solid-lg" style="margin-bottom: 20px;">+ Добавяне на маси</button>
          <section class="tables">
              <div style="border-bottom: 2px solid #CCC;padding: 10px 20px;display: flex;align-items: center;">
                <b :style="{width: isMobile ? '156px' : '185px'}">Номер на маса</b>
                <b :style="{width: isMobile ? '97px' : '155px'}" >Редактиране</b>
                <b :style="[isMobile ? {'margin-left': '21px'} : '']"> <span v-if="!isMobile">Изтегли</span> QR код</b>
              </div>
              <div v-for="(table, index) in tables" style="border-bottom: 2px solid #CCC;padding: 10px 20px;display: flex;align-items: center;" :key="index">
                  <div :style="{width: isMobile ? '170px' : '196px'}" >
                    <b v-if="currentTable.id != table.id" >{{table.number}}</b>
                    <input v-if="currentTable.id == table.id" class="category-name" style="width: 162px;" type="text" v-model="tableNumber">
                  </div>
                  <div :style="{width: isMobile ? '121px' : '181px'}">
                    <span v-if="currentTable.id == table.id" class="tooltip-container">
                      <font-awesome-icon @click="editTable(table)" style="font-size: 20px;" class="edit-table-name" icon="fa-solid fa-check" />
                      <span class="tooltip-text">Запази</span>
                    </span>
                    <span v-else class="tooltip-container">
                      <font-awesome-icon @click="currentTable = table;tableNumber = table.number" style="font-size: 20px;" class="edit-table-name" icon="fa-solid fa-pen-to-square" />
                      <span class="tooltip-text">Редактирай</span>
                    </span>
                    <span class="tooltip-container">
                      <font-awesome-icon class="btn btn-outline-danger" @click="openDeleteModal(table)"  style="margin-right: 8px;font-size: 13px;padding: 5px;cursor: pointer;margin-bottom: 10px;" icon="fa-solid fa-trash" />
                      <span class="tooltip-text">Изтрий</span>
                    </span>
                  </div>
                  <span class="tooltip-container">
                    <a v-if="!table.loader" @click="downloadQrImage(table)" href="#"><font-awesome-icon style="font-size: 20px; margin-top: 6px;" icon="fa-solid fa-qrcode" /></a>
                    <span class="tooltip-text" style="top: 30px; left: -86%">Изтегли</span>
                  </span>
                  <small-loader v-if="table.loader" style="width: 20px;height: 20px;" ></small-loader>   
              </div>
          </section>
          <create-tables-modal :visible="isAddTablesOpen"  @close="isAddTablesOpen = false;" v-show="isAddTablesOpen" @success="getAllTables"></create-tables-modal>
          <delete-modal v-show="showDeleteModal" @close="showDeleteModal=false" @success="getAllTables" :item="currentDeleteItem" :visible="showDeleteModal"></delete-modal>
    </section>
  </template>
  
  <script>
  import {post, get} from '../../request.js';
  import CreateTablesModal from '../Tables/CreateTablesModa.vue';
  import SmallLoader from '../Shared/SmallLoader.vue';
  import DeleteModal from '../Shared/DeleteModal.vue';
  
  export default {
      data() {
         return {
           isAddTablesOpen: false,
           tables:[],
           currentTable: {},
           tableNumber: null,
           showDeleteModal: false,
           currentDeleteItem: null,
         };
       },
       computed:{
       user(){
         return this.$store.state.user;
       },
       isMobile(){
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
                return true;
            }
            return false;
        },
     },
     created(){
      this.getAllTables();
     },
     components:{
        CreateTablesModal,
        SmallLoader,
        DeleteModal,
     },
     methods:{
      openDeleteModal(table){
        this.showDeleteModal = true;
        this.currentDeleteItem = {
          id: table.id,
          name: table.number ?? 'маса без номер',
          url: '/tables/delete',
        }
      },
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
              this.$toast.open({message: 'Моля въведете номер на маса', type: 'error', position: 'top'});
                return;
            }

            table.loader = true;

            get(`/tables/download-qr?id=${table.id}`)
          .then(response => {
                    let arr = this.base64ToArrayBuffer(response.data);
                    const url = window.URL.createObjectURL(new Blob([arr], {type: "image/png"}));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'qr-code-table-' + table.number);
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
    .tables{
      width: 500px; 
      margin: 0 auto;
      text-align: left;
      border: 2px solid #CCC;
      border-bottom: none;
      border-radius: 10px;
    }
    @media (max-width: 768px) {
      .tables{
        width: 97vw;
      }
    }
  </style>