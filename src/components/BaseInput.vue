<template>
  <label :for="uuid" v-if="label">{{ label }}</label>
  <input
    class="field"
    v-bind="{
      ...$attrs,
      onInput: updateValue
    }"
    :id="uuid"
    :value="modelValue"
    :placeholder="label"
    :aria-describedby="error ? `${uuid}-error` : null"
    :aria-invalid="error ? true : false"
    :class="{ error }"
  />
  <BaseErrorMessage v-if="error" :id="`${uuid}-error`">
    {{ error }}
  </BaseErrorMessage>
</template>

<script>
import UniqueID from '@/services/UniqueID';
import SetupFormComponent from '@/services/SetupFormComponent';
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
    error: {
      type: String,
      default: ''
    }
  },
  setup(props, context) {
    const uuid = UniqueID().getID();
    const { updateValue } = SetupFormComponent(props, context);
    return {
      updateValue,
      uuid
    };
  }
};
</script>
