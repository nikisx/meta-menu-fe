<template>
    <slider :active="visible" @close="$emit('close')" >
        <section style="margin-top: 30px;">
            <div v-for="(food, i) in cartItmes" :key="i">
                {{food.name}} - <span>{{cart[food.id]}}</span>
            </div>
        </section>
    </slider>
</template>

<script>
import {post, get} from '../../request'
import Slider from '../Shared/SliderModal.vue';
export default {
    data() {
      return {
       
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