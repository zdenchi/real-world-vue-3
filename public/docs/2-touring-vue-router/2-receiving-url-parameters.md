## 2/. Receiving URL Parameters

### Query parameters of the URL: https://rwv-3.onrender.com/events?page=4

```html ./src/components/Events.vue
<template>
  <div>
    <h1>You are on page {{ $route.query.page }}</h1>
  </div>
</template>
<script>
export default {
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    }
  }
}
</script>
```

---

### Part of the URL: https://rwv-3.onrender.com/events/4

```js ./src/router/index.js
const routes = [
  { 
    path: '/events/:page', 
    name: 'Events', 
    component: Events, 
    props: true 
  }
]
```

```html ./src/components/Events.vue
<template>
  <div>
    <h1>You are on page {{ $route.params.page }}</h1>
    <h1>You are on page {{ page }}</h1>
  </div>
</template>
<script>
export default {
  props: ['page']
}
</script>
```

---

### Configure\transform a component from the router

```js ./src/router/index.js
const routes = [
  { 
    path: '/events/:page', 
    name: 'Events', 
    component: Events, 
    props: route => {
      return { showExtra: !!route.query.page }
    }
    // props: { showExtra: true }
  }
]
``` 

```html ./src/components/Events.vue
<template>
  <div>
    <h1>You are on page {{ $route.params.page }}</h1>
    <div v-if="showExtra">You are on page {{ page }}</div>
  </div>
</template>
<script>
export default {
  props: ['showExtra']
}
</script>
``` 