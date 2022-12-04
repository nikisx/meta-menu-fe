<template>
  <section style="text-align: center">
    <h1>Създай меню</h1>
    <div style="display: flex; justify-content: space-evenly">
      <div>
        <h3 @click="addCategory = true" style="cursor: pointer">
          + Добави категория
        </h3>
        <div :class="[addCategory ? 'expanded' : 'collapsed']">
          <div class="form-group" style="display: flex; gap: 10px;align-items: start;">
            <div>
              <input type="text" v-model="categoryName" class="form-control-input" style="width: 300px" id="cname" required>
              <label class="label-control" style="font-size: 10px;" for="cname" >Ще се добави отдолу</label>
              <div class="help-block with-errors"></div>
              <!-- <p style="font-size: 10px;">(Ще се добави отдолу)</p> -->
            </div>
           <div style="gap: 10px;display: flex;">
            <button
            class="btn btn-outline-success"
            @click="
              createCategory();
              categoryName = null;
              addCategory = false;
            "
          >
            Add
          </button>
          <button class="btn btn-outline-danger" @click="addCategory = false">Cancel</button>
           </div>
          </div>
        </div>
        <section class="menu-create-wrapper">
          <div
            v-for="(category, index) in categories"
            style="margin-bottom: 10px"
            :key="index">
          <b style="font-size: 10px">Категория</b>
          <div :class="[category.isHidden ? 'hidden' : '']">
            <input :disabled="category.isHidden" class="category-name" @input="editCategoryName($event, category.id)" type="text" :value="category.name" />
            <font-awesome-icon
              class="edit-table-name"
              @click="
                isOpenFoodItemModal = true;
                currentCategory = category;
                currentItem = null;
              "
              style="cursor: pointer;margin-right: 9px;margin-left: 12px;font-size: 20px;"
              icon="fa-solid fa-plus"
            />
            <font-awesome-icon class="btn btn-outline-danger" @click="openDeleteModal(category.name, category.id, true)" style="margin-right: 8px;font-size: 13px;padding: 5px;cursor: pointer;margin-bottom: 10px;" icon="fa-solid fa-trash" />

            <font-awesome-icon v-if="!category.isHidden"
             @click="editHideCategory(category.id, true)" 
             class="edit-table-name" title="Скрий от менюто" style="cursor: pointer;font-size: 20px; margin-right: 0;" icon="fa-solid fa-eye" />
             <font-awesome-icon v-else
             @click="editHideCategory(category.id, false)" 
             class="edit-table-name" title="Покажи в менюто" style="cursor: pointer;font-size: 20px; margin-right: 0;" icon="fa-solid fa-eye-slash" />

            <ul style="list-style: none; padding: 5px;">
              <li v-for="(food, i) in category.items" :class="[food.isHidden ? 'hidden' : '']" style="border-radius: 0;cursor: pointer; border-top: 1px solid #CCC;padding: 10px 0;display: flex;justify-content: space-between;align-items: center;" :key="i">
                <span @click="isOpenFoodItemModal = true; currentCategory = category;currentItem = food" class="food-name">{{ food.name }} </span> 
                <font-awesome-icon v-if="!food.isHidden" @click="editHideItem(food.id, true)"  title="Скрий от менюто" class="edit-table-name" icon="fa-solid fa-eye" />
                <font-awesome-icon v-else @click="editHideItem(food.id, false)"  title="Покажи в менюто" class="edit-table-name" icon="fa-solid fa-eye-slash" />
              </li>
            </ul>
          </div>
          </div>
        </section>
      </div>

     

      <div class="marvel-device iphone-x">
        <div class="notch">
          <div class="camera"></div>
          <div class="speaker"></div>
        </div>
        <div class="top-bar"></div>
        <div class="sleep"></div>
        <div class="bottom-bar"></div>
        <div class="volume"></div>
        <div class="overflow">
          <div class="shadow shadow--tr"></div>
          <div class="shadow shadow--tl"></div>
          <div class="shadow shadow--br"></div>
          <div class="shadow shadow--bl"></div>
        </div>
        <div class="inner-shadow"></div>
        <div class="screen">
           <iframe id="menu-preview" style="width: 390px; height: 810px;" src="http://localhost:8080/menu/26bd75a6-ba84-4e9f-abc1-45fd6f24591f/18" title="">
            </iframe>
        </div>
      </div>
    </div>

    <create-item-modal
      v-show="isOpenFoodItemModal"
      :visible="isOpenFoodItemModal"
      :categoryId="currentCategory.id"
      @close="isOpenFoodItemModal = false"
      :editItem="currentItem"
      @success="getAllCategories"
    ></create-item-modal>
    <delete-modal v-show="showDeleteModal" @close="showDeleteModal=false" :item="currentDeleteItem" :visible="showDeleteModal"></delete-modal>
  </section>
