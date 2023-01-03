<template>
  <h1 style="text-align: center">Register Page</h1>
  <form @submit.prevent="submit" class="">
      <div class="container">
    <h1>Register</h1>
    <p>Please fill in this form to create an account.</p>
    <hr>

     <label for="email"><b>Username</b></label>
    <input type="text" v-model="username" placeholder="Username" name="text" id="Username" required>

    <label for="email"><b>Email</b></label>
    <input type="text" v-model="email" placeholder="Enter Email" name="email" id="email" required>

    <label for="psw"><b>Password</b></label>
    <input type="password" v-model="password" placeholder="Enter Password" name="psw" id="psw" required>

    <label for="psw-repeat"><b>Repeat Password</b></label>
    <input type="password" v-model="repeatedPass" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required>
    <hr>
    <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

    <button type="submit" class="registerbtn">Register</button>
  </div>
  
  <div class="container signin">
    <p>Already have an account? <router-link to="/login">Login</router-link>|.</p>
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
        alert("Please confirm password!");
        return;
      }
      let obj = {
        username: this.username,
        password: this.password,
        email: this.email,
      }
        
        post('/authentication/register', obj).then((response) => {
        if(response.data.success){
          alert(response.data.message)
          this.$router.push({name:'login'})
        }
      }).catch(e => {alert(e.message)})
    }
  }
}
</script>

