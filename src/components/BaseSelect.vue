<template>
  <label v-if="label" :for="uuid">{{ label }}</label>
  <select
    class="field"
    :class="{ error }"
    v-bind="{
      ...$attrs,
      onChange: updateValue
    }"
    :value="modelValue"
    :id="uuid"
    :aria-describedby="error ? `${uuid}-error` : null"
    :aria-invalid="error ? true : false"
  >
    <option
      v-for="option in options"
      :value="option"
      :key="option"
      :selected="option === modelValue"
      >{{ option }}</option
    >
  </select>
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
      type: [String, Number]
    },
    options: {
      type: Array,
      required: true
    },
    error: {
      type: String,
      default: ''
    }
  },
  setup(props, context) {
    const { updateValue } = SetupFormComponent(props, context);
    const uuid = UniqueID().getID();
    return {
      updateValue,
      uuid
    };
  }
};
</script>
