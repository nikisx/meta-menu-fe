<template>
  <h1 style="text-align: center">Login Page</h1>
   <form @submit.prevent="submit" class="">
    <div class="container">
        <h1>Login</h1>
        <p>Please fill in this form to login.</p>
        <hr>

        <label for="email"><b>Email</b></label>
        <input type="text" v-model="email" placeholder="Email" name="text" id="email" required>

        <label for="psw"><b>Password</b></label>
        <input type="password" v-model="password" placeholder="Enter Password" name="psw" id="psw" required>
        
        <hr>

        <button type="submit" class="registerbtn">Login</button>
  </div>
  
  </form>
</template>
<script>
import {post} from '../../request.js'
export default {
   data() {
    return{
      email: null,
      password: null,
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
      let obj = {
        email: this.email,
        password: this.password,
      }
        
        post('/authentication/login', obj).then((response) => {
        if(response.data.success){
          localStorage.setItem('user', response.data.token);
          this.$store.commit('setUser', response.data.data)
          setTimeout(() => {
            this.$router.push({name:'menu-create', params:{name: response.data.data.username}})
          }, "100")
        }
      }).catch(e => {alert(e.message)})
      //   this.$http.post('https://localhost:44356', obj).then((response) => {
      //   if(response.data.success){
      //     localStorage.setItem('user', response.data.token);
      //     this.$store.commit('setUser', response.data.data)
      //     this.$router.push({name:'home'})
      //   }
      // })
    }
  }
}
</script>
