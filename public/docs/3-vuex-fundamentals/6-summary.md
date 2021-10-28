## 6 - Summary

```js /src/store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    totalTvCount: 10,
    isLarryHappy: true, 
    isJennyHappy: true
  },
  getters: {
    // Check if both Larry and Jenny are happy
    happyStaff: state => {
      return state.isLarryHappy && state.isJennyHappy;
    }
  },
  mutations: {
    // Jenny
    REMOVE_TV(state, amount) {
      state.totalTvCount -= amount;
    }
  },
  actions: {
    // Larry
    removeTv({ commit, state}, amount) {
      // If we enough TVs, ask Jenny to remove it
      if (state.totalTvCount >= amount) {
        context.commit('REMOVE_TV', amount);
      }
    }
  },
  modules: {}
});
```

```html /src/components/Customer.vue
<template>
  <div class="customer">
    <p>I see {{ totalTvCount }} TVs!</p>
    <p v-show="happyStaff">The staff seems happy!</p>
    <input type="number" v-model="quantity">
    <button :disabled="!totalTvCount" @click="buyTv">Buy TV</button>
  </div>
</template>
<script>
export default {
  name: 'Customer',
  data() {
    return {
      quantity: 1
    };
  },
  computed: {
    totalTvCount () {
      return this.$store.state.totalTvCount;
    },
    happyStaff () {
      return this.$store.getters.happyStaff;
    }
  },
  methods: {
    buyTv() {
      // Dispatch the action to buy a TV
      this.$store.dispatch('removeTv', this.quantity);
    }
  }
}
</script>
```

```html /src/components/Customer.vue
<script>
import { mapState, mapGetter, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState(['totalTvCount']),
    ...mapGetter(['totalTvCount'])
  },
  methods: {
    ...mapActions(['removeTv']),
    buyTv() {
      this.removeTv(this.quantity);
    }
  }
}
</script>
```
