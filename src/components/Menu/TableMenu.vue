<template>
    <section v-if="user.accountType" style="text-align: center;contain: paint; position: relative;margin-bottom: 10px;">
        <div class="menu-header">
            <h1 style="color: white;">{{user.username}} menu</h1>
        </div>
          
          <button class="sticky-element" @click="isCartVisible = true">
            <span v-if="cartItmes.length" class="cart-items-number">{{calculatedItemsCount}}</span>
            <font-awesome-icon style="margin-left: -14px;" icon="fa-solid fa-cart-shopping" />
          </button>
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
        },
        calculatedItemsCount(){
            if(this.cartItmes.length){
                let res = 0;
                for (let index = 0; index < this.cartItmes.length; index++) {
                    const element = this.cartItmes[index];
                    
                    res += this.cart[element.id];
                }

                return res;
            }
        },
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
                this.cartItmes = this.cartItmes.filter(x => x.id != itemId);
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
    .menu-header{
        background-image: url('../../assets/images/dark.jpg'), linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.5));
        width: auto;
        margin: 0 auto;
        max-width: 600px;
        height: 171px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;   
        display: flex;
        justify-content: center;
        align-items: center;
        background-blend-mode: overlay;
    }
    .sticky-element {
        position: sticky;
        left: 70%;
        top: 90%;
        width: 46px;
        background: #FF5733;
        border-radius: 34px;
        border: none;
        color: white;
        font-size: 23px;
        padding: 16px 27px;
    }
    .cart-items-number{
        background: white;
        color: black;
        font-size: 12px;
        padding: 0px 7px;
        border-radius: 10px;
        position: absolute;
        top: -9px;
        right: -1px;
        border: 0.5px solid;
    }
  </style>