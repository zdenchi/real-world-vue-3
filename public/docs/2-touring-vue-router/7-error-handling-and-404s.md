## 7. Error Handling and 404s

### Common Errors

1. When user tries to navigate to a page that doesn't exist `http://localhost:8080/ololo-blablabla`.
2. When user navigates to a resource that doesn't exist `http://localhost:8080/events/ololo-blablabla`.
3. When user's network connectivity fails.

#### 404 Not Found

```js /src/router/index.js
import NotFound from '../views/NotFound.vue';

const route = [
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true
  }
]
```

```vue /src/views/NotFound.vue
<template>
  <h1>Oops!</h1>
  <h3>The {{ resource }} you're looking for is not here.</h3>
  <router-link :to="{ name: 'EventList' }">Back to the home page</router-link>
</template>
<script>
export default {
  props: {
    resource: {
      type: String,
      required: true,
      default: 'page'
    }
  }
};
</script>
```

```vue /src/views/event/Layout.vue
<script>
export default {
  // ...
  created() {
    EventService.getEvent(this.id)
      .then(response => {
        this.event = response.data;
      })
      .catch(err => {
        console.log(err);

        // Add redirect to error page with params: { resource: 'event' }
        this.$router.push({
          name: '404Resource',
          params: { resource: 'event' }
        });
      });
  }
};
</script>
```

#### 500 Internal Server Error

```vue /src/views/NetworkError.vue
<template>
  <div class="networkError">
    <h1>Uh-Oh!</h1>
    <h3>It looks like you're experienceing some network issues, please take a breath and <a href="#" @click="$router.go(-1)">click here</a> to try again.</h3>
  </div>
</template>
```

```js /src/router/index.js
import NetworkError from '../views/NetworkError.vue';

const route = [
  {
    path: 'network-error',
    name: 'NetworkError',
    component: NetworkError
  }
]
```

```vue /src/views/event/Layout.vue
<script>
export default {
  // ...
  created() {
    EventService.getEvent(this.id)
      .then(response => {
        this.event = response.data;
      })
      .catch(err => {
        console.log(err);

        if (err.response && err.response.status == 404) {
          // Add redirect to error page with params: { resource: 'event' }
          this.$router.push({
            name: '404Resource',
            params: { resource: 'event' }
          });
        } else {
          this.$router.push({ name: 'NetworkError' });
        }
      });
  }
};
</script>
```