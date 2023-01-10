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
        <label class="label-control" for="email">Парола</label>
    </div>

    <div class="form-group auth-input">
        <input type="password" class="form-control-input" id="password-rep" v-model="repeatedPass" required>
        <label class="label-control" for="email">Повторете паролата</label>
    </div>

    <hr>
    <p>Със създаването на акаунт вие се съгласявате с нашите <a href="#">Общи условия</a>.</p>

    <button type="submit"  style="width: 80%" class="form-control-submit-button">Регистрация</button>
  </div>
  
  <div class="container signin" style="margin-top: 10px;">
    <p>Вече имате акаунт? <router-link to="/login">Влезте</router-link>.</p>
  </div>
  </form>
</template>

<script>
import {post} from '../../request.js'

export default {
  data() {
    return{
      username: null,
      password: null,
      email: null,
      repeatedPass: null,
    }
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
      if(this.password != this.repeatedPass){
        this.$toast.open({message: 'Паролите не съвпадат', type: 'error', position: 'top'});
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
          }
      }).catch(e => {console.log(e.message)})
    }
  }
}
</script>
<style>
  .v-toast__item p{
      color: white;
    }
</style>

