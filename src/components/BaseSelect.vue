<template>
  <label v-if="label">{{ label }}</label>
  <select
    :value="modelValue"
    class="field"
    :class="{ error }"
    v-bind="{
      ...$attrs,
      onChange: $event => {
        $emit('update:modelValue', $event.target.value);
      }
    }"
  >
    <option
      v-for="option in options"
      :value="option"
      :key="option"
      :selected="option === modelValue"
      >{{ option }}</option
    >
  </select>
  <BaseErrorMessage v-if="error">
    {{ error }}
  </BaseErrorMessage>
</template>

<script>
import BaseErrorMessage from '@/components/BaseErrorMessage.vue';

export default {
  components: {
    BaseErrorMessage
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      required: true
    },
    error: {
      type: String,
      default: ''
    }
  }
};
</script>
