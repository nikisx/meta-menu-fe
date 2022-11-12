<template>
  <section style="text-align: center">
    <h1>Users</h1>
    <section style="width: 500px; margin: 0 auto; text-align: left; border-right: 2px solid black; border-left: 2px solid black; border-top: 2px solid black">
        <div v-for="(user, index) in users" style="border-bottom: 2px solid black;display: flex;padding: 8px;" :key="index">
            <div style="width: 400px;">
                <span style="margin-right: 10px;">
                    {{user.email}}
                </span>
                <span>
                    {{user.username}}
                </span>
            </div>
            <select v-model="selected[user.id]" name="" id="">
                <option :value="0">Free</option>
                <option :value="1">Basic</option>
                <option :value="2">Premium</option>
                <option :value="3">Plus</option>
            </select>
        </div>
    </section>
  </section>
</template>

<script>
import {post, get} from '../../request.js';

export default {
    data() {
         return {
           users: [],
           selected:{},
         };
       },
    created(){
      this.getAllUsers();
     },
     methods:{
        getAllUsers(){
          get('/users/get-all')
          .then(response => {
                if(response.data.success){
              this.users = response.data.data;
              for(let i = 0; i < this.users.length; i++){
                let current = this.users[i];
                this.selected[current.id] = current.accountType;
              }
            }
            })
         },
     }
}
</script>

<style>

</style>