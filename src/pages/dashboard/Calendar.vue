<template>
  <h1>Calendar</h1>
  <!-- <q-btn icon="mdi-plus" label="New event" no-caps color="primary"/> -->
  <event-list/>
</template>
<script>
import EventList from '../../components/EventList.vue'

export default {
  components: { EventList }
}
</script>
