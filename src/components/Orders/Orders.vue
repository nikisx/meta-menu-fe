<template>
    <section style="text-align: center;">
          <h1>Поръчки</h1>
          <section style="width: 500px; margin: 0 auto; text-align: left;">
              <div v-for="(order, index) in orders" @click="openOrderModal(order)" 
              class="order-row" :key="index">
              <div>
                <div v-if="order.isNew" class="new-order fancy-font">Нова</div>
                <div>
                  Номер на маса - <b>{{order.tableNumber}}</b>
                 </div> 
                  <p v-for="(item, i) in order.items.slice(0,2)" :key="i" style="margin-bottom: 0px; font-size: 12px;"> {{item.name}} - {{item.quantity}}бр.</p>
                  <p v-if="order.items.length > 2" style="font-size: 12px;margin-bottom: 0;">и още {{order.items.length - 2}} продукта</p>
              </div>
              <div style="display: flex; flex-direction: column; position: relative;">
                <b>{{order.time}} ч.</b>  
                <b style="position: absolute;bottom: 0px;width: 80px;">{{order.price}} лв.</b>  
              </div>
              </div>
          </section>
          <order-modal :visible="isOrderModalVisible" v-show="isOrderModalVisible" @success="getAllOrders" :order="currentOrder" @close="isOrderModalVisible = false"></order-modal>
    </section>
  </template>
  
  <script>
  import {post, get} from '../../request.js';  
  import { useSignalR } from '@dreamonkey/vue-signalr';
  import OrderModal from './OrderModa.vue';

  export default {
      data() {
         return {
            orders: [],
            isOrderModalVisible: false,
            currentOrder: null,
         };
       },
       computed:{
        signalr() {
            return useSignalR();
        },
        user(){
         return this.$store.state.user;
       }
     },
     created(){
      this.getAllOrders();
     },
     mounted(){
        this.signalr.on('NewOrderRecieved', (order) => {
          console.log(order)
          if(order.userId === this.user.id){
            if(this.orders.some(x => x.id == order.id)){
              let orderSearched = this.orders.find(x => x.id == order.id);
              var index = this.orders.indexOf(orderSearched);

              this.orders[index] = order;
            }
            else{
              this.orders.unshift(order);
            }
            
          }
    });
     },
     components:{
      OrderModal
     },
     methods:{
        openOrderModal(order){
          this.currentOrder = order ;
          this.isOrderModalVisible = true;
          if (order.isNew) {
            post('/orders/open', {id: order.id})
            .then(response => {
                  if(response.data.success){
                    this.currentOrder.isNew = false;
                  }
              })
          }
        },
        getAllOrders(){
          get('/orders/get-all')
          .then(response => {
                if(response.data.success){
                  this.orders = response.data.data;
                }
            })
         },
     }
  }
  </script>
  
  <style>
    .order-row{
      margin-bottom: 20px; 
      border: 1px solid #CCC; 
      cursor: pointer; 
      padding: 20px; 
      border-radius: 10px; 
      display: flex; 
      justify-content: space-between;
    }
    .order-row:hover{
      background:#cccccc4a;
    }
    .new-order{
      color: white;
      font-weight: bold;
      background: red;
      border-radius: 20px;
      text-align: center;
      width: 35%;
    }
  </style>