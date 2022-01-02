<template>
  <q-header bordered class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title>Calendar</q-toolbar-title>
      <q-btn icon="mdi-plus" label="New event" no-caps color="white" text-color="black" :to="{name: 'Dashboard New Event'}" />
    </q-toolbar>
  </q-header>
  <!-- <new-event :open="newEventDialogOpen" @hide="newEventDialogOpen = false"/> -->
  <!-- <event-list/> -->
</template>
<script>
// import EventList from '../../components/EventList.vue'
// import NewEvent from './dialogs/NewEvent.vue'

export default {
  // components: { NewEvent },
  data () {
    return {
      newEventDialogOpen: false
    }
  }
}
</script>
