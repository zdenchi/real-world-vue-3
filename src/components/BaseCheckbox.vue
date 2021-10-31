<template>
  <input
    v-bind="{ ...$attrs, onChange: updateValue }"
    :checked="modelValue"
    :id="uuid"
    type="checkbox"
    class="field"
  />
  <label :for="uuid" v-if="label">{{ label }}</label>
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
      type: Boolean,
      default: false
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
