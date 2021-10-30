<template>
  <div>
    <h1>Create an event</h1>

    <form @submit.prevent="onSubmit">
      <BaseSelect
        :options="categories"
        v-model="event.category"
        label="Select a category"
        error=""
      />

      <fieldset>
        <legend class="h2">Describe your event</legend>
        <BaseInput v-model="event.title" label="Title" type="text" error="" />

        <BaseInput
          v-model="event.description"
          label="Description"
          type="text"
          error=""
        />

        <BaseInput
          v-model="event.location"
          label="Location"
          type="text"
          error=""
        />
      </fieldset>

      <fieldset>
        <legend class="h2">Are pets allowed?</legend>
        <BaseRadioGroup
          v-model="event.pets"
          name="pets"
          :options="petOptions"
          vertical
          error=""
        />
      </fieldset>

      <fieldset>
        <legend class="h2">Extras</legend>
        <div>
          <BaseCheckbox
            label="Catering"
            v-model="event.extras.catering"
            error=""
          />
        </div>
        <div>
          <BaseCheckbox
            label="Live music"
            v-model="event.extras.music"
            error=""
          />
        </div>
      </fieldset>

      <button class="button -fill-gradient" type="submit">Submit</button>
    </form>

    <pre>{{ event }}</pre>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { mapState, mapActions } from 'vuex';
import BaseInput from '@/components/BaseInput.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import BaseCheckbox from '@/components/BaseCheckbox.vue';
import BaseRadioGroup from '@/components/BaseRadioGroup.vue';

export default {
  components: {
    BaseInput,
    BaseSelect,
    BaseCheckbox,
    BaseRadioGroup
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
      },
      petOptions: [
        { label: 'Yes', value: 1 },
        { label: 'No', value: 0 }
      ]
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
