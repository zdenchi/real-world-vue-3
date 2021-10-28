### Modules

```js /src/store/modules/user.js
export default {
  namespaced: true,
  state: {
    userInfo: {
      id: 'abc123',
      name: 'Adam Jahr'
    }
  }
};
```

```js /src/store/modules/event.js
import EventService from '@/services/EventService.js';
export default {
  namespaced: true,
  state: {
    events: [],
    currentEvent: {},
    totalEvents: 0
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events;
      state.totalEvents = events.length;
    },
    SET_EVENT(state, event) {
      state.currentEvent = event;
    }
  },
  actions: {
    createEvent({ commit }, event) {
      EventService.postEvent(event)
        .then(() => commit('ADD_EVENT', event))
        .catch(error => {
          throw error;
        });
    },
    fetchEvents({ commit }) {
      return EventService.getEvents()
        .then(response => {
          commit('SET_EVENTS', response.data);
        })
        .catch(error => {
          throw error;
        });
    },
    fetchEvent({ commit, state }, id) {
      const existingEvent = state.events.find(event => event.id === id);
      if (existingEvent) {
        commit('SET_EVENT', existingEvent);
      } else {
        return EventService.getEvent(id)
          .then(response => commit('SET_EVENT', response.data))
          .catch(error => {
            throw error;
          });
      }
    }
  },
  modules: {}
};
```

```js /src/store/index.js
import { createStore } from 'vuex';
import user from './modules/user.js';
import event from './modules/event.js';
export default createStore({
  modules: { user, event }
});
```