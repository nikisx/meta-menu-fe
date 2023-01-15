<template>
  <form @submit.prevent="submit" style="width: 521px; margin: 0 auto;" class="">
      <div class="container">
    <h1>Регистрация</h1>
    <hr>
    <div class="form-group auth-input">
        <input type="text" class="form-control-input" id="cname" v-model="username" required>
        <label class="label-control" for="cname">Име на обекта</label>
    </div>

    <div class="form-group auth-input">
        <input type="email" class="form-control-input" id="email" v-model="email" required>
        <label class="label-control" for="email">Имейл</label>
    </div>

    <div class="form-group auth-input">
        <input type="password" class="form-control-input" id="password" v-model="password" required>
        <label class="label-control" for="password">Парола</label>
    </div>

    <div class="form-group auth-input">
        <input type="password" class="form-control-input" id="password-rep" v-model="repeatedPass" required>
        <label class="label-control" for="password-rep">Повторете паролата</label>
    </div>

    <hr>
    <p>Със създаването на акаунт вие се съгласявате с нашите <a href="#">Общи условия</a>.</p>

    <button v-if="!isLoading" type="submit"  style="width: 80%" class="form-control-submit-button">Регистрация</button>
    <div v-else style="background: white;padding: 14px 47px;width: 80%;margin: 0 auto;"  class="form-control-submit-button">
                <small-loader style="height: 20px;width: 20px;"></small-loader>
      </div>
  </div>
  
  <div class="container signin" style="margin-top: 10px;">
    <p>Вече имате акаунт? <router-link to="/login">Влезте</router-link>.</p>
  </div>
  </form>
</template>

<script>
import {post} from '../../request.js'
import SmallLoader from '../Shared/SmallLoader.vue';

export default {
  data() {
    return{
      username: null,
      password: null,
      email: null,
      repeatedPass: null,
      isLoading: false,
    }
  },
  components:{
    SmallLoader,
  },
  computed:{
    user(){
      return this.$store.state.user;
    }
  },
  created(){
    if(this.user){
      this.$router.push({name:'menu-create', params:{name: this.user.username}})
    }
  },
  methods:{
    submit(){
      this.isLoading = true;
      if(this.password != this.repeatedPass){
        this.$toast.open({message: 'Паролите не съвпадат', type: 'error', position: 'top'});
        this.isLoading = false;
        return;
      }
      let obj = {
        username: this.username,
        password: this.password,
        email: this.email,
      }
        
        post('/authentication/register', obj).then((response) => {
          if(response.data.success){
            this.$toast.open({message: 'Успешна регистрация', type: 'success', position: 'top'});
            this.$router.push({name:'login'})
          }
          else{
            this.$toast.open({message: response.data.message, type: 'error', position: 'top'});
            this.isLoading = false;
          }
      }).catch(e => {console.log(e.message); this.isLoading = false;})
    }
  }
}
</script>
<style>
  .v-toast__item p{
      color: white;
    }
</style>

