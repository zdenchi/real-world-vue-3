<template>
  <div>
    <h1>Create an event</h1>

    <form @submit.prevent="submit">
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

    <!-- <pre>{{ event }}</pre> -->
  </div>
</template>

<script>
// import { v4 as uuidv4 } from 'uuid';
// import { mapState, mapActions } from 'vuex';
import { useField, useForm } from 'vee-validate';
import { object, string, number, boolean } from 'yup';
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
      ]
      // event: {
      //   id: '',
      //   category: '',
      //   title: '',
      //   description: '',
      //   location: '',
      //   pets: 1,
      //   extras: {
      //     catering: false,
      //     music: false
      //   },
      //   organizer: ''
      // }
    };
  },
  // computed: {
  //   ...mapState(['user'])
  // },
  // methods: {
  //   ...mapActions('event', ['createEvent']),
  //   onSubmit() {
  //     const event = {
  //       ...this.event,
  //       id: uuidv4(),
  //       organizer: this.user.userInfo.name
  //     };
  //     this.createEvent(event)
  //       .then(() => {
  //         this.$router.push({
  //           name: 'EventDetails',
  //           params: { id: event.id }
  //         });
  //       })
  //       .catch(error => {
  //         this.$router.push({
  //           name: 'ErrorDisplay',
  //           params: { error: error }
  //         });
  //       });
  //   }
  // },
  setup() {
    const validationSchema = object({
      category: string().required(),
      title: string()
        .required('A cool title is required')
        .min(3),
      description: string().required(),
      location: string(),
      pets: number(),
      catering: boolean(),
      music: boolean()
    });

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
