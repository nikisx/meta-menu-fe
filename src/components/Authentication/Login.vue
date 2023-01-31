<template>
  <section class="login-wrapper">
    <img v-if="!isMobile" class="login-inner-image" src="../../assets/styles/images/download.png" alt="">
    <h1 v-if="!isMobile" class="fancy-font login-text">Meta menu</h1>
    <img v-if="!isMobile" class="login-image" src="../../assets/styles/images/download-background.jpg" alt="">
    <form id="contactForm "  @submit.prevent="submit"  class="auth-form">
      <div class="container">
          <h1>Вход</h1>

          <hr>
      </div>
      <div class="form-group auth-input">
        <input type="email" class="form-control-input" id="cname" v-model="email" required>
        <label class="label-control" for="cname">Имейл</label>
      </div>
      <div class="form-group auth-input">
        <input type="password" class="form-control-input" id="pass" v-model="password" required>
        <label class="label-control" for="cname">Парола</label>
        <div class="help-block with-errors"></div>
      </div>
      <hr>
      <button v-if="!isLoading" type="submit" style="width: 80%" class="form-control-submit-button"> Влез</button>
      <div v-else style="background: white;padding: 14px 47px;width: 80%;margin: 0 auto;"  class="form-control-submit-button">
                <small-loader style="height: 20px;width: 20px;"></small-loader>
      </div>
      <p class="fancy-font" style="margin-top: 20px;">Нямате акаунт? <br> Направете безплатна регистрация <span @click="$router.push({name: 'register'})" class="register-redirect">тук!</span> </p>
      <div v-show="error" class="auth-error fancy-font">{{ error }}</div>
  </form>
  </section>
  
</template>
<script>
import {post} from '../../request.js'
import SmallLoader from '../Shared/SmallLoader.vue';

export default {
   data() {
    return{
      email: null,
      password: null,
      isLoading: false,
      error: null,
    }
  },
  components:{
    SmallLoader,
  },
  computed:{
    user(){
      return this.$store.state.user;
    },
    isMobile(){
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
                return true;
            }
            return false;
        },
  },
  created(){
    if(this.user){
      this.$router.push({name:'menu-create', params:{name: this.user.username}})
    }
  },
  methods:{
    setCookie(name,value,days) {
      var expires = "";
      if (days) {
          var date = new Date();
          date.setTime(date.getTime() + (days*24*60*60*1000));
          expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  },
    submit(){
      let obj = {
        email: this.email,
        password: this.password,
      }
      
      this.isLoading = true;

        post('/authentication/login', obj).then((response) => {
        if(response.data.success){
          // localStorage.setItem('user', response.data.token);
          this.$store.commit('setUser', response.data.data);
          this.setCookie('isLoggedIn', true, 7);
          setTimeout(() => {
            this.$router.push({name:'menu-create', params:{name: response.data.data.username}})
          }, "100")
        }
      }).catch(e => {
        this.error = e.response.data; 
        this.isLoading = false;
      })
     
    }
  }
}
</script>
<style scoped>
  .login-image{
    width: 560px;
    height: 482px;
  }
  .login-wrapper{
    display: flex;
    margin: 0 auto;
    position: relative;
    -webkit-box-shadow: 0px 2px 13px 1px rgb(0 0 0 / 75%);
    -moz-box-shadow: 0px 2px 13px 1px rgba(0,0,0,0.75);
    box-shadow: 0px 2px 13px 1px rgb(0 0 0 / 75%);
    padding: 0.5px;
  }
  .login-inner-image{
    position: absolute;
    width: 300px;
    left: 12%;
    top: 32%;
  }
  .login-text{
    position: absolute;
    color: #00c9db;
    left: 12%;
    top: 10%;
  }
  .auth-input{
    width: 90%;
    margin: 0 auto;
    margin-bottom: 20px;
  }
  .auth-error{
    font-weight: bold;
    color: #fd1f1f;
    margin-top: 30px;
  }
  .register-redirect{
    cursor: pointer;
    color: #00c9db;
    font-weight: bold;
  }
  .register-redirect:hover{
    text-decoration: underline;
  }
  .auth-form{
    width: 400px;
  }
  @media (max-width: 768px) {
    .auth-form{
      width: 95vw;
    }
    .login-wrapper{
      box-shadow: none;
    }
  }
</style>
