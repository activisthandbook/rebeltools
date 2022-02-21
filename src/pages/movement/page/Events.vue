<!--
PAGE: MOVEMENT / EVENTS 📆
This page shows oppertunities for people to get involved in the movement community.

Path: /:movementID/events
 -->
<template>
  <h1>Events</h1>
  <q-btn to="events/xyz" label="Placeholder button"/>
  <!-- <q-card v-ripple class="cursor-pointer">
    <q-img :ratio="16/9" src="https://source.unsplash.com/random?protesting"/>
      <q-item clickable class="q-pa-md">
        <q-item-section>
          <q-item-label caption>4 Feb 14:00, Online</q-item-label>
          <q-item-label class="text-bold">The big protest</q-item-label>
          <q-item-label caption>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa repudiandae iure architecto, alias dignissimos ipsum magnam corrupti totam in illum! Animi tempore cumque doloremque, ipsa mollitia velit molestias assumenda quibusdam?</q-item-label>

          <q-item-label caption>
            <q-chip label="You + 22 others" icon="mdi-check-circle" color="primary" text-color="white" size="sm"/>
          </q-item-label>
        </q-item-section>

      </q-item>

  </q-card> -->
  <event-list/>
  <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="admins.includes(userUID)">
    <q-btn icon="mdi-calendar-edit" color="primary" fab :to="{name: 'Dashboard Calendar'}"/>
  </q-page-sticky>
</template>
<script>
import EventList from 'components/EventList'

export default {
  components: { EventList },
  computed: {
    admins: {
      get () { return this.$store.state.currentMovement.data.admins }
    },
    userUID: {
      get () { return this.$store.state.auth.data.uid }
    }
  }
}
</script>
