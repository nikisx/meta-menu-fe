import { createStore } from "vuex";
import { get } from "../request";


const store =createStore({
  state: {
    user: null,
    isLoading: true,
  },
  getters: {
    getCurrentUser(state){
      return state.user;
    },
  },
  mutations: {
    setUser(state, user){
      state.user = user;
    },
    setLoader(state,loading){
      state.isLoading = loading;
    },
  },
  actions: {
    setCurrentUser(){
      get("/authentication/current-user")
      .then((response) => {
        if(response.data){
          this.commit("setUser", response.data);
        }
       
      })
    },
    setLoadingFalse(){
      this.commit("setLoader", false);
    },
    setLoadingTrue(){
      this.commit("setLoader", true);
    },
  },
  modules: {
  }
})

export default store;
