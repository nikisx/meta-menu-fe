<template>
    <section style="text-align: center;">
          <h1>Orders</h1>
          <section style="width: 500px; margin: 0 auto; text-align: left;">
              <div v-for="(order, index) in orders" style="margin-bottom: 10px;" :key="index">
                  {{order.tableNumber}}  - 
                  <span v-for="(item, i) in order.items" :key="i" style="margin-right: 10px"> {{item.name}} - {{item.quantity}}</span>
              </div>
          </section>
    </section>
  </template>
  
  <script>
  import {post, get} from '../../request.js';  
  import { useSignalR } from '@dreamonkey/vue-signalr';

  export default {
      data() {
         return {
            orders: [],
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