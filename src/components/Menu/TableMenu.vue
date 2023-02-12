<template>
    <section v-if="user.accountType" style="text-align: center;contain: paint; position: relative;margin-bottom: 10px;min-height: 100vh;">
        <div :style="[user.imageBytes ? {'background-image': `url('data:image/png;base64, ${user.imageBytes}'), linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.5))`} : '']" class="menu-header">
            <h1 style="color: white;">{{user.username}}</h1>
        </div>
        <div v-if="user.wifi" class="fancy-font wifi-info">
            <font-awesome-icon icon="fa-solid fa-wifi" />
            {{ user.wifi }}
        </div>
          <section class="scrollable-categories" ref="element">
            <div @click="openCart" class="category-button" style="background: rgb(255 195 0)">Сметка</div>
            <div v-for="(category, index) in user.categories.filter(x => !x.isHidden)" @click="scroolToCategory(category.id)" class="category-button" :key="index">{{category.name}}</div>
          </section>
          <button class="sticky-element" @click="openCart()">
            <span v-if="cartItmes.length" class="cart-items-number">{{calculatedItemsCount}}</span>
            <font-awesome-icon style="margin-left: -14px;" icon="fa-solid fa-cart-shopping" />
          </button>
          <section style="width: fit-content; margin: 0 auto; text-align: left;">
              <div v-for="(category, index) in user.categories.filter(x => !x.isHidden)" :id="category.id" style="margin-bottom: 10px;width: 100vw;" :key="index">
                  <p class="menu-category-name" style="margin-bottom: 0">{{category.name}} </p>
                  <ul style="padding-right: 15px;list-style: none;padding: 0;">
                      <li v-for="(food, i) in category.items.filter(x => !x.isHidden)" @click="isProductModalOpen = true;currentProduct = food;currentProduct.category = category.name" :style="{'border-left': cart[food.id] ? '4px solid #ffdf00' : ''}" class="product-item" :key="i">
                        <div :style="!isMobile ? {margin: '0 auto'} : ''">
                            <div class="food-item" >
                                <div style="display: flex;justify-content: space-between;align-items: center;">
                                    <p class="food-name">{{food.name}}</p> 
                                    <p class="food-price">{{food.price}} лв.</p>                               
                                 </div>
                                 <div style="display: flex;justify-content: space-between;">
                                    <p v-if="food.description?.length <= 76 && food.imageBytes" class="food-description">{{food.description}}</p>
                                    <p v-else-if="food.description && !food.imageBytes" style="width: 165%;color: #757b86;">{{food.description.substring(0, 240)}}
                                        <span v-if="food.description.length > 240">...</span>
                                    </p>
                                    <p v-else-if="food.description" class="food-description">{{ isMobile ? food.description.substring(0, 77) : food.description.substring(0, 240)}}...</p>
                                    <img v-if="food.imageBytes" :src="'data:image/png;base64,'+ food.imageBytes" class="food-image" alt="">
                                 </div>
                            </div>
                            <font-awesome-icon @click.stop="addToCart(food)" class="edit-table-name" style="cursor: pointer;font-size: 22px;" icon="fa-solid fa-plus" />
                            <span v-if="cart[food.id]" style="margin-right: 8px;font-size: 17px;">{{cart[food.id]}}</span>
                            <font-awesome-icon @click.stop="removeFromCart(food.id)" v-if="cart[food.id]" class="edit-table-name" style="cursor: pointer; font-size: 22px;margin-left: 8px;" icon="fa-solid fa-minus" />
                        </div>
                    </li>
                  </ul>
              </div>
          </section>
          <cart :cart="cart" @close="isCartVisible = false" :isBill="isBill" :scrolledPixels="scrolledPixels" @setBill="sendBill" @setOrder="createOrder" v-show="isCartVisible" :isLoading="isLoading" :visible="isCartVisible" :cartItmes="cartItmes"></cart>
    </section>
    <section v-else-if="user.accountType == 0">
        <h1>User not validated</h1>
    </section>
    <loader v-else style="height: 52vh;margin: 0 auto;margin-top: 217px;"></loader>
    <!-- here is a fixed button, the current one style is sticky -->
    <!-- <button class="sticky-element" style="top: 76%; position: fixed" @click="openCart()">
            <span v-if="cartItmes.length" class="cart-items-number">{{calculatedItemsCount}}</span>
            <font-awesome-icon style="margin-left: -14px;" icon="fa-solid fa-cart-shopping" />
    </button> -->
    <product-modal :product="currentProduct" @close="isProductModalOpen = false" v-show="isProductModalOpen" :cart="cart" @addToCart="addToCart" @removeFromCart="removeFromCart" :visible="isProductModalOpen"></product-modal>
  </template>
  
  <script>
  import {post, get} from '../../request.js';  
  import Cart from '../Orders/CartSlider.vue';
  import Loader from '../Shared/Loader.vue';
  import ProductModal from '../Orders/ProductModal.vue';

  export default {
      data() {
         return {
           categories: [],
           cart:{},
           cartItmes: [],
           isCartVisible: false,
           isProductModalOpen: false,
           isLoading: false,
           isBill: false,
           user:{},
           currentProduct:{},
           scrolledPixels:0,
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
        isMobile(){
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
                return true;
            }
            return false;
        },
     },
     created(){
      this.getUserInfo();
     },
     mounted(){
        this.vueOnScroll();
     },
     components:{
        Cart,
        Loader,
        ProductModal,
     },
     methods:{
        sendBill(isCard){
            this.isLoading = true;
            let obj ={
                userId: this.userId, 
                tableId: this.$route.params.tableId,
                type: isCard ? 2 : 1
            }
            
            post('/orders/create', obj)
            .then(response => {
                if(response.data.success){
                    this.isLoading = false;
            }
            })
        },
        openCart(isBill){
            this.scrolledPixels = window.pageYOffset  + 200;
            this.isCartVisible = true
            setTimeout(() => {
                this.scrolledPixels = 0;
            }, "550") 
            this.isBill = isBill;
        },
        vueOnScroll() {
           
            var prev = window.pageYOffset;
            window.addEventListener("scroll", () => {
            const refs = document.querySelector('.scrollable-categories'); // assign the reference in variable         
            if(refs){
                var curr = window.pageYOffset;

                if(curr >= 200){
                    refs.classList.add("scrollDown");
                }  
                else{
                    refs.classList.remove("scrollDown");
                }

                // if (prev > curr) {
                //     refs.classList.add("scrolled");
                //     refs.classList.remove("scrollDown");
                // } else {
                //     refs.classList.add("scrollDown");
                //     refs.classList.remove("scrolled");
                // }
                // if (curr === 0) {
                //     refs.classList.remove("scrollDown");
                //     refs.classList.remove("scrolled");
                // }
            }
                prev = curr;
            });
        },
        scroolToCategory(categoryId){
            const element = document.getElementById(categoryId);
            element.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
        },
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
            this.isLoading = true;
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
                    this.isLoading = false;
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
        width: 48px;
        background: #FF5733;
        border-radius: 36px;
        border: none;
        color: white;
        font-size: 23px;
        padding: 19px 30px;
    }
    .cart-items-number{
        background: #ffdf00;
        color: white;
        font-size: 15px;
        padding: 0px 7px;
        border-radius: 13px;
        position: absolute;
        top: -9px;
        right: -1px;
        border: 3px solid;
        font-weight: bold;
    }
    .menu-category-name{
        font-size: 20px;
        background-color: #fafafa;
        padding: 15px;
        font-weight: bold;
        text-align: center;
    }
    .product-item{
        display: flex;
        align-items: center;
        padding-bottom: 17px;
        border-bottom: 1px solid #CCC;
        margin-bottom: 17px;
        padding-left: 22px;
        padding-top: 10px;
    }
    .food-price{
        margin-bottom: 5px;
        color: #FF5733;
        width: 84px;
        border: 1px solid;
        text-align: center;
        border-radius: 15px;
    }
    .scrollable-categories{
        display: flex;
        margin-top: 23px;
        margin-bottom: -40px;
        gap: 10px;
        overflow-x: scroll;
        overflow-y: hidden;
        white-space: nowrap;
        scroll-padding-left: 1rem; /* Same as gutter */
        scroll-snap-type: x mandatory;
        position: sticky;
        top: 0;
        background: white;
        padding-bottom: 4px;
        transition: .3s ease;
        justify-content: center;
    }
    .scrollDown{
        box-shadow: 0px 5px 5px #ccc;;
    }
    .scrollable-categories::-webkit-scrollbar {
        display: none;
    }
    .category-button{
        padding: 10px 15px;
        background: #FF5733;
        color: white;
        font-weight: bold;
        scroll-snap-align: center;
        border-radius: 20px;
        scroll-snap-stop: always;
    }
    .wifi-info{
        margin-top: 10px;
        display: flex;
        align-items: center;
        gap: 7px;
        font-size: 17px;
        color: rgb(117, 123, 134);
        margin-left: 9px;
    }
    .food-name{
        margin-bottom: 5px;
        font-size: 17px;
        max-width: 300px;
    }
    .food-description{
        max-width: 500px;
        color: #757b86;
    }
    .food-image{
            width: 300px;
            border-radius: 10px;
            height:200px;
            object-fit: cover;
    }
    .food-item{
        width: 50vw;
        margin: 0 auto;
    }
    @media (max-width: 768px) {
        .scrollable-categories{
            justify-content: unset;
        }
        .food-name{
            max-width: 200px;
        }
        .food-description{
            max-width: 182px;
        }
        .food-image{
            width: 140px;border-radius: 10px;max-height: 200px;height: 100px;object-fit: cover;
        }
        .food-item{
            width: 90vw;
        }
    }
  </style>