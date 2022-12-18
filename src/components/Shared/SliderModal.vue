<template>
  <div @click.prevent="close($event)" class="modal-backdrop" v-if="active">
  </div>
   <div @click.prevent="close($event)" class="slider-modal" :style="{'right': active ? '' : closingWidth, 'min-width': modalWidth + 'px', top: scrolledPixels + 'px'}">
    <div @click.stop="close" class="modal-close-button" id="close-modal">
        <font-awesome-icon style="padding: 0 10px;" id="close-modal" icon="fa-solid fa-xmark" /></div>
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
      data(){
        return {
          scrolledPixels: 0,
        }
      },
      computed:{
        closingWidth(){
            return `-${this.modalWidth}px`
        },
      },
      watch:{
        active(){
          this.getScrolledPixels();
        }
      },
      created(){
        // document.addEventListener("scroll", (event) => {this.getScrolledPixels()});
      },
      methods: {
        getScrolledPixels(){
          this.scrolledPixels =  window.scrollY;
        },
        close(e) {
          if(e.target.classList.contains('modal-backdrop') || e.target.id == 'close-modal' || e.target.parentElement.id == 'close-modal')
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