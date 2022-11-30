<template>
  <section style="text-align: center">
    <h1>Add items</h1>
    <div style="display: flex; justify-content: space-evenly">
      <div>
        <h3 @click="addCategory = true" style="cursor: pointer">
          + Add category
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
          <div>
            <input class="category-name" type="text" :value="category.name" />
            <font-awesome-icon
              class="edit-table-name"
              @click="
                isOpenFoodItemModal = true;
                currentCategory = category;
              "
              style="cursor: pointer;margin-right: 9px;margin-left: 12px;font-size: 20px;"
              icon="fa-solid fa-plus"
            />
            <font-awesome-icon title="Скрий от менюто" style="cursor: pointer;font-size: 20px;" icon="fa-solid fa-eye" />
            <ul style="list-style: none; padding: 5px;">
              <li v-for="(food, i) in category.items" style="cursor: pointer; border-top: 1px solid #CCC;padding: 10px 0;display: flex;justify-content: space-between;align-items: center;" :key="i">
                <span class="food-name">{{ food.name }} </span> <font-awesome-icon title="Скрий от менюто" icon="fa-solid fa-eye" />
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
  </section>
</template>

<script>
import { post, get } from "../../request.js";
import CreateItemModal from "../FoodItems/CreateFoodItemModal.vue";
import TableMenu from "./TableMenu.vue";

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
  },
  methods: {
    getAllCategories() {
      get("/foodcategory/get-all").then((response) => {
        if (response.data.success) {
          this.categories = response.data.data;
          let phoneFrame = document.getElementById("menu-preview");
          if(phoneFrame){
            phoneFrame.contentWindow.location.reload();
          }
          
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
  opacity: 1;
  height: 65px;
    transition: 0.3s ease-out;
}
.collapsed{
  opacity: 0;
    height: 0;
    transition: 0.3s ease-out;
    visibility: hidden;
}
.category-name{
  background-color: rgb(248, 246, 242);
    color: rgb(113, 109, 102);
    border-color: rgb(248, 246, 242);
    transition: color 0.2s ease 0s, background-color 0.2s ease 0s;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    width: 400px;
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
</style>