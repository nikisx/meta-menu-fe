<template>
    <modal :visible="visible" @close="$emit('close')" >
        <section v-if="order">
            <h3 v-if="order.type == 0">Поръчка от маса {{order.tableNumber}}</h3>
            <h3 v-else>Сметка от маса {{order.tableNumber}}</h3>
            <hr>
            <h4 v-if="order.type == 0" style="text-align: left;margin-left: 44px;">Продукти:</h4>
            <h4 v-else style="margin: 15px;">Клиентът иска да заплати сметката си {{ order.type == 1 ? 'в брой' : 'с карта' }}</h4>
            <section v-if="order.type == 0" class="orders-wrapper" >
                <div v-for="(item, index) in order.items" style="margin-bottom: 10px; text-align: left;" :key="index">
                        <b>{{item.name}}</b>
                        <div style="display: flex; justify-content: space-between;">
                            <p>{{item.quantity}} бр. X {{item.price}} лв.</p>
                            <b>{{(item.quantity * item.price).toFixed(2)}}</b>
                        </div>
                </div>
            </section>
            <hr>
            <h5 v-if="order.type == 0" style="display: flex;justify-content: right;margin-right: 30px;margin-bottom: 10px;">Обща сума: {{order.price}} лв.</h5>
       
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
.orders-wrapper{
    width: 80%;margin: 0 auto;overflow-y: auto; max-height: 408px;padding-right: 9px;
}
.orders-wrapper::-webkit-scrollbar {
    width: 10px;
}

.orders-wrapper::-webkit-scrollbar-track {
    background: #CCC;
    border-radius: 10px;
}

.orders-wrapper::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #00c9db;
}
</style>