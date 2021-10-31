<template>
  <label :for="inputId" v-if="label">{{ label }}</label>
  <input
    v-bind="$attrs"
    :placeholder="label"
    :class="{ error }"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :id="inputId"
  />
  <BaseErrorMessage v-if="error">
    {{ error }}
  </BaseErrorMessage>
</template>

<script>
import BaseErrorMessage from '@/components/BaseErrorMessage.vue';
import camelCase from 'lodash/camelCase';

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
    error: {
      type: String,
      default: ''
    }
  },
  computed: {
    inputId() {
      return `${camelCase(this.label)}Input`;
    }
  }
};
</script>
