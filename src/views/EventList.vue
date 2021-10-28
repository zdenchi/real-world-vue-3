<template>
  <h1>Events for {{ user.userInfo.name }}</h1>
  <div class="events">
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />

    <!-- <div class="pagination">
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
    </div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue';
// import EventService from '@/services/EventService.js';
import { mapState, mapActions } from 'vuex';

export default {
  // props: ['page', 'limit'],
  components: {
    EventCard
  },
  // beforeRouteEnter(routeTo) {
  //   this.fetchEvents(
  //     parseInt(routeTo.query.limit) || 2,
  //     parseInt(routeTo.query.page) || 1
  //   );
  // },
  // beforeRouteUpdate(routeTo) {
  //   this.fetchEvents(
  //     parseInt(routeTo.query.limit) || 2,
  //     parseInt(routeTo.query.page) || 1
  //   );
  // },
  created() {
    this.fetchEvents().catch(error => {
      this.$router.push({
        name: 'ErrorDisplay',
        params: { error: error }
      });
    });
  },
  computed: {
    ...mapState(['event', 'user']),
    // hasNextPage() {
    //   const totalPages = Math.ceil(this.event.totalEvents / this.limit);
    //   return this.page < totalPages;
    // },
    // totalPages() {
    //   return Math.ceil(this.event.totalEvents / this.limit);
    // }
  },
  methods: {
    ...mapActions('event', ['fetchEvents'])
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
