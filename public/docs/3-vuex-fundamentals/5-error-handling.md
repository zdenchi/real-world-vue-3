## 5 - Error Handling

```html /src/views/EventCreate.vue
<script>
methods: {
  onSubmit() {
    const event = {
      ...this.event,
      id: uuidv4(),
      organizer: this.$store.state.user
    }
    this.$store.dispatch('createEvent', event)
      .then(() => {
        this.$router.push({
          name: 'EventDetails',
          params: { id: event.id }
        });
      })
      .catch(error => {
        this.$router.push({
          name: 'ErrorDisplay',
          params: { error: error }
        });
      });
  }
}
</script>
```

```html /src/views/ErrorDisplay.vue
<template>
  <h4>Oops! There was an error:</h4>
  <p>{{ error }}</p>
</template>
<script>
export default {
  props: ['error']
};
</script>
```

```js /src/router/index.js
import ErrorDisplay from '@/views/ErrorDisplay.vue';
const routes = [
  {
    path: '/error/:error',
    name: 'ErrorDisplay',
    props: true,
    component: ErrorDisplay
  }
]
```

```js /src/store/index.js
actions: {
  createEvent({ commit }, event) {
    EventService.postEvent(event)
      .then(() => commit('ADD_EVENT', event))
      .catch(error => {
        throw error;
      }) // <--- throw error
  },
  fetchEvents({ commit }) {
    return EventService.getEvents() // <--- return result
      .then(response => commit('SET_EVENTS', response.data))
      .catch(error => {
        throw error;
      }) // <--- throw error
  },
  fetchEvent({ commit, state }, id) {  
    const existingEvent = state.events.find(event => event.id === id);
    if (existingEvent) {
      commit('SET_EVENT', existingEvent)
    } else {
      return EventService.getEvent(id) // <--- return result
        .then(response => commit('SET_EVENT', response.data))
        .catch(error => {
          throw error;
        }) // <--- throw error
    }
  }
}
```

```html /src/views/EventList.vue
<script>
created() {
  this.$store.dispatch('fetchEvents')
    .catch(error => {
      this.$router.push({
        name: 'ErrorDisplay',
        params: { error: error }
      })
    })
}
</script>
```

```html /src/views/EventDetails.vue
<script>
created() {
  this.$store.dispatch('fetchEvent', this.id)
    .catch(error => {
      this.$router.push({
        name: 'ErrorDisplay',
        params: { error: error }
      })
    })
}
</script>
```
