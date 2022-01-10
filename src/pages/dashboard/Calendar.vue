<template>
  <q-header bordered class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title>Calendar</q-toolbar-title>
      <q-btn icon="mdi-plus" label="New event" no-caps color="white" text-color="black" :to="{name: 'Dashboard New Event'}" />
    </q-toolbar>
  </q-header>

  <!-- <q-toolbar class="bg-grey-4 rounded-borders q-mb-sm justify-center"> -->
      <!-- <q-toolbar-title>Events</q-toolbar-title>
      <q-space /> -->

      <!--
        notice shrink property since we are placing it
        as child of QToolbar
      -->
      <q-tabs v-model="tab" inline-label no-caps class="bg-grey-3 rounded-borders q-mb-md">
        <q-tab name="upcoming" icon="mdi-calendar" label="Upcoming" />
        <q-tab name="past" icon="mdi-history" label="Past" />
      </q-tabs>
    <!-- </q-toolbar> -->

  <!-- <q-tabs
    v-model="tab"
    no-caps
    outside-arrows
    mobile-arrows
    active-color="secondary"
    inline-label
    class="q-mb-sm"
  >
    <q-tab name="upcoming" icon="mdi-calendar" label="Upcoming" />
    <q-tab name="past" icon="mdi-history" label="Past" />
  </q-tabs> -->
  <q-card>
    <q-card-section v-if="!dataLoaded" class="text-center">
      <q-circular-progress
        color="grey"
        indeterminate
        size="50px"
        class="q-ma-md"
      />
      <div class="text-grey">
        Loading events...
      </div>
    </q-card-section>

    <q-list separator v-else>
      <q-item clickable class="full-width q-pa-sm" v-for="event in data" :key="event.id">
        <div class="col-sm-3 col-4 overflow-hidden row items-center q-pr-md">
          <q-img :ratio="16/9" :src="'https://source.unsplash.com/random/160x90?sig=' + Math.floor(Math.random() * 1000)" class="rounded-borders bg-grey-2" spinner-color="transparent"/>
        </div>
        <q-item-section>
          <div class="text-bold q-ma-none">
            {{ event.title }}
          </div>
          <div class="text-caption">
            <q-chip icon="mdi-calendar" square class="text-caption">
              {{ toReadableTime(event.createdAt) }}
            </q-chip>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>
<script>
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore'
const db = getFirestore()

export default {
  data () {
    return {
      dataLoaded: false,
      data: null,
      tab: 'upcoming'
    }
  },
  mounted () {
    this.$nextTick(function () {
      const q = query(collection(db, 'calendar'), where('movementID', '==', this.$store.state.currentMovement.data.id))

      onSnapshot(q, (querySnapshot) => {
        const events = []
        querySnapshot.forEach((doc) => {
          events.push({
            ...doc.data(),
            id: doc.id
          })
        })
        this.data = events
        this.dataLoaded = true
      })
    })
  },
  methods: {
    toReadableTime (timestamp) {
      const time = new Intl.DateTimeFormat('en', {
        month: 'short',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false

      })
      return time.format(timestamp.toDate())
    }
  }
}
</script>
