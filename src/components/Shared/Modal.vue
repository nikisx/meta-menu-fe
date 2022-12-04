<template>
    <transition  name="fade" appear>
    <div @click="close($event)" class="modal-backdrop">
      <transition  name="drop-in" >
      <div v-show="visible" class="modal-og" >
       <div @click.stop="close" class="modal-close-button" id="close-modal">
        <font-awesome-icon style="padding: 0 10px;" id="close-modal" icon="fa-solid fa-xmark" /></div>
        <slot name="header">
        </slot>
  
        <slot :style="modalStyles">
            
        </slot>
        
        <slot name="footer">
        </slot>
      </div>
    </transition>
    </div>
  </transition>
  </template>
  <script>
    
    export default {
      props:{
        visible: {
            type: Boolean,
            default: false,
        },
        modalStyles: {
            type: Object,
            default: false,
        },
    },
      methods: {
        close(e) {
          if(e.target.classList.contains('modal-backdrop') || e.target.id == 'close-modal' || e.target.parentElement.id == 'close-modal')
          this.$emit('close');
        },
      },
     
    };
  </script>
  <style>
    .modal-backdrop {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1100;
    }
    .modal-og {
      background: #FFFFFF;
      box-shadow: 2px 2px 20px 1px;
      overflow-x: auto;
      display: flex;
      flex-direction: column;
      min-height: 500px;
      min-width: 500px;
      border-radius: 15px;
      max-height: 700px;
    }
    .modal-header,
    .modal-footer {
      padding: 15px;
      display: flex;
    }
    .modal-header {
      position: relative;
      border-bottom: 1px solid #eeeeee;
      color: #4AAE9B;
      justify-content: space-between;
    }
    .modal-footer {
      border-top: 1px solid #eeeeee;
      flex-direction: column;
      justify-content: flex-end;
    }
    .modal-body {
      position: relative;
      padding: 20px 10px;
    }
    .btn-close {
      position: absolute;
      top: 0;
      right: 0;
      border: none;
      font-size: 20px;
      padding: 10px;
      cursor: pointer;
      font-weight: bold;
      color: #4AAE9B;
      background: transparent;
    }
    .btn-green {
      color: white;
      background: #4AAE9B;
      border: 1px solid #4AAE9B;
      border-radius: 2px;
    }
    .modal-fade-enter,
    .modal-fade-leave-to {
      opacity: 0;
    }
    .modal-fade-enter-active,
    .modal-fade-leave-active {
      transition: opacity .4s ease;
    }

    .fade-enter-active,
    .fade-leave-active {
      transition: opacity .2s linear;
    }

    .fade-enter-from,
    .fade-leave-to {
      opacity: 0;
    }

    .pop-enter-active,
    .pop-leave-active {
      transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
    }

    .pop-enter,
    .pop-leave-to {
      opacity: 0;
      transform: scale(0.3) translateY(-50%);
    }

    .drop-in-enter-active,
    .drop-in-leave-active{
      transition: all 0.3s ease-out;
    }

    .drop-in-enter-from,
    .drop-in-leave-to{
      opacity: 0;
      transform: translateY(-50%);
    }
    .modal-close-button{
    cursor: pointer;
    background: white;
    margin-left: auto;
    font-size: 33px;
    transition: .3s ease;
    }
    .modal-close-button:hover{
      background: #f5365c;
      color: white;
    }
  </style>