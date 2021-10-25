<template>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1, limit: limit } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Previous
      </router-link>

      <router-link
        v-for="i in totalPages"
        :key="i"
        :class="{ active: page === i }"
        :to="{ name: 'EventList', query: { page: i, limit: limit } }"
        :rel="page"
        >{{ i }}
      </router-link>

      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1, limit: limit } }"
        rel="next"
        v-if="hasNextPage"
        >Next &#62;
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue';
import EventService from '@/services/EventService.js';

export default {
  name: 'Home',
  props: ['page', 'limit'],
  components: {
    EventCard
  },
  data() {
    return {
      events: null,
      totalEvents: 0
    };
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
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
      });
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
  computed: {
    hasNextPage() {
      const totalPages = Math.ceil(this.totalEvents / this.limit);
      return this.page < totalPages;
    },
    totalPages() {
      return Math.ceil(this.totalEvents / this.limit);
    }
  }
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  justify-content: center;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
  margin: 5px;
  white-space: nowrap;
}
#page-prev {
  text-align: left;
  margin-right: 10px;
}
#page-next {
  text-align: right;
  margin-left: 10px;
}
.pagination > .active {
  color: #42b983;
  font-weight: 700;
}
</style>
