import EventService from '@/services/EventService.js';

export default {
  namespaced: true,
  state: {
    events: [],
    currentEvent: {},
    totalEvents: 0
  },
  mutations: {
    FETCH_EVENTS(state, events) {
      state.events = events;
    },
    FETCH_EVENT(state, event) {
      state.currentEvent = event;
    },
    CREATE_EVENT(state, event) {
      state.events.push(event);
    }
  },
  actions: {
    fetchEvents({ commit, state }) {
      return EventService.getEvents()
        .then(response => {
          state.totalEvents = response.headers['x-total-count'];
          commit('FETCH_EVENTS', response.data);
        })
        .catch(error => {
          throw error;
        });
    },
    fetchEvent({ commit, state }, id) {
      const existingEvent = state.events.find(event => event.id === id);
      if (existingEvent) {
        commit('FETCH_EVENT', existingEvent);
      } else {
        return EventService.getEvent(id)
          .then(response => {
            commit('FETCH_EVENT', response.data);
          })
          .catch(error => {
            throw error;
          });
      }
    },
    createEvent({ commit }, event) {
      return EventService.postEvent(event)
        .then(() => {
          commit('CREATE_EVENT', event);
        })
        .catch(error => {
          throw error;
        });
    }
  }
};
