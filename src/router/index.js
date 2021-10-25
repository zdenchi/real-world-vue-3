import { createRouter, createWebHistory } from 'vue-router';
import EventList from '../views/EventList.vue';
import EventLayout from '../views/event/Layout.vue';
import EventDetails from '../views/event/Details.vue';
import EventRegister from '../views/event/Register.vue';
import EventEdit from '../views/event/Edit.vue';
// import About from '../views/About.vue';
import NotFound from '../views/NotFound.vue';
import NetworkError from '../views/NetworkError.vue';
import NProgress from 'nprogress';
import EventService from '@/services/EventService.js';
import GStore from '@/store';

const About = () =>
  import(/* webpackChunkName: "about" */ '../views/About.vue');

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
    beforeEnter: to => {
      return EventService.getEvent(to.params.id)
        .then(response => {
          GStore.event = response.data;
        })
        .catch(error => {
          console.log(error);
          if (error.response && error.response.status == 404) {
            // Add redirect to 404 error page with params: { resource: 'event' }
            return {
              name: '404Resource',
              params: { resource: 'event' }
            };
          } else {
            // Add redirect to 500 error page
            return { name: 'NetworkError' };
          }
        });
    },
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit,
        meta: { requireAuth: true }
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
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

router.beforeEach((to, from) => {
  NProgress.start();

  // Hardcoded unauth user, need to replace to auth library
  const notAuthorized = true;

  if (to.meta.requireAuth && notAuthorized) {
    GStore.flashMessage = 'Sorry, you are not authorized to view this page';

    setTimeout(() => {
      GStore.flashMessage = '';
    }, 3000);

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

router.afterEach(() => {
  NProgress.done();
});

export default router;
