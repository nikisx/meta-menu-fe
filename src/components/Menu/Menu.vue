<template>
  <section style="text-align: center;">
        <h1>Add items</h1>
        <h3 @click="addCategory = true" style="cursor: pointer;">+ Add category</h3>
        <div v-show="addCategory">
            <input v-model="categoryName" type="text">
            <button @click="createCategory();categoryName = null;addCategory = false;">Add</button>
            <button @click="addCategory = false">Cancel</button>
        </div>
        <section style="width: 500px; margin: 0 auto; text-align: left;">
            <div v-for="(category, index) in categories" style="margin-bottom: 10px;" :key="index">
                {{category.name}} <font-awesome-icon class="edit-table-name" @click="isOpenFoodItemModal = true; currentCategory = category" style="cursor: pointer;" icon="fa-solid fa-plus" />
                <ul style="padding-right: 15px;">
                    <li v-for="(food, i) in category.items" :key="i">{{food.name}}</li>
                </ul>
            </div>
        </section>
        <create-item-modal :visible="isOpenFoodItemModal" :categoryId="currentCategory.id" @close="isOpenFoodItemModal = false;" v-show="isOpenFoodItemModal" :editItem="currentItem" @success="getAllCategories"></create-item-modal>
  </section>
</template>

<script>
import {post, get} from '../../request.js';
import CreateItemModal from '../FoodItems/CreateFoodItemModal.vue';

export default {
    data() {
       return {
        categoryName: null,
         categories: [],
         addCategory: false,
         isOpenFoodItemModal: false,
         currentItem: null,
         currentCategory: {},
       };
     },
     computed:{
     user(){
       return this.$store.state.user;
     }
   },
   created(){
    this.getAllCategories();
   },
   components:{
    CreateItemModal,
   },
   methods:{
       getAllCategories(){
        get('/foodcategory/get-all')
        .then(response => {
              if(response.data.success){
            this.categories = response.data.data;
          }
          })
       },
       createCategory(){
        post('/foodcategory/create', {name: this.categoryName})
        .then(response => {
              if(response.data.success){
            this.getAllCategories();
          }
          })
       }
   }
}
</script>

<style>

</style>