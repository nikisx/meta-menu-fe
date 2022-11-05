<template>
    <section style="text-align: center;">
          <h1>menu</h1>
          <button @click="isCartVisible = true">Order</button>
          <section style="width: 500px; margin: 0 auto; text-align: left;">
              <div v-for="(category, index) in categories" style="margin-bottom: 10px;" :key="index">
                  {{category.name}} 
                  <ul style="padding-right: 15px;">
                      <li v-for="(food, i) in category.items" :key="i">{{food.name}} 
                        <font-awesome-icon  class="edit-table-name" style="cursor: pointer; margin-right: 8px;" icon="fa-solid fa-minus" />
                        <span style="margin-right: 8px;">{{cart[food.id]}}</span>
                        <font-awesome-icon @click="addToCart(food)" class="edit-table-name" style="cursor: pointer;" icon="fa-solid fa-plus" />
                    </li>
                  </ul>
              </div>
          </section>
          <cart :cart="cart" @close="isCartVisible = false" :visible="isCartVisible" :cartItmes="cartItmes"></cart>
    </section>
  </template>
  
  <script>
  import {post, get} from '../../request.js';  
  import Cart from '../Orders/CartSlider.vue';

  export default {
      data() {
         return {
           categories: [],
           cart:{},
           cartItmes: [],
           isCartVisible: false,
         };
       },
       computed:{
       
     },
     created(){
      this.getAllCategories();
     },
     components:{
        Cart,
     },
     methods:{
        addToCart(item){
            if(this.cart[item.id]){
                this.cart[item.id] += 1;
            }
            else{
                this.cart[item.id] = 1;
                this.cartItmes.push(item);
            }
            
        },
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