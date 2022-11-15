<template>
  <section style="text-align: center">
    <h1>Users</h1>
    <section style="width: 500px; margin: 0 auto; text-align: left; border-right: 2px solid black; border-left: 2px solid black; border-top: 2px solid black">
        <div v-for="(user, index) in users" style="border-bottom: 2px solid black;display: flex;padding: 8px;" :key="index">
            <div style="width: 400px;">
                <span style="margin-right: 10px;">
                    {{user.email}}
                </span>
                <router-link :to="{name:'user-menu', params:{userId: user.id}}">
                    {{user.username}}
                </router-link>
            </div>
            <select @change="changeUserAccountType(user.id)" v-model="selected[user.id]" name="" id="">
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
         changeUserAccountType(userId){

            let type = this.selected[userId];

            let obj = {
              id: userId,
              accountType: type,
            }

              post('/users/update-type', obj).then((response) => {
                if(response.data.success){
                  this.selected[userId] = type;
                }
              }).catch(e => {alert(e.message)})
         },
     }
}
</script>

<style>

</style>