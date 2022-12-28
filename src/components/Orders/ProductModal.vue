<template>
    <modal :visible="visible" @close="$emit('close')" >
        <section style="padding: 30px 13px;">
            <div class="product-details-header">
                <div>
                    <p class="food-price">{{product.category}}</p>  
                    <h4>{{product.name }}</h4>
                </div>
                <img v-if="product.imageBytes" :src="'data:image/png;base64,'+ product.imageBytes" style="width: 140px;border-radius: 10px;max-height: 200px;height: 100px;object-fit: cover;" alt="">
            </div>
            <div v-if="product.description" style="text-align: left;">
                <b style="font-size: 12px">Описание</b>
                <p>{{ product.description }}</p>
            </div>
            <div v-if="product.allergens" style="text-align: left;">
                <b style="font-size: 12px">Алергени</b>
                <p>{{ product.allergens }}</p>
            </div>
            <hr>
            <div style="display: flex;justify-content: space-between; font-size: 18px;">
                <div>
                    <font-awesome-icon @click.stop="$emit('addToCart',product)" class="edit-table-name" style="cursor: pointer;font-size: 22px;" icon="fa-solid fa-plus" />
                    <span v-if="cart[product.id]" style="margin-right: 8px;font-size: 17px;">{{cart[product.id]}}</span>
                    <font-awesome-icon @click.stop="$emit('removeFromCart',product.id)" v-if="cart[product.id]" class="edit-table-name" style="cursor: pointer; font-size: 22px;margin-left: 8px;" icon="fa-solid fa-minus" />
                </div>
                <b>Цена: {{ product.price }} лв.</b>
            </div>
        </section>
    </modal>
</template>

<script>
import Modal from '../Shared/Modal.vue';

export default {
    props:{
        product:{
            Type: Object,
            default: null,
        },
        cart:{
            Type: Object,
            default: null,
        },
        visible:{
            type: Boolean,
            default: false,
        }
    },
    data(){
        return {

        }
    },
    components:{
        Modal,
    }
}
</script>

<style>
    .product-details-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>