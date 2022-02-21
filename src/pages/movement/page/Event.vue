<template>
  <div v-if="!$store.state.currentEvent.dataLoaded">
    <q-img :ratio="1920/1080" class="bg-grey-4"/>
    <q-skeleton type="text"/>
  </div>
  <oops-error
    title="Event not found."
    description="This event was deleted or hidden."
    v-else-if="$store.state.currentEvent.error"
  />
  <div v-else>
    <q-card flat>
      <q-img src="https://source.unsplash.com/random/608x342" :ratio="1920/1080" class="bg-grey-4"/>
      <span class="absolute-bottom-left q-ma-md">
        <q-chip color="white" class="text-bold" square icon="mdi-map-marker">
          Online
        </q-chip><br>
        <q-chip color="white" class="text-bold" square size="xl">
          <q-avatar icon="mdi-calendar" color="primary" text-color="white" />
          {{humanDate($store.state.currentEvent.data.startDate)}}
        </q-chip>
      </span>
    </q-card>
    <smart-action
      :action="{
        actionType: 'event',
        actionID: $store.state.currentEvent.data.id,
        title: $store.state.currentEvent.data.title,
        description: 'Event signup description...',
        buttonLabel: 'Sign up for event'
      }"
    />
    <div class="text-caption text-bold">Sign up for this event to get access to additional info.</div>

    <q-card bordered flat>
      <q-card-section>
        <div class="q-gutter-y-sm">
          <h2>Info for participants</h2>
          <div>Lorem ipsum dolor sit amet, consectetur. Maxime doloremque impedit repellendus adipisci ducimus ut a aliquam.</div>
          <div class="q-gutter-sm">
            <q-btn label="Join video call" no-caps icon="mdi-video" color="secondary"/>
            <!-- <q-btn label="Directions" no-caps icon="mdi-map" color="secondary"/> -->
            <q-btn label="Meeting document" no-caps icon="mdi-file-document" color="secondary"/>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <div style="white-space:pre-wrap;">{{ $store.state.currentEvent.data.description }}</div>
  </div>
  <!-- <h1>Event title</h1> -->
</template>
<script>
import OopsError from 'components/OopsError'

import SmartAction from 'components/SmartAction'

import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import updateLocale from 'dayjs/plugin/updateLocale'
dayjs.extend(calendar)
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  calendar: {
    lastDay: '[Yesterday at] H:mm',
    sameDay: '[Today at] H:mm',
    nextDay: '[Tomorrow at] H:mm',
    lastWeek: '[Last] dddd [at] H:mm',
    nextWeek: 'dddd [at] H:mm',
    sameElse: 'D MMM YYYY, H:mm'
  }
})

export default {
  components: {
    SmartAction,
    OopsError
  },
  created () {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        // console.log(this.$route)
        if (this.$route.params.eventPath) {
          // console.log('event load')
          this.$store.dispatch('currentEvent/subscribeToDatabase', this.$route.params.eventPath)
        }
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  },
  unmounted () {
    this.$store.commit('currentEvent/destroy')
  },
  methods: {
    // a computed getter
    humanDate: function (firestoreTimestamp) {
      // `this` points to the vm instance
      return dayjs(firestoreTimestamp.toDate()).calendar()
    }
  }
}
</script>
