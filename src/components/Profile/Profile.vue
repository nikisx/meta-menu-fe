<template>
   <section style="text-align: center; margin-bottom: 50px;">
        <h3>Здравейте, {{ user.email }}</h3>
        <form @submit.prevent="submit" style="width: 521px; margin: 0 auto;" class="">
            <div class="container">
                <h4>Смяна на парола</h4>
                <hr>
                <div class="form-group auth-input">
                    <input type="password" class="form-control-input" id="password" v-model="oldPassword" required>
                    <label class="label-control" for="email">Стара парола</label>
                </div>
                <div class="form-group auth-input">
                    <input type="password" class="form-control-input" id="password" v-model="password" required>
                    <label class="label-control" for="email">Нова парола</label>
                </div>

                <div class="form-group auth-input">
                    <input type="password" class="form-control-input" id="password-rep" v-model="repeatedPass" required>
                    <label class="label-control" for="email">Повторете новата парола</label>
                </div>
                <hr>
                <button type="submit"  style="width: 80%" class="form-control-submit-button">Смяна</button>
            </div>
        </form>

        <div style="margin-top: 50px;">
            <h4>Изтриване на профил</h4>
            <p style="font-style: italic">С изтриването на профила, се изтриват и всички данни свързани с него</p>
            <button @click="openDeleteModal()" class="btn btn-outline-danger">Изтриване</button>
        </div>
        <delete-modal v-show="showDeleteModal" @close="showDeleteModal=false" @success="getAllCategories" :item="currentDeleteItem" :visible="showDeleteModal"></delete-modal>
   </section>
</template>

<script>
import {post} from '../../request.js';
import DeleteModal from "./../Shared/DeleteModal.vue";

export default {
    data() {
        return {
            password: null,
            oldPassword: null,
            repeatedPass: null,
            showDeleteModal: false,
            currentDeleteItem: null,
        };
  },
  components:{
    DeleteModal,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods:{
    openDeleteModal(){
        this.showDeleteModal = true;
        this.currentDeleteItem = {
            url: '/users/delete',
            name: 'профил',
        }
    },
    submit(){
        if(this.password != this.repeatedPass){
            this.$toast.open({message: 'Паролите не съвпадат', type: 'error', position: 'top'});
        return;
      }

      const obj = {
        newPassword: this.password,
        oldPassword: this.oldPassword,
      }

      post('/authentication/change-password', obj).then((response) => {
          if(response.data.success){
            this.$toast.open({message: 'Успешна смяна на парола', type: 'success', position: 'top'});
          }
          else{
            this.$toast.open({message: response.data.message, type: 'error', position: 'top'});
          }
      }).catch(e => {console.log(e.message)})
     

    },
  },
}
</script>

<style>

</style>