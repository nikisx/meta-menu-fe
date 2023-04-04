import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import { VueSignalR } from '@dreamonkey/vue-signalr';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { library } from '@fortawesome/fontawesome-svg-core';
import VueApexCharts from "vue3-apexcharts";
import LoadScript from "vue-plugin-load-script";
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import { faCheck} from '@fortawesome/free-solid-svg-icons';
import { faMinus} from '@fortawesome/free-solid-svg-icons';
import { faArrowUp} from '@fortawesome/free-solid-svg-icons';
import { faArrowDown} from '@fortawesome/free-solid-svg-icons';
import { faEye} from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import { faXmark} from '@fortawesome/free-solid-svg-icons';
import { faUpload} from '@fortawesome/free-solid-svg-icons';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import { faQrcode} from '@fortawesome/free-solid-svg-icons';
import { faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { faWifi} from '@fortawesome/free-solid-svg-icons';
import { faFingerprint} from '@fortawesome/free-solid-svg-icons';

library.add(faPlus, faPenToSquare, faCheck, faMinus, faArrowUp, faArrowDown,faEye, faEyeSlash,faXmark,faUpload,faTrash,faCircleExclamation, faQrcode,faCartShopping, faWifi, faFingerprint);

const connection = new HubConnectionBuilder()
  .withUrl('https://meta-menu-api.azurewebsites.net/api/orderHub')
  .build();
  
createApp(App)
.use(store)
.use(router)
.use(VueAxios, axios)
.use(VueSignalR, { connection })
.use(VueApexCharts)
.use(LoadScript)
.use(ToastPlugin)
.component('font-awesome-icon', FontAwesomeIcon)
.mount("#app");
