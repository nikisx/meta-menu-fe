<template>
    <section style="text-align: center;">
          <h1>Orders</h1>
          <section style="width: 500px; margin: 0 auto; text-align: left;">
              <div v-for="(order, index) in orders" @click="currentOrder = order ; isOrderModalVisible = true" 
              style="margin-bottom: 20px; border: 1px solid #CCC; cursor: pointer; padding: 20px; border-radius: 10px;" :key="index">
                  {{order.tableNumber}}  - 
                  <span v-for="(item, i) in order.items.slice(0,2)" :key="i" style="margin-right: 10px"> {{item.name}} - {{item.quantity}}</span>
                  <span v-if="order.items.length > 2"> and other</span>
              </div>
          </section>
          <order-modal :visible="isOrderModalVisible" v-if="isOrderModalVisible" :order="currentOrder" @close="isOrderModalVisible = false"></order-modal>
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
          if(order.userId === this.user.id){
            this.orders.unshift(order);
          }
    });
     },
     components:{
      OrderModal
     },
     methods:{
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
  
  </style>