</template>

<script>
import { post, get } from "../../request.js";
import CreateItemModal from "../FoodItems/CreateFoodItemModal.vue";
import TableMenu from "./TableMenu.vue";
import DeleteModal from "./../Shared/DeleteModal.vue";

export default {
  data() {
    return {
      categoryName: null,
      categories: [],
      addCategory: false,
      isOpenFoodItemModal: false,
      currentItem: null,
      currentCategory: {},
      debounce: null,
      currentDeleteItem: null,
      showDeleteModal: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  created() {
    this.getAllCategories();
  },
  components: {
    CreateItemModal,
    TableMenu,
    DeleteModal,
  },
  methods: {
    openDeleteModal(name, id, isCategory){
      let item = {
        id: id,
        name: name,
        url: isCategory ? '/foodcategory/delete' : '/fooditem/delete',
      }

      this.currentDeleteItem = item;
      this.showDeleteModal = true;
    },
    editHideItem(id, hide){
      post("/fooditem/edit-hide", { isHidden: hide, id: id, name: '' }).then(
          (response) => {
            if (response.data.success) {
              this.getAllCategories();
              this.updateIframe();
            }
        });
    },
    editHideCategory(categoryId, hide){
      post("/foodcategory/edit-hide", { isHidden: hide, id: categoryId, name: '' }).then(
          (response) => {
            if (response.data.success) {
              this.getAllCategories();
              this.updateIframe();
            }
        });
    },
    updateIframe(){
      let phoneFrame = document.getElementById("menu-preview");
          if(phoneFrame){
            phoneFrame.contentWindow.location.reload();
          }
    },
    editCategoryName(event, categoryId){
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        let newName = event.target.value;

        post("/foodcategory/edit", { name: newName, id: categoryId }).then(
          (response) => {
            if (response.data.success) {
              this.getAllCategories();
              this.updateIframe();
            }
        });
      }, 600)
    },
    getAllCategories() {
      get("/foodcategory/get-all").then((response) => {
        if (response.data.success) {
          this.categories = response.data.data;
          this.updateIframe();
        }
      });
    },
    createCategory() {
      post("/foodcategory/create", { name: this.categoryName }).then(
        (response) => {
          if (response.data.success) {
            this.getAllCategories();
          }
        }
      );
    },
  },
};
</script>

<style>
.expand-transition {
  transition: all 0.5s ease;
}
/* .expand-enter defines the starting state for entering */
/* .expand-leave defines the ending state for leaving */
.expand-enter, .expand-leave {
  height: 0;
  opacity: 0;
}
.expanded{
  height: 65px;
    transition: 0.1s ease-out;
}
.collapsed{
  height: 0;
    transition: .2s ease-out;
    overflow: hidden;
}
.category-name{
  background-color: rgb(248, 246, 242);
    color: rgb(113, 109, 102);
    border-color: rgb(248, 246, 242);
    transition: color 0.2s ease 0s, background-color 0.2s ease 0s;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    width: 361px;
}
.menu-create-wrapper{
  width: 500px;
    margin: 0px auto;
    text-align: left;
    border: 0.5px solid #CCC;
    padding: 13px;
    border-radius: 10px;
}
.food-name{
  font-weight: bold;
}
.food-name:hover{
  color:#00c9db;
}
.hidden{
  background: #f0f0f0;
    border-radius: 10px;
}
</style>