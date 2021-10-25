import { createRouter, createWebHistory } from 'vue-router';
import EventList from '../views/EventList.vue';
import EventLayout from '../views/event/Layout.vue';
import EventDetails from '../views/event/Details.vue';
import EventRegister from '../views/event/Register.vue';
import EventEdit from '../views/event/Edit.vue';
import About from '../views/About.vue';
import NotFound from '../views/NotFound.vue';
import NetworkError from '../views/NetworkError.vue';

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: route => ({
      limit: parseInt(route.query.limit) || 2,
      page: parseInt(route.query.page) || 1
    })
  },
  {
    path: '/events/:id',
    name: 'EventLayout',
    component: EventLayout,
    props: true,
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister
      }
    ]
  },
  {
    path: '/event/:afterEvent(.*)',
    redirect: to => {
      return { path: `/events/${to.params.afterEvent}` };
    }
  },
  {
    path: '/about-us',
    name: 'About',
    component: About
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    // import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: '/about',
    redirect: { name: 'About' }
  },
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
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
