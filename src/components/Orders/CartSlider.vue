<template>
    <slider :modalWidth="isMobile ? mobileWidth : 500" :visible="isCartVisible" :active="visible" @close="$emit('close');orderSent = false;" >
        <section v-if="showContent" style="margin-top: 30px;">
            <h2>Поръчка</h2>
            <hr>
            <section v-if="cartItmes.length" style="overflow-y: scroll;max-height: 575px;">
                <div v-for="(food, i) in cartItmes" style="text-align: left;width: 90%;margin: 0 auto;margin-bottom: 20px;" :key="i">
                    <b class="fancy-font">{{food.name}}</b>
                            <div style="display: flex; justify-content: space-between;">
                                <p>{{cart[food.id]}} бр. X {{food.price}} лв.</p>
                                <b>{{(cart[food.id] * food.price).toFixed(2)}}</b>
                            </div>
                    <img v-if="food.imageBytes" :src="'data:image/png;base64,'+ food.imageBytes" style="width: 70px;border-radius: 10px;max-height: 200px;height: 50px;object-fit: cover;" alt=""/>

                </div>
            </section>
            <h4 v-else>Няма добавени продукти</h4>
            <hr>
            <h5 style="display: flex;justify-content: right;margin-right: 20px;margin-bottom: 10px;">Обща сума: {{calclulatedPrice.toFixed(2)}} лв.</h5>
            <button v-if="!isLoading" type="button"  @click="setOrder()" style="margin: 0 auto;" class="btn-solid-lg">Поръчай</button>
            <div v-else style="background: white;padding: 14px 47px;width: max-content;margin: 0 auto;"  class="btn-solid-lg">
                <small-loader style="height: 20px;width: 20px;"></small-loader>
            </div>
            <p style="font-weight: bold; color: red;" v-if="errorNoProducts">Моля добавете продукти преди да направите поръчка</p>
            <p v-if="orderSent">Поръчката е изпратена</p>
        </section>
        <section v-else style="position: absolute;left: 27%;" :style="{top: scrolledPixels + 'px'}">
            <small-loader style="height: 188px;width: 188px;"></small-loader>
        </section>
    </slider>
</template>

<script>
import {post, get} from '../../request'
import Slider from '../Shared/SliderModal.vue';
import SmallLoader from '../Shared/SmallLoader.vue';

export default {
    data() {
      return {
        orderSent: false,
        showContent: false,
        errorNoProducts: false,
      };
    },
    props:{
        visible: {
            type: Boolean,
            default: false,
        },
        isLoading: {
            type: Boolean,
            default: false,
        },
        cartItmes:{
            type: Array,
            default: [],
        },
        cart:{
            type: Object,
            default: {},
        },
        scrolledPixels:{
            type: Number,
            default: 0,
        }
    },
    computed:{
        isMobile(){
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
                return true;
            }
            return false;
        },
        mobileWidth(){
            return window.screen.width;
        },
        calclulatedPrice(){
            let res = 0;

            for (let index = 0; index < this.cartItmes.length; index++) {
                let element = this.cartItmes[index];
                
                let curr = element.price * this.cart[element.id];

                res += curr;
            }

            return res;
        },
    },
    watch:{
      visible: function(){
          this.errorNoProducts = false;
          if(this.visible){
            setTimeout(() => {
              this.showContent = true;
            }, "500") 
          }
          else {
            setTimeout(() => {
              this.showContent = false;
            }, "500") 
          }
      },
    },
    updated(){
       
    },
    components:{
        Slider,
        SmallLoader,
    },
    methods:{
        setOrder(){
            if (this.cartItmes.length) {
                this.$emit('setOrder');
                this.orderSent = true;
            }
            else{
                this.errorNoProducts = true;
            }
        }
    }
}
</script>

<style>
</style>