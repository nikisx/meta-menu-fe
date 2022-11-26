<template style="overflow-x: hidden">
  <nav-bar></nav-bar>
  <router-view v-slot="{ Component, route }">
    <transition name="page-slide" mode="out-in">
      <div :style="[route.name != 'home' ? 'margin-top: 135px;' : '']" :key="route.name"> 
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
</template>
<script>
import NavBar from './components/Navigation/NavBar.vue';
import { loadScript } from "vue-plugin-load-script";


export default({
 components: {
  NavBar,
 },
  created(){
    this.$store.dispatch('setCurrentUser');
  },
  mounted(){
  
  },
})
</script>
<style>
 @import './assets/styles/device.min.css';
 @import './assets/styles/css/bootstrap.css';
 @import './assets/styles/css/swiper.css';
 @import './assets/styles/css/magnific-popup.css';
 @import './assets/styles/css/styles.css';
 @import './assets/styles/css/fontawesome-all.css';

.page-slide-enter-active,
.page-slide-leave-active{
  transition: 400ms ease all;
}

.page-slide-enter-from,
.page-slide-leave-to{
  opacity: 0;
  transform: translateY(60px);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
