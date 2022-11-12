<template>
    <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link v-if="!user" to="/login">Login |</router-link>
        <router-link v-if="!user" to="/register">Register</router-link>
        <router-link v-if="user" :to="{name:'menu-create', params:{name: user.username}}" >Menu |</router-link>
        <router-link v-if="user" :to="{name:'tables'}" >Tables |</router-link> 
        <router-link v-if="user" :to="{name:'orders'}" >Orders |</router-link> 
        <router-link v-if="userIsAdmin" :to="{name:'users'}" >Users |</router-link> 
        <p v-if="user">Hello {{user.username}} </p>
        <a v-if="user" @click="logout"  style="cursor: pointer;">Logout</a>
    </nav>
 </template>
 
 <script>
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