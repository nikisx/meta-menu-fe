<template>
            <modal :visible="visible" @close="$emit('close')" >
                <form @submit.prevent="submit" class="form-group" enctype="multipart/form-data">
                    <div class="container">
                    <h3 v-if="!editItem">Добавяне на храна</h3>
                    <h3 v-else>Обновяване на {{editItem.name}}</h3>
                    <hr>
                    <div style="position: relative">
                        <input type="text" v-model="name"  class="form-control-input form-input" id="cname" required>
                        <label class="label-control" style="font-size: 12px;" for="cname" >Име <span style="color: red;">*</span></label>
                        <b v-if="nameError" style="color: red;" class="help-block with-errors">Името е задължително</b>
                    
                    </div>
                    <div style="position: relative;margin-top: 10px;">
                        <textarea type="text" v-model="description"  class="form-control-input form-input" id="cname">
                        </textarea>
                        <label class="label-control" style="font-size: 12px;width: 90%;text-align: left;background: rgb(248, 246, 242);top: 0px;" for="cname" >Описание</label>
                        <div class="help-block with-errors"></div>
                    </div>
                    <div style="position: relative;margin-top: 10px;">
                        <input type="text" v-model="allergens"  class="form-control-input form-input" id="cname"/>
                        <label class="label-control" style="font-size: 12px;" for="cname" >Алергени</label>
                        <div class="help-block with-errors"></div>
                    </div>
                    <div style="position: relative;margin-top: 10px;">
                        <input type="number" step="0.1" v-model="price"  class="form-control-input form-input" id="cname"/>
                        <label class="label-control" style="font-size: 12px;" for="cname" >Цена  <span style="color: red;">*</span></label>
                        <b v-if="priceError" style="color: red;" class="help-block with-errors">Цената е задължителна</b>
                    </div>
                    <div style="position: relative;margin-top: 10px; display: flex; justify-content: space-between;">
                        <label style="display: flex;align-items: center;gap: 10px;cursor: pointer;" for="file-upload" >
                            <font-awesome-icon class="btn-solid-lg" style="font-size: 25px;padding: 4px 10px;cursor: pointer;" icon="fa-solid fa-upload" />
                            <p style="font-weight: bold;">Качи снимка</p>
                        </label>
                        <img v-show="image" id="previewImage" style="width: auto;height: 200px;" src="#" />
                        <img v-if="!image && imageBytes" id="previewImage" style="width: auto;height: 200px;" :src="'data:image/png;base64,'+ imageBytes" />
                        <input type="file" style="display:none;" id="file-upload" @change="onFileChange"  />
                    </div>
                    <hr>
                    <button type="button" v-if="!isLoading" @click="submit" class="btn-solid-lg">
                        <span>{{editItem ? 'Обнови' : 'Добави'}}</span>
                    </button>
                    <div v-else style="background: white;padding: 14px 47px;"  class="btn-solid-lg">
                        <small-loader style="height: 20px;width: 20px;"></small-loader>
                    </div>
                </div>
                
                </form>
            </modal>
        
</template>

<script>
import {post, get} from '../../request'
import Modal from '../Shared/Modal.vue';
import SmallLoader from '../Shared/SmallLoader.vue';

export default {
    data() {
      return {
        id:0,
        name: null,
        description: null,
        allergens: null,
        price: null,
        image: null,
        imageBytes: null,
        nameError: false,
        priceError: false,
        isLoading: false,
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
        SmallLoader,
    },
    methods:{
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
           this.image = files[0];
           let previewImage = document.getElementById('previewImage');
           previewImage.src = URL.createObjectURL(files[0])
        },
        resetData(){
            this.priceError = false;
            this.nameError = false;
            if(this.editItem)
            {
                this.id = this.editItem.id;
                this.name = this.editItem.name;
                this.description = this.editItem.description;
                this.allergens = this.editItem.allergens;
                this.price = this.editItem.price;
                this.image = this.editItem.image;
                this.imageBytes = this.editItem.imageBytes;
            }
            else{
                this.name = null;
                this.description = null;
                this.allergens = null;
                this.price = null;
                this.image = null;
                this.imageBytes = null;
            }
            
        },
        submit(){

            this.isLoading = true;
            const formData = new FormData()

            if(!this.name){
             this.nameError = true;
             this.isLoading = false;
             return;
            }
             

            if(!this.price){
             this.priceError = true;
             this.isLoading = false;
             return;
            }
            

            formData.append('image', this.image)
            formData.append('id', this.id)
            formData.append('name', this.name)
            formData.append('categoryId', this.categoryId)
            if(this.description != null)
             formData.append('description', this.description)

            if(this.allergens != null)
            formData.append('allergens', this.allergens)

            formData.append('price', this.price)
            formData.append('imageBytes', this.imageBytes)

            let url = this.editItem ? '/fooditem/edit' :'/fooditem/create';
            post(url,formData)
            .then(res => {
                if(res.data.success){
                    this.priceError = false;
                    this.nameError = false;
                    this.$emit('success');
                    this.$emit('close');
                    this.isLoading = false;
                }
            })
            .catch(e => {alert(e.message)})
        },
    }
}
</script>

<style>
    .form-input{
        background-color: rgb(248, 246, 242);
        color: rgb(113, 109, 102);
        border-color: rgb(248, 246, 242);
    }
</style>