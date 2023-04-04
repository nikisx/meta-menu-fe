<template>
    <slider :modalWidth="isMobile ? mobileWidth : 390" :visible="isCartVisible" :active="visible" @close="$emit('close');orderSent = false;" >
        <section v-if="showContent" style="margin-top: 30px;">
            <!-- Order -->
            <div v-if="!isBill">
                <h2>Поръчка</h2>
                <hr>
                <section v-if="cartItmes.length" style="overflow-y: scroll;max-height: 60vh;">
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
                <p style="font-weight: bold; color: red;" v-if="errorNoProducts">Моля добавете продукти <br> преди да направите поръчка</p>
                <p v-if="orderSent">Поръчката е изпратена</p>
            </div>
            <div v-else>
                <h2>Сметка</h2>
                <hr>
                <h5>Моля, изберете начин на плащане на сметка</h5>
                <div class="container">
                    <form>
                        <label @click="billWithCard = false;">
                            <input type="radio"  :value="false" v-model="billWithCard"/>
                            <span>Плащане в брой</span>
                        </label>
                        <label @click="billWithCard = true;">
                            <input type="radio" :value="true" v-model="billWithCard"/>
                            <span>Плащане с карта</span>
                        </label>
                    </form>
                </div>
                <button v-if="!isLoading" type="button"  @click="setOrder()" style="margin: 0 auto;" class="btn-solid-lg">Поискай сметка</button>
                <div v-else style="background: white;padding: 14px 47px;width: max-content;margin: 0 auto;"  class="btn-solid-lg">
                    <small-loader style="height: 20px;width: 20px;"></small-loader>
                </div>
                <p v-if="orderSent">Сметката е изпратена</p>
            </div>
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
        billWithCard: false,
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
        isBill: {
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
            if (this.isBill) {
                this.$emit('setBill', this.billWithCard);
                this.orderSent = true;
            } 
            else 
            {
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
}
</script>

<style scoped>
form {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}

label {
  display: flex;
  cursor: pointer;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  margin-bottom: 0.375em;
  /* Accessible outline */
  /* Remove comment to use */
  /*
  	&:focus-within {
  			outline: .125em solid $primary-color;
  	}
  */
}
label input {
  position: absolute;
  left: -9999px;
}
label input:checked + span {
  background-color: #d6d6e5;
}
label input:checked + span:before {
  box-shadow: inset 0 0 0 0.4375em #00005c;
}
label span {
  display: flex;
  align-items: center;
  padding: 0.375em 0.75em 0.375em 0.375em;
  border-radius: 99em;
  transition: 0.25s ease;
}
label span:hover {
  background-color: #d6d6e5;
}
label span:before {
  display: flex;
  flex-shrink: 0;
  content: "";
  background-color: #fff;
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  margin-right: 0.375em;
  transition: 0.25s ease;
  box-shadow: inset 0 0 0 0.125em #00005c;
}

.container {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-size: 18px;
}
</style>