## 10. Global And Per-Route Guards

`router.beforeEach((to, from) => { ... }`

`router.beforeResolve((to, from) => { ... }`

`router.afterEach((to, from) => { ... }`

```js /src/router/index.js
import NProgress from 'nprogress';

router.beforeEach(() => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
```

Remove NProgress from `EventList.vue` and add `return` to `beforeRouteUpdate`.
```html /src/views/EventList.vue
<script>
beforeRouteEnter(routeTo, routeFrom, next) {
  EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
    .then(response => {
      next(comp => {
        comp.events = response.data
        comp.totalEvents = response.headers['x-total-count']
      })
    })
    .catch(() => {
      next({ name: 'NetworkError' })
    })
},
beforeRouteUpdate(routeTo) {
  return EventService.getEvents(
    parseInt(routeTo.query.limit) || 2,
    parseInt(routeTo.query.page) || 1
  )
    .then(response => {
      this.events = response.data;
      this.totalEvents = response.headers['x-total-count'];
    })
    .catch(err => {
      console.log(err);
      return { name: 'NetworkError' };
    });
},
</script>
```

Move API call event from `Layout.vue` to router.
```js /src/router/index.js
import EventService from '@/services/EventService.js';
import GStore from '@/store';

const routes = [
  {
    path: '/events/:id',
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    beforeEnter: to => {
      return EventService.getEvent(to.params.id)
        .then(response => {
          GStore.event = response.data;
        })
        .catch(error => {
          console.log(error);
          if (error.response && error.response.status == 404) {
            // Add red rect to 404 error page with params: { resource: 'event' }
            return {
              name: '404Resource',
              params: { resource: 'event' }
            };
          } else {
            // Add redirect to 500 error page
            return { name: 'NetworkError' };
          }
        });
    }
    children: [ ... ]
  }
```

Move Global Store to it's own file, and add a new reactive property `event`.
```js /src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import GStore from './store';
import 'nprogress/nprogress.css';

createApp(App)
  .use(router)
  .provide('GStore', GStore)
  .mount('#app');
```

```js /src/store/index.js
import { reactive } from 'vue';

export default reactive({ flashMessage: '', event: null });
```

Remove all script, inject `GStore` and add it to all `event`.
```html /src/views/event/Layout.vue
<template>
  <div v-if="GStore.event">
    <h1>{{ GStore.event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>
      |
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <router-view :event="GStore.event" />
  </div>
</template>

<script>
export default {
  inject: ['GStore']
}
</script>
```

#### Calling Order
![Calling Order](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F3.1618588875881.jpg?alt=media&token=abd26acf-90f6-4a39-8441-89cedd353ff2)