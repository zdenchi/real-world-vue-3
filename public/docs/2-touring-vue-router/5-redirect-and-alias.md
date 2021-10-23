## 5. Redirect & Alias

### Adding redirect and alias

```js ./src/router/index.js
const routes = [
  {
    path: '/about-us',
    name: 'About',
    component: About,
    alias: '/about'
  },
  {
    path: '/about',
    redirect: { name: 'About' }
  }
]
```

### Change `/event/:id` to `/events/:id`

1. Update component router path
2. Redirect old route to the new route

```js ./src/router/index.js
const routes = [
  {
    path: '/events/:id',
    name: 'EventLayout',
    component: EventLayout,
    // ...
  },
  {
    path: '/event/:afterEvent(.*)',
    redirect: to => {
      return { path: `/events/${to.params.afterEvent}` }
    }
  }
]