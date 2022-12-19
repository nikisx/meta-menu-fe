<template>

    <!-- <nav v-if="$route.name != 'menu'">
        <a v-if="user" @click="logout"  style="cursor: pointer;">Logout</a>
    </nav> -->
    <nav v-if="$route.name != 'menu'" :style="[ $route.name != 'home' ? 'background-color: #4633af' : '']" class="navbar navbar-expand-md navbar-dark navbar-custom fixed-top">
        <!-- Text Logo - Use this if you don't have a graphic logo -->
        <!-- <a class="navbar-brand logo-text page-scroll" href="index.html">Leno</a> -->

        <!-- Image Logo -->
        <router-link class="navbar-brand logo-image" to="/" ><img src="../../assets/styles/images/logo.svg" alt="alternative"></router-link> 
        
        <!-- Mobile Menu Toggle Button -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-awesome fas fa-bars"></span>
            <span class="navbar-toggler-awesome fas fa-times"></span>
        </button>
        <!-- end of mobile menu toggle button -->

        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link class="nav-link"  to="/">HOME <span class="sr-only">(current)</span></router-link>
                </li>
                <li class="nav-item">
                    <router-link v-if="!user" to="/login" class="nav-link " >LOGIN</router-link>
                </li>
                <li class="nav-item">
                    <router-link v-if="!user" to="/register" class="nav-link ">REGISTER</router-link>
                </li>
                <li class="nav-item">
                    <router-link v-if="user" :to="{name:'menu-create', params:{name: user.username}}" class="nav-link ">MENU</router-link>
                </li>
                <li class="nav-item">
                    <router-link v-if="user" :to="{name:'tables'}" class="nav-link ">TABLES</router-link>
                </li>
                 <li class="nav-item">
                    <router-link v-if="user" :to="{name:'orders'}" class="nav-link ">ORDERS</router-link>
                </li>
                <li class="nav-item">
                    <router-link v-if="user" :to="{name:'statistics'}" class="nav-link ">STATISTICS</router-link>
                </li>
                <li class="nav-item">
                    <router-link v-if="userIsAdmin" :to="{name:'users'}" class="nav-link ">USERS</router-link>
                </li>
                <li class="nav-item">
                  <p v-if="user" class="nav-link ">Hello {{user.username}} </p>
                </li>
                <li class="nav-item">
                  <a v-if="user" @click="logout" class="nav-link "  style="cursor: pointer;">LOGOUT</a>
                </li>
                <!-- Dropdown Menu -->          
                <!-- <li class="nav-item dropdown">
                    <router-link class="nav-link dropdown-toggle" href="#details" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">DETAILS</router-link>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <router-link class="dropdown-item" href="terms-conditions.html"><span class="item-text">TERMS CONDITIONS</span></router-link>
                        <div class="dropdown-items-divide-hr"></div>
                        <router-link class="dropdown-item" href="privacy-policy.html"><span class="item-text">PRIVACY POLICY</span></router-link>
                    </div>
                </li> -->
                <!-- end of dropdown menu -->

                <!-- <li class="nav-item">
                    <router-link class="nav-link " href="#contact">CONTACT</router-link>
                </li> -->
            </ul>
            <!-- <span class="nav-item social-icons">
                <span class="fa-stack">
                    <router-link href="#your-link">
                        <i class="fas fa-circle fa-stack-2x"></i>
                        <i class="fab fa-facebook-f fa-stack-1x"></i>
                    </router-link>
                </span>
                <span class="fa-stack">
                    <router-link href="#your-link">
                        <i class="fas fa-circle fa-stack-2x"></i>
                        <i class="fab fa-twitter fa-stack-1x"></i>
                    </router-link>
                </span>
            </span> -->
        </div>
    </nav> 
    <!-- end of navbar -->
 </template>
 
 <script>
  import $ from 'jquery'

 export default {
     data() {
       return {
         
       };
     },
     computed:{
     user(){
       return this.$store.state.user;
     },
     userIsAdmin(){
      if(!this.user){
        return false;
      }
      return this.user.roles.includes("Admin");
     }
   },
   created(){
   },
   mounted() {
    $(window).on('scroll load', function() {
		if ($(".navbar")?.offset()?.top > 20) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });
    },
   components:{
       
   },
   methods:{
       logout(){
           this.$store.commit('setUser', null)
           localStorage.removeItem('user')
       }
   }
 }
 </script>
 
 <style>
 </style>