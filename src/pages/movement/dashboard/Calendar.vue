<template>
  <q-header bordered class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title>Calendar</q-toolbar-title>
      <q-btn icon="mdi-plus" label="Create" no-caps color="white" text-color="black" :to="{name: 'Dashboard New Event'}" />
    </q-toolbar>
  </q-header>

  <div class="q-gutter-y-md">

    <q-tabs v-model="tab" inline-label no-caps class="bg-grey-3 rounded-borders">
      <q-tab name="upcoming" icon="mdi-calendar" label="Upcoming" />
      <q-tab name="past" icon="mdi-history" label="Past" />
    </q-tabs>

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

      <q-card-section v-else-if="!data.length" class="text-body2 text-center">
        No events planned.
      </q-card-section>

      <q-list separator v-else>
        <q-item class="full-width q-pa-md" v-for="event in data" :key="event.id" clickable :to="{ name: 'Dashboard Event', params: { eventID: event.id } }">
          <q-item-section class="col-4  overflow-hidden row items-center q-pr-sm">
            <q-img :ratio="16/9" :src="'https://source.unsplash.com/random/160x90?sig=' + Math.floor(Math.random() * 1000)" class="rounded-borders bg-grey-2 cursor-pointer" spinner-color="transparent"/>
          </q-item-section>
          <q-item-section>
            <q-item-label caption>
              {{ mixin_humanDate(event.startDate) }}
            </q-item-label>
            <q-item-label class="text-bold q-ma-none">
              <span class="cursor-pointer q-mr-xs" >{{ event.title }}</span>
            </q-item-label>
            <q-item-label class="q-gutter-xs">
               <q-chip icon="mdi-cursor-default-click" :label="event.signupCount + ' signups'" size="sm" class="q-ma-none text-bold" color="secondary" dark/>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>

    <activist-handbook
        title="Guides for organisers"
        description="Learn how to organise succesful actions from experienced campaigners around the globe. Here are some relevant guides from Activist Handbook:"
        campaign="dashboard_calendar"
        :articles="[
          {title: 'How to organise actions', link: 'https://activisthandbook.org/en/organising/action'},
          {title: 'Explore tactics', link: 'https://activisthandbook.org/en/tactics'}
        ]"
      />

  </div>
</template>
<script>
import ActivistHandbook from 'components/ActivistHandbook'

import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore'
const db = getFirestore()

export default {
  components: { ActivistHandbook },
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
        year: 'numeric',
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
