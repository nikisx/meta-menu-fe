<template>
    <modal :visible="visible" @close="$emit('close')" >
        <section v-if="order">
            <h2>{{order.tableNumber}}</h2>
        <div v-for="(item, index) in order.items" style="margin-bottom: 10px; display: flex; align-items: center;
        justify-content: center;" :key="index">
              <b>{{item.name}}</b> - <p>{{item.quantity}}</p>
        </div>
        </section>
    </modal>
</template>

<script>
import {post, get} from '../../request'
import Modal from '../Shared/Modal.vue';
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
        order: {
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
        Modal,
    },
    methods:{
        
    }
}
</script>

<style>
</style>