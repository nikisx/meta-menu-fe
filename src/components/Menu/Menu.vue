<template>
  <section style="text-align: center">
    <h1>Създай меню</h1>
    <div style="display: flex; justify-content: space-evenly">
      <div>
        <ul class="nav nav-tabs fancy-font menu-nav" id="lenoTabs" role="tablist" >
          <li @click="selectedTab = 'menu'" class="nav-item" data-v-9ea40744="" style="cursor: pointer;"><a class="nav-link" :class="[{'active-menu-toggle': selectedTab == 'menu'}]" id="nav-tab-2" data-toggle="tab" role="tab" aria-controls="tab-2" aria-selected="false">Меню</a></li>
          <li @click="selectedTab = 'info'" class="nav-item" data-v-9ea40744="" style="cursor: pointer;"><a class="nav-link" :class="[{'active-menu-toggle': selectedTab == 'info'}]" id="nav-tab-1" data-toggle="tab" role="tab" aria-controls="tab-1" aria-selected="true" >Информация за обекта</a></li>
        </ul>

        <section v-if="selectedTab == 'info'" style="margin-bottom: 30px;margin-left: 5px;" :style="{width: isMobile ? 'width: 97vw;' : '500px'}">
          <div style="display: flex; flex-direction: column;text-align: left;">
            <b style="font-size: 10px">Име</b>
            <input class="category-name" @input="editUsername($event, true)"  type="text" :value="user.username" />
          </div>
          <div style="display: flex; flex-direction: column;text-align: left;margin-top: 10px;">
            <b style="font-size: 10px">WiFi</b>
            <input class="category-name" @input="editUsername($event)"  type="text" :value="user.wifi" />
          </div>
          <div class="profile-image-upload">
            <div style="display: flex;justify-content: space-between;margin-bottom: 10px;">
              <label style="display: flex;align-items: center;gap: 10px;cursor: pointer;" for="file-upload-profile" >
                <font-awesome-icon class="btn-solid-lg" style="font-size: 25px;padding: 4px 10px;cursor: pointer;" icon="fa-solid fa-upload" />
                <p style="font-weight: bold;">Качи снимка</p>
              </label>
              <button v-if="image" @click="editUserImage" class="btn btn-outline-success">Запази</button>
              <button v-if="image || user.imageBytes" class="btn btn-outline-danger" @click="deleteImage()">Премахни</button>
            </div>
          
            <img v-show="image" id="previewImage-profile" class="profile-image-preview" src="#" />
            <img v-if="!image && !user.imageBytes" id="previewImage-profile" class="profile-image-preview" src="../../assets/images/dark.jpg" />
            <img v-if="!image && user.imageBytes" id="previewImage-profile" class="profile-image-preview" :src="'data:image/png;base64,'+ user.imageBytes" />
            <input type="file" style="display:none;" id="file-upload-profile" @change="onFileChange($event)"  />
          </div>
        </section>
      
        <section v-if="selectedTab == 'menu'">
            <h3 @click="addCategory = true" style="cursor: pointer">
            + Добави категория
          </h3>
          <div :class="[addCategory ? 'expanded' : 'collapsed']">
            <div class="form-group" style="display: flex; gap: 10px;align-items: start;">
              <div>
                <input type="text" v-model="categoryName" placeholder="Супи, Пици и т.н." class="form-control-input" :style="{width: isMobile ? '185px' : '300px'}" id="cname" required>
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
              <span class="tooltip-container">
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
              <span class="tooltip-text">Добави продукт</span>
              </span>
              <span  class="tooltip-container">
                <font-awesome-icon class="btn btn-outline-danger" @click="openDeleteModal(category.name, category.id, true)" style="margin-right: 8px;font-size: 13px;padding: 5px;cursor: pointer;margin-bottom: 10px;" icon="fa-solid fa-trash" />
                <span class="tooltip-text">Изтрий категория</span>
              </span>
              <span v-if="!category.isHidden" class="tooltip-container">
                <font-awesome-icon @click="editHideCategory(category.id, true)" 
                class="edit-table-name" style="cursor: pointer;font-size: 20px; margin-right: 0;" icon="fa-solid fa-eye" />
                <span class="tooltip-text">Скрий от меню</span>
              </span>
              <span v-else class="tooltip-container">
                <font-awesome-icon @click="editHideCategory(category.id, false)" 
                class="edit-table-name" style="cursor: pointer;font-size: 20px; margin-right: 0;" icon="fa-solid fa-eye-slash" />
                <span class="tooltip-text">Покажи в меню</span>
              </span>

              <ul style="list-style: none; padding: 5px;">
                <li v-for="(food, i) in category.items" :class="[food.isHidden ? 'hidden' : '']" style="border-radius: 0;cursor: pointer; border-top: 1px solid #CCC;padding: 10px 0;display: flex;justify-content: space-between;align-items: center;" :key="i">
                  <span class="tooltip-container" >
                    <span @click="isOpenFoodItemModal = true; currentCategory = category;currentItem = food" class="food-name">{{ food.name }} </span> 
                    <span class="tooltip-text" style="left: -3%;top: 24px;">Редактирай</span>
                  </span>
                  <div>
                    <span class="tooltip-container">
                      <font-awesome-icon class="btn btn-outline-danger" @click="openDeleteModal(food.name, food.id, false)" style="margin-right: 8px;padding: 5px;cursor: pointer;font-size: 11px;" icon="fa-solid fa-trash" />
                      <span class="tooltip-text" style="top: 24px;">Изтрий продукт</span>
                    </span>
                    <span v-if="!food.isHidden" class="tooltip-container">
                      <font-awesome-icon  @click="editHideItem(food.id, true)" class="edit-table-name" icon="fa-solid fa-eye" />
                      <span class="tooltip-text">Скрий от меню</span>
                    </span>
                    <span v-else class="tooltip-container">
                      <font-awesome-icon  @click="editHideItem(food.id, false)" class="edit-table-name" icon="fa-solid fa-eye-slash" />
                      <span class="tooltip-text">Покажи в меню</span>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            </div>
          </section>
        </section>
      </div>

      <div v-if="user && !isMobile" class="marvel-device iphone-x">
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
           <iframe id="menu-preview" style="width: 390px; height: 810px;" :src="`http://localhost:8080/menu/${user.id}/18`" title="">
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
    <delete-modal v-show="showDeleteModal" @close="showDeleteModal=false" @success="handleDeleteSuccess" :item="currentDeleteItem" :visible="showDeleteModal"></delete-modal>
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
      selectedTab: 'menu',
      image: null,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    isMobile(){
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
                return true;
            }
            return false;
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
    handleDeleteSuccess(item){
      if (item.id) {
        this.getAllCategories();
      }
      else{
        if (this.user.imageBytes) {
          this.user.imageBytes = null;
          this.updateIframe();
        }
        else{
          this.image = null;
        }
      }
    },
    deleteImage(){
      let item = {
        name: 'снимка',
        url:  '/users/update-image',
      }

      this.currentDeleteItem = item;
      this.showDeleteModal = true;
    },
    editUserImage(){
      const formData = new FormData();
      formData.append('image', this.image)

      post("/users/update-image", formData).then(
          (response) => {
            if (response.data.success) {
              this.updateIframe();
              this.user.imageBytes = response.data.data;
            }
        });
    },
    onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
           this.image = files[0];
           let previewImage = document.getElementById('previewImage-profile');
           previewImage.src = URL.createObjectURL(files[0])
    },
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
    editUsername(event, isUsername){
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        let newName = event.target.value;

        const formData = new FormData();
       
        if (isUsername) {
          formData.append('username', newName)
          formData.append('wifi', this.user.wifi)
        }
        else{
          formData.append('username', this.user.username)
          formData.append('wifi', newName)
        }

        post("/users/edit-user-info", formData).then(
          (response) => {
            if (response.data.success) {
              this.updateIframe();
              if(isUsername){
                this.user.username = newName;
              }
              else{
                this.user.wifi = newName;
              }
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
.active-menu-toggle{
    color: #00c9db !important;
    background-color: #fff !important;
    border-color: #dee2e6 #dee2e6 #fff !important;
    font-weight: bold;
}
.profile-image-upload{
  margin-top: 30px;
  display: flex;
 flex-direction: column;
}
.profile-image-preview{
  width: auto;
  height: 200px;
  border-radius: 10px;
  object-fit: cover;
}
.tooltip-container{
  position: relative;
}

.tooltip-container:hover .tooltip-text{
  display: block;
}

.tooltip-text{
    position: absolute;
    top: 19px;
    left: -44%;
    width: max-content;
    background: #0000009c;
    color: white;
    text-align: center;
    border-radius: 7px;
    padding: 3px 6px;
    display: none;
    z-index: 1200;
}
@media (max-width: 768px) {
  .menu-create-wrapper{
    width: 97vw;
  }
  .category-name{
    width: 225px;
  }
  .menu-nav{
    margin-bottom: 30px;
    width: 100vw;
  }
}
</style>