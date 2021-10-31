<template>
  <div>
    <h1>Create an event</h1>

    <form @submit="submit">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="category"
        :error="errors.category"
      />

      <fieldset>
        <legend class="h2">Describe your event</legend>
        <BaseInput
          label="Title"
          type="text"
          v-model="title"
          :error="errors.title"
        />

        <BaseInput
          label="Description"
          type="text"
          v-model="description"
          :error="errors.description"
        />

        <BaseInput
          label="Location"
          type="text"
          v-model="location"
          :error="errors.location"
        />
      </fieldset>

      <fieldset>
        <legend class="h2">Are pets allowed?</legend>
        <BaseRadioGroup
          name="pets"
          :options="[
            { value: 1, label: 'Yes' },
            { value: 0, label: 'No' }
          ]"
          v-model="pets"
          :error="errors.pets"
        />
        <BaseRadioGroup
          v-model="pets"
          name="pets"
          :options="petOptions"
          vertical
          :error="errors.pets"
        />
      </fieldset>

      <fieldset>
        <legend class="h2">Extras</legend>
        <div>
          <BaseCheckbox
            label="Catering"
            v-model="catering"
            :error="errors.catering"
          />
        </div>
        <div>
          <BaseCheckbox
            label="Live music"
            v-model="music"
            :error="errors.music"
          />
        </div>
      </fieldset>

      <div>
        <BaseButton type="submit" class="-fill-gradient" something="else">
          Submit
        </BaseButton>
      </div>
    </form>

    <pre>{{ event }}</pre>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { mapState, mapActions } from 'vuex';
import { useField, useForm } from 'vee-validate';
import BaseInput from '@/components/BaseInput.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import BaseCheckbox from '@/components/BaseCheckbox.vue';
import BaseRadioGroup from '@/components/BaseRadioGroup.vue';
import BaseButton from '@/components/BaseButton.vue';

export default {
  components: {
    BaseInput,
    BaseSelect,
    BaseCheckbox,
    BaseRadioGroup,
    BaseButton
  },
  data() {
    return {
      categories: [
        'sustainability',
        'nature',
        'animal welfare',
        'housing',
        'education',
        'food',
        'community'
      ],
      event: {
        id: '',
        category: '',
        title: '',
        description: '',
        location: '',
        pets: 1,
        extras: {
          catering: false,
          music: false
        },
        organizer: ''
      }
    };
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions('event', ['createEvent']),
    onSubmit() {
      const event = {
        ...this.event,
        id: uuidv4(),
        organizer: this.user.userInfo.name
      };
      this.createEvent(event)
        .then(() => {
          this.$router.push({
            name: 'EventDetails',
            params: { id: event.id }
          });
        })
        .catch(error => {
          this.$router.push({
            name: 'ErrorDisplay',
            params: { error: error }
          });
        });
    }
  },
  setup() {
    const required = value => {
      const requiredMessage = 'This field is required';
      if (value === undefined || value === null) return requiredMessage;
      if (!String(value).length) return requiredMessage;
      return true;

      // const isEmptyValue = !String(value).trim();
      // if (isEmptyValue) return requiredMessage;
      // return true;
    };
    const minLength = (number, value) => {
      if (String(value).length < number) return `Minimum length is ${number}`;
      return true;
    };
    const anything = () => {
      return true;
    };

    const validationSchema = {
      category: required,
      title: value => {
        const req = required(value);
        if (req !== true) return req;

        const min = minLength(3, value);
        if (min !== true) return req;

        return true;
      },
      description: required,
      location: undefined,
      pets: anything,
      catering: anything,
      music: anything
    };

    const { handleSubmit, errors } = useForm({
      validationSchema,
      initialValues: {
        pets: 1,
        catering: false,
        music: false
      }
    });

    const { value: category } = useField('category');
    const { value: title } = useField('title');
    const { value: description } = useField('description');
    const { value: location } = useField('location');
    const { value: pets } = useField('pets');
    const { value: catering } = useField('catering');
    const { value: music } = useField('music');

    const submit = handleSubmit(values => {
      console.log('submit', values);
    });

    return {
      category,
      title,
      description,
      location,
      pets,
      catering,
      music,
      submit,
      errors
    };
  }
};
</script>

<style>
fieldset {
  border: 0;
  margin-bottom: 0;
  padding: 0;
}
</style>
