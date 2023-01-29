<template>
    <modal :visible="visible" @close="$emit('close')">
        <section class="delete-modal-body">
            <font-awesome-icon style="font-size: 105px;color: #00c9db;" icon="fa-solid fa-circle-exclamation" />
            <h2 style="color: #00c9db">{{ text }}</h2>
        </section>
        <div style="display: flex; justify-content: space-around; align-items: center;">
                <span class="btn-light-grey" @click="$emit('close')">Откажи</span>
                <span class="deletebtn" style="background: #00c9db; color: white" @click="$emit('success')">Продължи</span>
            </div>
    </modal>
</template>

<script>
import Modal from './Modal.vue'
import {post} from '../../request'
export default {    
     props:{
        visible: {
            type: Boolean,
            default: false,
        },
        text: {
            type: String,
            default: null,
        },
    },
    components:{
        Modal,
    },
    computed:{
        
    },
    methods:{
       
    }
}
</script>

<style>
   .delete-modal-body{
    margin: 110px auto;
     margin-top: 90px;
     width: 500px;
 }

 @media (max-width: 768px) {
    .delete-modal-body{
        width: 100vw;
    }
 }
</style>