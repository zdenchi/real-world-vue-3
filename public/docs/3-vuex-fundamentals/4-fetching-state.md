## 4 - Fetching State

```js /src/store/index.js
import EventService from '@/services/EventService.js';

state: {
  user: 'Adam Beyer',
  events: [],
  event: {},
  totalEvents: 0
},
mutations: {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENT(state, event) {
    state.event = event;
  }
},
actions: {
  createEvent({ commit }, event) {
    EventService.postEvent(event)
      .then(() => commit('ADD_EVENT', event))
      .catch(error => console.log(error))
  },
  fetchEvents({ commit }) {
    EventService.getEvents()
      .then(response => commit('SET_EVENTS', response.data))
      .catch(error => console.log(error))
  },
  fetchEvent({ commit, state }, id) {
    const existingEvent = state.events.find(event => event.id === id);
    if (existingEvent) {
      commit('SET_EVENT', existingEvent);
    } else {
      EventService.getEvent(id)
        .then(response => commit('SET_EVENT', response.data))
        .catch(error => console.log(error))
    }
  }
}
```

```html /src/views/EventCreate.vue
<script>
methods: {
  onSubmit() {
    const event = {
      ...this.event,
      id: uuidv4(),
      organizer: this.$store.state.user
    }
    this.$store.dispatch('createEvent', event);
  }
}
</script>
```

```html /src/views/EventList.vue
<script>
created() {
  this.$store.dispatch('fetchEvents');
},
computed: {
  events() {
    return this.$store.state.events;
  }
}
</script>
```

```html /src/views/event/Layout.vue
<script>
created() {
  this.$store.dispatch('fetchEvent', this.id);
},
computed: {
  event() {
    return this.$store.state.event;
  }
}
</script>
```
