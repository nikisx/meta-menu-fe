<template>
    <modal :visible="visible" @close="$emit('close')" >
        <section v-if="order">
            <h2>{{order.tableNumber}}</h2>
        <div v-for="(item, index) in order.items" style="margin-bottom: 10px; display: flex; align-items: center;
        justify-content: center;" :key="index">
              <b>{{item.name}}</b> - <p>{{item.quantity}}</p>
        </div>
        </section>

        <button v-if="!isLoading" type="button"  @click="submit" style="margin: 0 auto;" class="btn-solid-lg-green">Обработена</button>
        <div v-else style="background: white;padding: 14px 47px;width: max-content;margin: 0 auto;"  class="btn-solid-lg-green">
                        <small-loader style="height: 20px;width: 20px;"></small-loader>
        </div>
    </modal>
</template>

<script>
import {post, get} from '../../request'
import Modal from '../Shared/Modal.vue';
import SmallLoader from '../Shared/SmallLoader.vue';

export default {
    data() {
      return {
        isLoading: false,
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
        SmallLoader,
    },
    methods:{   
        submit(){
            this.isLoading = true;
            post('/orders/finish', {id: this.order.id})
                .then(response => {
                        if(response.data.success){
                            this.$emit("success");
                            this.$emit("close");
                            this.isLoading = false;
                    }
                })
        }
    }
}
</script>

<style>
</style>