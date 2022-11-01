import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import { faCheck} from '@fortawesome/free-solid-svg-icons';

library.add(faPlus, faPenToSquare, faCheck);

createApp(App)
.use(store)
.use(router)
.use(VueAxios, axios)
.component('font-awesome-icon', FontAwesomeIcon)
.mount("#app");
