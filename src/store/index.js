import { createStore } from "vuex";
import { get } from "../request";

export default createStore({
  state: {
    user: null,
  },
  getters: {
    getCurrentUser(state){
      return state.user;
    },
  },
  mutations: {
    setUser(state, user){
      state.user = user;
    }
  },
  actions: {
    setCurrentUser(){
      get("/authentication/current-user")
      .then((response) => {
        this.commit("setUser", response.data);
      })
    }
  },
  modules: {
  }
})
