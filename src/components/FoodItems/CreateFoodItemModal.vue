<template>
      
            <modal :visible="visible" @close="$emit('close')" >
                <form @submit.prevent="submit" class="">
                    <div class="container">
                    <h1>Create Item</h1>
                    <hr>

                    <label for="name"><b>Name</b></label>
                    <input type="text" v-model="name" placeholder="Name" name="text" id="Username" required>
                    <hr>

                    <button type="button" @click="submit" class="registerbtn">{{editTrack ? 'Edit' : 'Create'}}</button>
                </div>
                
                </form>
            </modal>
        
</template>

<script>
import {post, get} from '../../request'
import Modal from '../Shared/Modal.vue';
export default {
    data() {
      return {
        id:0,
        name: null,
      };
    },
    props:{
        visible: {
            type: Boolean,
            default: false,
        },
        editItem: {
            type: Object,
            default: null,
        },
        categoryId:{
            type: Number,
            default: null,
        }
    },
    watch:{
      visible: function(){
          if(this.visible){
            this.resetData();
          }
      },
    },
    updated(){
       
    },
    components:{
        Modal,
    },
    methods:{
        resetData(){
            if(this.editItem)
            {
                this.id = this.editItem.id;
                this.name = this.editItem.name;
            }
            else{
                this.name = null;
            }
            
        },
        submit(){
            let obj = {
                id: this.id,
                name: this.name,
                categoryId: this.categoryId,
            }
            let url = this.editItem ? '/fooditem/edit' :'/fooditem/create';
            post(url,obj)
            .then(res => {
                if(res.data.success){
                    this.$emit('success');
                    this.$emit('close');
                }
            })
            .catch(e => {alert(e.message)})
        },
    }
}
</script>

<style>
</style>