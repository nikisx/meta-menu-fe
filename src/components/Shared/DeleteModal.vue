<template>
    <modal :isDelete="true" :visible="visible" @close="$emit('close')" v-if="item">
        <section style="margin: 110px auto; margin-top: 90px;width: 500px;">
            <font-awesome-icon style="font-size: 105px;color: white;" icon="fa-solid fa-circle-exclamation" />
            <h2 style="color: white">Изтриване на {{item.name}}?</h2>
        </section>
        <div style="display: flex; justify-content: space-around; align-items: center;">
                <span class="btn-light-grey" @click="$emit('close')">Откажи</span>
                <span v-if="!isLoading" class="deletebtn" @click="submit">Изтриване</span>
                <span v-else  style="width: 88px;" class="deletebtn">
                    <small-loader style="height: 15px;width: 15px;border-color: black;border-bottom-color: transparent; "></small-loader>
                </span>
            </div>
    </modal>
</template>

<script>
import Modal from './Modal.vue'
import {post} from '../../request'
import SmallLoader from './SmallLoader.vue'

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
    data(){
        return {
            isLoading: false,
        }
    },
    components:{
        Modal,
        SmallLoader,
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
            this.isLoading = true;
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
                    this.isLoading = false;
                }
                else{
                    this.$toast.open({message: 'Възникна грешка, моля опитайте отново', type: 'error', position: 'top'})
                    this.isLoading = false;
                }
            }).catch(e => { console.log(e.message);this.isLoading = false ;})
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