import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import { VueSignalR } from '@dreamonkey/vue-signalr';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import { faCheck} from '@fortawesome/free-solid-svg-icons';

library.add(faPlus, faPenToSquare, faCheck);

const connection = new HubConnectionBuilder()
  .withUrl('https://localhost:44349/api/orderHub')
  .build();

createApp(App)
.use(store)
.use(router)
.use(VueAxios, axios)
.use(VueSignalR, { connection })
.component('font-awesome-icon', FontAwesomeIcon)
.mount("#app");
