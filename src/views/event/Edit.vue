<template>
  <p>Edit event here</p>
</template>

<script>
export default {
  data() {
    return {
      unsavedChanges: true
    };
  },
  props: ['event'],
  beforeRouteLeave() {
    if (this.unsavedChanges) {
      const answer = window.confirm(
        'You have unsaved changes! Do you really want to leave?'
      );
      if (!answer) {
        return false;
      }
    }
  }
};
</script>
