<template>
  <div v-if="event.currentEvent">
    <h1>{{ event.currentEvent.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'EventDetails' }">Details</router-link> |
      <router-link :to="{ name: 'EventRegister' }">Register</router-link> |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <router-view :event="event.currentEvent" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: ['id'],
  created() {
    this.fetchEvent(this.id).catch(error => {
      this.$router.push({
        name: 'ErrorDisplay',
        params: { error: error }
      });
    });
  },
  computed: {
    ...mapState(['event'])
  },
  methods: {
    ...mapActions('event', ['fetchEvent'])
  }
};
</script>
