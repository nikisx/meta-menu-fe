<template >
  <nav-bar></nav-bar>
  <router-view v-slot="{ Component, route }">
    <transition name="page-slide" mode="out-in">
      <div :style="[route.name != 'home' && route.name != 'menu' ? 'margin-top: 135px;' : '', 'min-height: 105vh;display: flex;flex-direction: column;']" 
      :key="route.name"> 
        <button v-if="route.name == 'menu'" class="sticky-element">Cart</button>
        <component :is="Component" />
        <footer-vue></footer-vue>
      </div>
    </transition>
  </router-view>
</template>
<script>
import NavBar from './components/Navigation/NavBar.vue';
import { loadScript } from "vue-plugin-load-script";
import Loader from './components/Shared/Loader.vue';
import FooterVue from './components/Shared/Footer.vue';

export default({
  data() {
         return {

         };
       },
 components: {
  NavBar,
  Loader,
  FooterVue,
 },
 computed: {
  isLoading() {
        return this.$store.state.isLoading;
    },
 },
  created(){
    this.$store.dispatch('setCurrentUser');
  },
  mounted(){
    this.$store.dispatch('setLoadingFalse');
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
