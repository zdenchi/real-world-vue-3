<template>
  <label :for="inputId" v-if="label">{{ label }}</label>
  <input
    v-bind="$attrs"
    :placeholder="label"
    class="field"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :id="inputId"
  />
  <p v-if="error" class="errorMessage">{{ error }}</p>
</template>

<script>
import camelCase from 'lodash/camelCase';

export default {
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
