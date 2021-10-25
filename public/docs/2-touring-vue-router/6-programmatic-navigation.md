## 6. Programmatic Navigation

```html ./src/views/event/Register.vue
<template>
  <p>Register event here</p>
  <button @click="register">Register Me</button>
</template>
<script>
export default {
  props: ['event'],
  methods: {
    register() {
      // Call to API
      // If registered then redirect to event details
      this.$router.push({ name: 'EventDetails' });
    }
  }
}
</script>
```

When call `<router-link>` it's calling `this.$router.push`.

For example:
`<router-link :to="{ name: 'About }">About</router-link>`

Call:
`this.$router.push({ name: 'About' })`

### Additional Examples

Path as string
`this.$router.push('/about')`

Path with an object
`this.$router.push({ path: '/about' })`

Named path
`this.$router.push({ name: 'About' })`

Dynamic Segment
`this.$router.push({ name: 'EventDetails', params: { id: 3 } })`

Query Parameter
`this.$router.push({ name: 'EventList', query: { page: 2 } })`

Using Replace instead of Push to disabling the back button
`this.$router.replace({ name: 'EventDetails', params: { id: 3 } })`

Invoke back and forward buttons
`this.$router.go(1)`
`this.$router.go(-1)`
