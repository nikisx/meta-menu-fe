<template>
    <section style="text-align: center;">
          <h1>menu</h1>
          <button @click="createOrder">Order</button>
          <section style="width: 500px; margin: 0 auto; text-align: left;">
              <div v-for="(category, index) in categories" style="margin-bottom: 10px;" :key="index">
                  {{category.name}} 
                  <ul style="padding-right: 15px;">
                      <li v-for="(food, i) in category.items" :key="i">{{food.name}}</li>
                  </ul>
              </div>
          </section>
    </section>
  </template>
  
  <script>
  import {post, get} from '../../request.js';  
  export default {
      data() {
         return {
           categories: [],
         };
       },
       computed:{
       
     },
     created(){
      this.getAllCategories();
     },
     components:{
      
     },
     methods:{
        createOrder(){
            post('/orders/create', {userId: this.$route.params.userId, tableId: this.$route.params.tableId})
            .then(response => {
                if(response.data.success){
              
            }
            })
        },
         getAllCategories(){
          get('/foodcategory/get-all?userId='+this.$route.params.userId)
          .then(response => {
                if(response.data.success){
              this.categories = response.data.data;
            }
            })
         },
     }
  }
  </script>
  
  <style>
  
  </style>