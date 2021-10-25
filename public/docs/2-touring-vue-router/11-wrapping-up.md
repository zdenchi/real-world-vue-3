## 11. Wrapping Up

### Route Meta Fields

```js /src/router/index.js
const routes = [
  {
    path: 'edit',
    name: 'EventEdit',
    component: EventEdit,
    meta: { requireAuth: true }
  }
]

router.beforeEach((to, from) => {
  NProgress.start();

  // Hardcoded unauth user, need to replace to auth library
  const notAuthorized = true;

  if (to.meta.requireAuth && notAuthorized) {
    GStore.flashMessage = 'Sorry, you are not authorized to view this page';

    setTimeout(() => {
      GStore.flashMessage = '';
    }, 3000)

    if (from.href) {
      // If this navigation came from a previous page.
      return false;
    } else {
      // Must be navigating directly.
      // Push navigation to the root route.
      return { path: '/' };
    }
  }
});
```

### Lazy Loading Routes

```js /src/router/index.js
const routes = [
  {
    path: '/about-us',
    name: 'About',
    // component: About
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
```

Another way to do such.
```js /src/router/index.js
const About = () => import(/* webpackChunkName: "about" */ '../views/About.vue');

const routes = [
  {
    path: '/about',
    name: 'About',
    component: About
  }
]
```

Create a bundje of JS.
```js /src/router/index.js
const Uploader = () => import(/* webpackChunkName: "creator" */ '../views/Uploader.vue');
const Editor = () => import(/* webpackChunkName: "creator" */ '../views/Editor.vue');
const Publisher = () => import(/* webpackChunkName: "creator" */ '../views/Publisher.vue');
```

### Scroll Behavior

Always scroll to top
```js /src/router/index.js
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});
```
