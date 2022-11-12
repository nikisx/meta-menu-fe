<template>
  <section style="text-align: center">
    <h1>Users</h1>
  </section>
</template>

<script>
import {post, get} from '../../request.js';

export default {
    data() {
         return {
           users: [],
         };
       },
    created(){
      this.getAllUsers();
     },
     methods:{
        getAllTables(){
          get('/users/get-all')
          .then(response => {
                if(response.data.success){
              this.users = response.data.data;
            }
            })
         },
     }
}
</script>

<style>

</style>