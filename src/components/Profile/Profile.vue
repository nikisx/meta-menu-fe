<template>
   <section style="text-align: center">
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
   </section>
</template>

<script>
import {post} from '../../request.js'

export default {
    data() {
        return {
            password: null,
            oldPassword: null,
            repeatedPass: null,
        };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods:{
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