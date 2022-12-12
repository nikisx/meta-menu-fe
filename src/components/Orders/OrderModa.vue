<template>
    <modal :visible="visible" @close="$emit('close')" >
        <section v-if="order">
            <h3>Поръчка от маса {{order.tableNumber}}</h3>
            <hr>
            <h4 style="text-align: left;margin-left: 44px;">Продукти:</h4>
            <section style="width: 80%;margin: 0 auto;">
                <div v-for="(item, index) in order.items" style="margin-bottom: 10px; text-align: left;" :key="index">
                        <b>{{item.name}}</b>
                        <div style="display: flex; justify-content: space-between;">
                            <p>{{item.quantity}} бр. X {{item.price}} лв.</p>
                            <b>{{(item.quantity * item.price).toFixed(2)}}</b>
                        </div>
                </div>
            </section>
            <hr>
            <h5 style="display: flex;justify-content: right;margin-right: 30px;margin-bottom: 10px;">Обща сума: {{order.price}} лв.</h5>
       
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