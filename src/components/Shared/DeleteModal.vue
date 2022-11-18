<template>
    <modal @close="$emit('close')" v-if="item">
        <section style="margin: 110px auto; margin-top: 160px">
            <h1>Are you sure you want to delete this {{item.name}}</h1>
            <div style="display: flex; justify-content: space-around;">
                <span class="btn-light-grey" @click="$emit('close')">Cancel</span>
                <span class="deletebtn" @click="submit">Delete</span>
            </div>
        </section>
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
    methods:{
        submit(){
            let obj = {
                id: this.item?.id,
            }
            if(this.isFormData){
                obj = this.item?.data;
            }
            
             post(this.item.url, obj).then((response) => {
            if(response.data.success){
                this.$emit('success');
                this.$emit('close');
            }
            else{
                alert(response.data.message)
            }
            }).catch(e => {alert(e.message)})
        },
    }
}
</script>

<style>
    .deletebtn {
    background-color: #f44336;
    color:white;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
}
 .deletebtn:hover{
     background-color: #f1786f;
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