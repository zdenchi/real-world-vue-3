import { createStore } from 'vuex';
import user from './modules/user.js';
import event from './modules/event.js';

export default createStore({
  state: {
    flashMessage: ''
  },
  mutations: {
    SHOW_FLASH_MESSAGE(state, message) {
      state.flashMessage = message;

      setTimeout(() => {
        state.flashMessage = '';
      }, 3000);
    }
  },
  actions: {
    showFlashMessage({ commit }, message) {
      commit('SHOW_FLASH_MESSAGE', message);
    }
  },
  modules: { user, event }
});
