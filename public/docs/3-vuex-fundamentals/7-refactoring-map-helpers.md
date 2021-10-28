### Map Helpers

https://www.vuemastery.com/blog/refactoring-vuex-with-map-helpers-and-modules/

```html /src/views/EventCreate.vue
<script>
import { mapState, mapActions } from 'vuex';
computed: {
  ...mapState(['user']) // ADD
},
methods: {
  ...mapActions('event', ['createEvent']),
  onSubmit() {
    const event = {
      ...this.event,
      id: uuidv4(),
      organizer: this.user.userInfo.name // CHANGE
    }
    this.createEvent(event)
      .then(() => {
        // ...
      }
  }
}
</script>
```

```html /src/views/EventList.vue
<template>
  <EventCard v-for="event in event.events" :key="event.id" :event="event" />
</template>
<script>
  import { mapState, mapActions } from 'vuex';
  created() {
    this.fetchEvents()
      .catch(error => {
        // ...
  },
  computed: {
    ...mapState(['event', 'user']),
    hasNextPage() {
      const totalPages = Math.ceil(this.event.totalEvents / this.limit);
      return this.page < totalPages;
    },
    totalPages() {
      return Math.ceil(this.event.totalEvents / this.limit);
    }
  },
  methods: {
    ...mapActions('event', ['fetchEvents'])
  }
</>
```

```html /src/views/event/Layout.vue
<script>
import { mapState, mapActions } from 'vuex';
created() {
  this.fetchEvent(this.id)
    .catch(error => { 
      // ...
},
computed: {
  ...mapState(['event'])
},
methods: {
  ...mapActions('event', ['fetchEvent'])
}
</script>
```

???
```html /src/views/event/Details.vue
<template>
  <div v-if="event.currentEvent">
    <h1>{{ event.currentEvent.title }}</h1>
    <p>
      {{ event.currentEvent.time }} on {{ event.currentEvent.date }} @
      {{ event.currentEvent.location }}
    </p>
    <p>{{ event.currentEvent.description }}</p>
  </div>
</template>
```