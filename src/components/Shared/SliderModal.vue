<template>
  <div @click.prevent="close($event)" class="modal-backdrop" v-if="active">
  </div>
   <div @click.prevent="close($event)" class="slider-modal" id="slider-modal-container" :style="{'right': active ? '' : closingWidth, 'min-width': modalWidth + 'px'}">
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
         
          
          if(this.active){
           
            this.scrolledPixels =  window.scrollY;
            setTimeout(() => {
              document.body.style.position = 'fixed';
            }, "500") 
           
          }
          else{
            document.body.style.position = '';
            window.scrollTo(0, this.scrolledPixels);
          }
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
    transition: .5s;
    top: 0;
    z-index: 1136;
}
  </style>