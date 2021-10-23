## 8. Flash Messages

1. Create a global storage mechanism to store a flash message
2. Set the flash message inside Register.vue
3. Create a place where flash message is displayed

```js /src/main.js
import { createApp, reactive } from 'vue';

const GStore = reactive({ flashMessage: '' });

createApp(App)
  .use(store)
  .use(router)
  .provide('GStore', GStore)
  .mount('#app');
```

```vue /src/views/event/Register.vue
<script>
export default {
  props: ['event'],
  inject: ['GStore'],
  methods: {
    register() {
      // Call to API
      // If registered then redirect to event details

      this.GStore.flashMessage = `You are successfully registred for ${this.event.title}`;

      setTimeout(() => {
				this.GStore.flashMessage = '';
      }, 3000);

      this.$router.push({ name: 'EventDetails' });
    }
  }
}
</script>
```

```vue /src/App.vue
<template>
	<div id="app">
    <div id="flashMessage" v-if="GStore.flashMessage">{{ GStore.flashMessage }}</div>
    <!-- ... -->
  </div>
</template>
<script>
export default {
  inject: ['GStore']
}
</script>
<style>
@keyframes yellowfade {
  from {
    background: yellow;
  }
  to {
    background: transparent;
  }
}
#flashMessage {
  animation-name: yellowfade;
  animation-duration: 3s;
}
</style>
```