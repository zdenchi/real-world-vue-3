<template>
  <p>
    {{ event.currentEvent.time }} on {{ event.currentEvent.date }} @
    {{ event.currentEvent.location }}
  </p>
  <p>{{ event.currentEvent.description }}</p>
</template>

<script>
export default {
  props: ['event']
};
</script>
