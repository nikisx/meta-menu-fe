<template>
  <div @click.prevent="close($event)" class="modal-backdrop" v-if="active">
  </div>
   <div @click.prevent="close($event)" class="slider-modal" :style="{'right': active ? '' : closingWidth}">
       <span @click="close" style="color: red; cursor: pointer; position: fixed;
       width: 500px; background: white; border-radius: 10px; margin-bottom: 30px;" id="close-modal">
         X Close</span>
        <slot name="header">
        </slot>
  
        <slot :style="modalStyles">
            
        </slot>
  
        <slot name="footer">
        </slot>
      </div>
  </template>
  <script>
    
    export default {
      props:{
        modalWidth: {
            type: Number,
            default: 500,
        },
        active:{
            type: Boolean,
            default: false,
        }
      },
      computed:{
        closingWidth(){
            return `-${this.modalWidth}px`
        }
      },
      methods: {
        close(e) {
          if(e.target.classList.contains('modal-backdrop') || e.target.id == 'close-modal')
          this.$emit('close');
        },
      },
     
    };
  </script>
  <style>
    .slider-modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    min-height: 500px;
    min-width: 500px;
    border-radius: 15px;
    position: absolute;
    right: 0;
    height: 100%;
    transition: 1s;
    top: 0;
    z-index: 1136;
}
  </style>