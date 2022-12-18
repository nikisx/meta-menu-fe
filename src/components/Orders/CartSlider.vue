<template>
    <slider :modalWidth="isMobile ? mobileWidth : 500" :visible="isCartVisible" :active="visible" @close="$emit('close');orderSent = false;" >
        <section style="margin-top: 30px;">
            <h2>Поръчка</h2>
            <div v-for="(food, i) in cartItmes" :key="i">
                {{food.name}} - <span>{{cart[food.id]}}</span>
            </div>
            <button @click="$emit('setOrder');orderSent = true;">Set order</button>
            <p v-if="orderSent">Order recieved!</p>
        </section>
    </slider>
</template>

<script>
import {post, get} from '../../request'
import Slider from '../Shared/SliderModal.vue';
export default {
    data() {
      return {
        orderSent: false,
      };
    },
    props:{
        visible: {
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
        }
    },
    watch:{
      visible: function(){
          if(this.visible){
           
          }
      },
    },
    updated(){
       
    },
    components:{
        Slider,
    },
    methods:{
        
    }
}
</script>

<style>
</style>