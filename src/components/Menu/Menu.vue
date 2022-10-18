<template>
  <section style="text-align: center;">
        <h1>Add items</h1>
        <h3 @click="addCategory = true" style="cursor: pointer;">+ Add category</h3>
        <div v-show="addCategory">
            <input type="text">
        </div>
  </section>
</template>

<script>
export default {
    data() {
       return {
         categories: [],
         addCategory: false,
       };
     },
     computed:{
     user(){
       return this.$store.state.user;
     }
   },
   created(){
   },
   components:{
       
   },
   methods:{
       
   }
}
</script>

<style>

</style>