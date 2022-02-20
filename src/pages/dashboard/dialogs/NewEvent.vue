<template>
  <q-header bordered class="bg-secondary text-white">
    <q-toolbar>
      <q-btn flat round dense icon="mdi-close" :to="{name: 'Dashboard Calendar'}" />
      <q-toolbar-title>New event</q-toolbar-title>
      <div class="q-gutter-x-sm">
        <q-btn label="Save draft" no-caps color="white" text-color="black" @click="createEvent()" :loading="loading"/>
        <q-btn label="Publish" no-caps color="white" text-color="black" @click="createEvent()" :loading="loading" :disable="this.v$.newEvent.$invalid"/>
      </div>
    </q-toolbar>
  </q-header>

  <div class="q-gutter-y-md">

    <q-card>
      <q-card-section>
        <div class="q-gutter-y-sm">
          <div class="text-bold">About this event</div>

          <q-input
            label="📢 Event title"
            outlined
            color="secondary"
            v-model="newEvent.title"
            :error="this.v$.newEvent.title.$error"
            :errorMessage="mixin_mergeErrorMessages(this.v$.newEvent.title.$errors)"
          />

          <q-input
            placeholder="my-url"
            bottom-slots

            filled
            color="secondary"
            dense

            v-model="newEvent.path"
          >
            <template v-slot:hint>
              <div>{{'rebel.tools/' + this.$store.state.currentMovement.data.path + '/events/' + newEvent.path}}</div>
            </template>
            <template v-slot:prepend>
              <div class="text-grey-8 text-body2">🔗</div>
            </template>
          </q-input>

          {{newEvent.startDate}}

          <q-input label="👉 Call to action" outlined type="textarea" color="secondary" v-model="newEvent.description" autogrow input-style="min-height: 2em" counter maxlength="250" hint="Keep it short"/>

          <q-input label="📝 Event description" outlined type="textarea" color="secondary" v-model="newEvent.description"  autogrow input-style="min-height: 6em"/>

        </div>
      </q-card-section>
    </q-card>
    <q-card>
      <q-card-section>
        <div class="q-gutter-y-sm">
          <div class="text-bold">Date and time</div>
          <q-input
            label="Starts at"
            outlined color="secondary"
            type="datetime-local"
            stack-label
            v-model="newEvent.startDate"
            :error="this.v$.newEvent.startDate.$error"
            :errorMessage="mixin_mergeErrorMessages(this.v$.newEvent.startDate.$errors)"
          />
          <q-input
            label="Ends at"
            outlined color="secondary"
            type="datetime-local"
            stack-label
            v-model="newEvent.startDate"
            :error="this.v$.newEvent.startDate.$error"
            :errorMessage="mixin_mergeErrorMessages(this.v$.newEvent.startDate.$errors)"
          />
          <div class="text-caption">Automatically uses your timezone</div>
        </div>
      </q-card-section>
    </q-card>
    <q-card>
      <q-card-section>
        <div class="q-gutter-y-sm">
          <div class="text-bold">Visuals</div>
          <q-item clickable class="q-pa-none bg-grey-3 rounded-borders" v-ripple>
            <q-img :ratio="16/9">

            <q-chip class="q-ma-lg" icon="mdi-image" color="white" text-color="black">Select image</q-chip>

            </q-img>
          </q-item>
        </div>
      </q-card-section>
    </q-card>
    <q-card>
      <q-card-section>
        <div class="q-gutter-y-sm">
          <div class="text-bold">Magic sync ✨</div>
          <div>Soon, you'll be able to sync your Rebel Tools events automagically.</div>
          <q-list bordered class="rounded-borders">
            <q-item tag="label" v-ripple disable>
              <q-item-section avatar>
                <q-icon name="mdi-calendar"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Google Calendar</q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-toggle color="secondary"/>
              </q-item-section>
            </q-item>
            <q-item tag="label" v-ripple disable>
              <q-item-section avatar>
                <q-icon name="mdi-facebook"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Facebook Event</q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-toggle color="secondary"/>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>
    </q-card>

  </div>

</template>
<script>
import { Timestamp, serverTimestamp } from 'firebase/firestore'
import { getAnalytics, logEvent } from 'firebase/analytics'
const analytics = getAnalytics()

import useVuelidate from '@vuelidate/core'

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
        path: '',
        startDate: '',
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

      const serverData = {
        createdOn: serverTimestamp(),
        movementID: this.$store.state.currentMovement.data.id,
        ...this.newEvent
      }
      serverData.startDate = this.convertToFirestoreTimestamp(this.newEvent.startDate)

      this.$store.dispatch('currentEvent/addToDatabase', serverData).then(() => {
        this.loading = false
        this.$router.push({ name: 'Dashboard Calendar' })
        logEvent(analytics, 'event_created')
      })
    },
    convertToFirestoreTimestamp (dateTimeLocal) {
      const b = dateTimeLocal.split(/\D+/)
      const jsDate = new Date(b[0], --b[1], b[2], b[3], b[4], b[5] || 0, b[6] || 0)

      return Timestamp.fromDate(jsDate)
    }
  }
}
</script>
