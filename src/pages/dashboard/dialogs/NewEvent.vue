<template>
  <q-header bordered class="bg-secondary text-white">
    <q-toolbar>
      <q-btn flat round dense icon="mdi-close" :to="{name: 'Dashboard Calendar'}" />
      <q-toolbar-title>New event</q-toolbar-title>
      <q-btn label="Create" no-caps color="white" text-color="black" @click="createEvent()"/>
    </q-toolbar>
  </q-header>

  <q-card>
    <q-card-section>
      <div class="q-gutter-y-sm">
        <div class="text-bold">Event details</div>

        <q-input
          label="📢 Event title"
          outlined
          color="secondary"
          v-model="newEvent.title"
          :error="this.v$.newEvent.title.$error"
          :errorMessage="mixin_mergeErrorMessages(this.v$.newEvent.title.$errors)"
        />

        <q-input
          label="📆 Date and time"
          hint="Automatically uses your timezone"
          outlined color="secondary"
          type="datetime-local"
          stack-label
          v-model="newEvent.date"
          :error="this.v$.newEvent.date.$error"
          :errorMessage="mixin_mergeErrorMessages(this.v$.newEvent.date.$errors)"
        />
        <q-input label="📝 Event description" outlined type="textarea" color="secondary" v-model="newEvent.description"/>
        <q-item clickable class="q-pa-none bg-grey-3 rounded-borders" v-ripple>
          <q-img :ratio="16/9">

          <q-chip class="q-ma-lg" icon="mdi-image" color="white" text-color="black">Open image editor</q-chip>

          </q-img>
        </q-item>
      </div>
    </q-card-section>
  </q-card>

</template>
<script>
import { getAnalytics, logEvent } from 'firebase/analytics'
const analytics = getAnalytics()

import useVuelidate from '@vuelidate/core'

import { Notify } from 'quasar'

export default {
  props: ['open'],
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      loading: false,
      newEvent: {
        title: '',
        path: 'test',
        date: '',
        movementID: null,
        description: ''
      }
    }
  },
  validations () {
    return {
      newEvent: this.$store.state.currentEvent.validations
    }
  },
  methods: {
    async createEvent () {
      this.loading = true
      this.newEvent.movementID = this.$store.state.currentMovement.data.id

      await this.$store.dispatch('currentEvent/addToDatabase', this.newEvent).then(() => {
        this.loading = false
        this.$router.push({ name: 'Dashboard Calendar' })
        logEvent(analytics, 'event_created')
      }).catch((error) => {
        Notify.create({ message: error, icon: 'mdi-alert' })
      })
    }
  }
}
</script>
