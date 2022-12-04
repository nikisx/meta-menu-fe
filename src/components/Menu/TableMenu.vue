<template>
    <section v-if="user.accountType" style="text-align: center;">
          <h1>{{user.username}} menu</h1>
          <button @click="isCartVisible = true">Cart</button>
          <section style="width: 500px; margin: 0 auto; text-align: left;">
              <div v-for="(category, index) in user.categories.filter(x => !x.isHidden)" style="margin-bottom: 10px;" :key="index">
                  {{category.name}} 
                  <ul style="padding-right: 15px;">
                      <li v-for="(food, i) in category.items.filter(x => !x.isHidden)" :key="i">{{food.name}} 
                        <font-awesome-icon @click="removeFromCart(food.id)" class="edit-table-name" style="cursor: pointer; margin-right: 8px;" icon="fa-solid fa-minus" />
                        <span style="margin-right: 8px;">{{cart[food.id]}}</span>
                        <font-awesome-icon @click="addToCart(food)" class="edit-table-name" style="cursor: pointer;" icon="fa-solid fa-plus" />
                        <img v-if="food.imageBytes" :src="'data:image/png;base64,'+ food.imageBytes" style="width: 200px;" alt="">
                    </li>
                  </ul>
              </div>
          </section>
          <cart :cart="cart" @close="isCartVisible = false" @setOrder="createOrder" :visible="isCartVisible" :cartItmes="cartItmes"></cart>
    </section>
    <section v-else-if="user.accountType == 0">
        <h1>User not validated</h1>
    </section>
    <loader v-else></loader>
  </template>
  
  <script>
  import {post, get} from '../../request.js';  
  import Cart from '../Orders/CartSlider.vue';
  import Loader from '../Shared/Loader.vue';

  export default {
      data() {
         return {
           categories: [],
           cart:{},
           cartItmes: [],
           isCartVisible: false,
           user:{},
         };
       },
       props:{
        currentUserId:{
            type: String,
            default: null,
        },
     },
     computed:{
        userId(){
            let userId = this.currentUserId ? this.currentUserId : this.$route.params.userId;

            return userId;
        }
     },
     created(){
      this.getUserInfo();
     },
     components:{
        Cart,
        Loader,
     },
     methods:{
        removeFromCart(itemId){
            if(!this.cart[itemId]){
                return;
            }

            if(this.cart[itemId] > 1){
                this.cart[itemId] -= 1;
            }
            else{
                delete this.cart[itemId];
            }
        },
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
            this.cartItmes.forEach(item => item.quantity = this.cart[item.id])

            let obj ={
                userId: this.userId, 
                tableId: this.$route.params.tableId,
                items: this.cartItmes,
            }



            post('/orders/create', obj)
            .then(response => {
                if(response.data.success){
              this.cartItmes = [];
              this.cart = {};
            }
            })
        },
        getUserInfo(){
            get('/users/get-user-info?id='+this.userId)
            .then(response => {
                if(response.data.success){
                    this.user = response.data.data;
            }
            })
        },
        getAllCategories(){
          get('/foodcategory/get-all?userId='+this.userId)
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