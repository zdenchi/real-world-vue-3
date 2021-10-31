<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control">
      <BaseInput
        label="Email"
        type="text"
        v-model="email"
        :error="emailError"
      />
    </div>
    <div class="form-control">
      <BaseInput
        label="Password"
        type="password"
        v-model="password"
        :error="passwordError"
      />
    </div>
    <div class="form-control">
      <BaseButton type="submit" class="-fill-gradient">Submit</BaseButton>
    </div>
  </form>
</template>

<script>
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import { useField, useForm } from 'vee-validate';

export default {
  components: {
    BaseInput,
    BaseButton
  },
  setup() {
    function onSubmit() {
      if (!email.value || !password.value) {
        alert('This field is required');
      } else if (!!emailError.value || !!passwordError.value) {
        alert(emailError.value || passwordError.value);
      } else {
        alert('Submited');
      }
    }

    const validations = {
      email: value => {
        const requiredMessage = 'This field is required';
        const emailRegex = /^[-\w.]+@([A-z0-9]+\.)+[A-z]{2,4}$/;
        const email = String(value)
          .toLowerCase()
          .trim();
        if (!email) {
          return requiredMessage;
        } else if (!emailRegex.test(email)) {
          return 'Please enter a valid email address';
        } else {
          return true;
        }
      },
      password: value => {
        const requiredMessage = 'This field is required';
        const password = String(value).trim();
        if (!password) return requiredMessage;
        return true;
      },
      pass: value => {
        /**
         * Minimum eight characters, allow latin letter, numbers and @$!%*?&:
         * ^[A-Za-z\d@$!%*?&]{8,}$
         *
         * Minimum eight characters, at least one letter and one number (Without special character):
         * ^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$
         *
         * Minimum eight characters, at least one letter, one number and one special character:
         * ^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$
         *
         * Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
         * ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$
         *
         * Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
         * ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$
         */

        const requiredMessage = 'This field is required';
        const passwordRegex = /^[A-Za-z\d@$!%*?&]{8,}$/;

        if (!value) {
          return requiredMessage;
        } else if (!passwordRegex.test(value)) {
          return 'Please enter a valid password';
        } else {
          return true;
        }
      }
    };

    useForm({
      validationSchema: validations
    });

    const { value: email, errorMessage: emailError } = useField('email');
    const { value: password, errorMessage: passwordError } = useField(
      'password'
    );

    return { onSubmit, email, emailError, password, passwordError };
  }
};
</script>
