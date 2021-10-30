<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control">
      <BaseInput
        label="Email"
        type="email"
        v-model="email"
        :error="emailError"
      />
    </div>
    <div class="form-control">
      <BaseInput label="Password" type="password" />
    </div>
    <div class="form-control">
      <BaseButton type="submit" class="-fill-gradient">Submit</BaseButton>
    </div>
  </form>
</template>

<script>
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';

export default {
  components: {
    BaseInput,
    BaseButton
  },
  setup() {
    function onSubmit() {
      alert('Submitted');
    }
    return {
      onSubmit
    };
  }
};
</script>
