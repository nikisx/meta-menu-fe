<template>
    <modal :modalStyles="modalStyles" :visible="visible" @close="$emit('close')" >
        <form @submit.prevent="submit" class="">
            <div class="container">
            <h3>Добавяне на маси</h3>
            <hr>

            <label for="name"><b>Брой на масите</b></label>
            <input type="number" class="form-control-input form-input" style="padding-top: 1px;" v-model="tableNumber" min="1" required>
            <hr>

            <button type="button"  @click="submit" class="btn-solid-lg">Добави</button>
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
        tableNumber: 1,
      };
    },
    props:{
        visible: {
            type: Boolean,
            default: false,
        },
    },
    computed:{
        modalStyles(){
            return {'min-heigth': '305px'};
        },
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
            this.tableNumber = 1;
        },
        submit(){
            let url = '/tables/create';

            let obj = {tableNumber: this.tableNumber};

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