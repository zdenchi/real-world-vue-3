## 3 - Updating State

```js /src/services/EventService.js
postEvent(event) {
  return apiClient.post('/events', event);
}
```

```html /src/views/EventCreate.vue
<script>
import EventService from '@/services/EventService.js';

export default {
  methods: {
    onSubmit() {
      const event = {
        ...this.event,
        id: uuidv4(),
        organizer: this.$store.state.user
      }
      EventService.postEvent(event)
        .then(() => {
          this.$store.commit('ADD_EVENT', event);
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
```

```js /src/store/index.js
export default createStore({
  state: {
    user: 'Adam Jahr',
    events: [] // new events array
  },
  mutations: {
    ADD_EVENT(state, event) { // our first mutation
      state.events.push(event)
    }
  }
)}
```

