import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({

  state: {
    // Current state of the application lies here.
    user : {name : 'adit'}
  },
  getters: {
    // Compute derived state based on the current state. More like computed property.
    
  },
  mutations: {
    // Mutate the current state
  },
  actions: {
    // Get data from server and send that to mutations to mutate the current state
  }


})

// import { store } from '/path/to/file'