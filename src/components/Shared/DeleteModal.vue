<template>
    <modal :isDelete="true" :visible="visible" @close="$emit('close')" v-if="item">
        <section style="margin: 110px auto; margin-top: 90px;width: 500px;">
            <font-awesome-icon style="font-size: 105px;color: white;" icon="fa-solid fa-circle-exclamation" />
            <h2 style="color: white">Изтриване на {{item.name}}?</h2>
        </section>
        <div style="display: flex; justify-content: space-around; align-items: center;">
                <span class="btn-light-grey" @click="$emit('close')">Откажи</span>
                <span class="deletebtn" @click="submit">Изтриване</span>
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
        item: {
            type: Object,
            default: null,
        },
        isFormData: {
            type: Boolean,
            default: false,
        },
    },
    components:{
        Modal,
    },
    computed:{
        modalStyles(){
            return {
                'background': 'linear-gradient(87deg,#f5365c,#f56036)!important'
            }
        },
    },
    methods:{
        submit(){
            let obj = {
                id: this.item?.id,
                name: this.item?.name,
            }
            if(this.isFormData){
                obj = this.item?.data;
            }
            
             post(this.item.url, obj).then((response) => {
            if(response.data.success){
                this.$emit('success', this.item);
                this.$emit('close');
            }
            else{
                this.$toast.open({message: 'Възникна грешка, моля опитайте отново', type: 'error', position: 'top'})
               
            }
            }).catch(e => { console.log(e.message) })
        },
    }
}
</script>

<style>
    .deletebtn {
    color: #212529;
    background-color: #fff;
    border-color: #fff;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    transition: .1s ease;
}
 .deletebtn:hover{
    margin-top: -4px;
 }
 .btn-light-grey{
     background-color: lightgray;
    color:white;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
 }
 .btn-light-grey:hover{
     background-color: rgba(211, 211, 211, 0.842);
 }
</style>