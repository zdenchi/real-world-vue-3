## 9. In-Component Route Guards

1. Move API call into an In-Component Route Guard
2. Install `nprogress`, progress bar library
3. Start progress bar when routing to the component
4. Finish the progress bar when API call finishes
5. Ensure that pagination still works

### In-Component Route Hooks

`beforeRouteEnter(routeTo, routeFrom, next)`

`beforeRouteUpdate(routeTo, routeFrom, next)`

`beforeRouteLeave(routeTo, routeFrom, next)`

#### next

Continue navigation `next() || return `

Cancel the navigation `next(false) || return false`

Redirect to the path `/` `next('/') || return '/'`

Redirect to the named path `next({ name: 'event-list' }) || return { name: 'event-list' }`

#### Confirm the user wants to leave the page

```html /src/views/event/Edit.vue
<script>
export default {
  data() {
    return {
      unsavedChanges: false
    }
  },
  beforeRouteLeave(routeTo, routeFrom, next) {
    if (this.unsavedChanges) {
      const answer = window.confirm('You have unsaved changes! Do you really want to leave?');
      if (!answer) {
        return false;
      }
    }
  }
};
</script>
```

```html /src/views/EventList.vue
<script>
import NProgress from 'nprogress';

beforeRouteEnter(routeTo, routeFrom, next) {
  NProgress.start();
  EventService.getEvents(
    parseInt(routeTo.query.limit) || 2,
    parseInt(routeTo.query.page) || 1
  )
    .then(response => {
      next(comp => {
        comp.events = response.data;
        comp.totalEvents = response.headers['x-total-count'];
      });
    })
    .catch(err => {
      console.log(err);
      next({ name: 'NetworkError' });
    })
    .finally(() => NProgress.done());
},
beforeRouteUpdate(routeTo) {
  NProgress.start();
  EventService.getEvents(
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
    })
    .finally(() => NProgress.done());
}
</script>
```

```js /src/main.js
import 'nprogress/nprogress.css';
```