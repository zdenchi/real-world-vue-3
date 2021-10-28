<template>
  <p>Register event here</p>
  <button @click="register">Register Me</button>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['event'],
  methods: {
    ...mapActions(['showFlashMessage']),
    register() {
      // Call to API
      // If registered then redirect to event details
      this.showFlashMessage(
        `You are successfully registred for ${this.event.title}`
      );
      this.$router.push({ name: 'EventDetails' });
    }
  }
};
</script>
