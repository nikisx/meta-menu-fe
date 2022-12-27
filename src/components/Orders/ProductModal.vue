<template>
    <modal :visible="visible" @close="$emit('close')" >
        <h1>{{product.name }}</h1>
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

</style>