<template>
  <q-header bordered class="bg-secondary text-white">
    <q-toolbar>
      <q-btn flat round dense icon="mdi-close" :to="{name: 'Dashboard Calendar'}" />
      <q-toolbar-title class="gt-xs">Create event</q-toolbar-title>
      <q-toolbar-title class="lt-sm">Event</q-toolbar-title>
      <q-space/>
      <div class="q-gutter-x-sm">
        <q-btn label="Save draft" no-caps color="white" text-color="black" @click="createEvent()" :loading="loading"/>
        <q-btn label="Publish" no-caps color="white" text-color="black" @click="createEvent()" :loading="loading" :disable="this.v$.newEvent.$invalid"/>
      </div>
    </q-toolbar>
  </q-header>

  <div class="q-gutter-y-md">

    <!-- ℹ️ BASIC INFO -->
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

          <q-input label="👉 Call to action" outlined type="textarea" color="secondary" v-model="newEvent.callToAction" autogrow input-style="min-height: 2em" counter maxlength="250" hint="Keep it short"/>

          <q-input label="📝 Event description" outlined type="textarea" color="secondary" v-model="newEvent.description"  autogrow input-style="min-height: 6em"/>

        </div>
      </q-card-section>
    </q-card>

    <!-- 📆 DATE AND TIME -->
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
            :disable="!newEvent.startDate"
            :dense="!newEvent.startDate"
            v-model="newEvent.endDate"
            :error="this.v$.newEvent.endDate.$error"
            :errorMessage="mixin_mergeErrorMessages(this.v$.newEvent.endDate.$errors)"
          />
          <div class="text-caption">Automatically uses your timezone</div>
        </div>
      </q-card-section>
    </q-card>

    <!-- 📍 LOCATION -->
    <q-card>
      <q-card-section>
        <div class="q-gutter-y-sm">
          <div class="text-bold">Location (optional)</div>
          <q-input
            label="📍 Address"
            outlined color="secondary"
            v-model="newEvent.address"
            :error="this.v$.newEvent.address.$error"
            :errorMessage="mixin_mergeErrorMessages(this.v$.newEvent.address.$errors)"
          />
          <q-input
            label="🔗 Online link"
            outlined color="secondary"
            hint="Video call, livestream or other online space"
            v-model="newEvent.onlineLink"
            :error="this.v$.newEvent.onlineLink.$error"
            :errorMessage="mixin_mergeErrorMessages(this.v$.newEvent.onlineLink.$errors)"
          >
             <template v-slot:append>
                <q-btn icon="mdi-video-plus" label="Add video call" no-caps color="secondary" flat dense @click="generateJitsiLink()" v-show="!jitsiLinkGenerated || !newEvent.onlineLink"/>
              </template>
          </q-input>
        </div>
      </q-card-section>
    </q-card>

    <!-- 🏞 VISUALS -->
    <image-selector/>

    <!-- 🛠 ADVANCED TOOLS -->
    <q-card>
      <q-expansion-item expand-separator icon="mdi-information" label="Info for participants">
        <q-card>
          <q-card-section>
            <div class="q-gutter-sm">
              <q-input
                label="📄 Document link"
                outlined color="secondary"
                v-model="newEvent.document"
                :error="this.v$.newEvent.document.$error"
                :errorMessage="mixin_mergeErrorMessages(this.v$.newEvent.document.$errors)"

              >
                <template v-slot:append>
                  <q-btn icon="mdi-file-document" label="Create Google Docs" no-caps color="grey" flat dense>
                    <q-tooltip>Google Docs integration coming soon</q-tooltip>
                  </q-btn>
                </template>
              </q-input>
              <q-input label="1️⃣ How to prepare" outlined type="textarea" color="secondary" v-model="newEvent.prepare"  autogrow input-style="min-height: 4em"/>
              <q-input label="2️⃣ Next steps" outlined type="textarea" color="secondary" v-model="newEvent.nextSteps"  autogrow input-style="min-height: 4em"/>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item expand-separator icon="mdi-calendar-sync" label="Magic sync ✨">
        <q-card>
          <q-card-section>
            <div class="q-gutter-y-sm">
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
                    <q-toggle color="secondary" v-model="newEvent.sync.GoogleCalendar"/>
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
                    <q-toggle color="secondary" v-model="newEvent.sync.FacebookPage"/>
                  </q-item-section>
                </q-item>
          </q-list>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-card>

    <activist-handbook
      title="Guides for organisers"
      description="Learn how to organise succesful actions from experienced campaigners around the globe. Here are some relevant guides from Activist Handbook:"
      campaign="new_event"
      :articles="[
        {title: 'How to organise actions', link: 'https://activisthandbook.org/en/organising/action'},
        {title: 'Explore tactics', link: 'https://activisthandbook.org/en/tactics'}
      ]"
    />
  </div>

</template>
<script>
import ActivistHandbook from 'components/ActivistHandbook'
import ImageSelector from 'components/ImageSelector'

import { Timestamp, serverTimestamp } from 'firebase/firestore'
import { getAnalytics, logEvent } from 'firebase/analytics'
const analytics = getAnalytics()

import useVuelidate from '@vuelidate/core'

export default {
  components: { ActivistHandbook, ImageSelector },
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      loading: false,
      jitsiLinkGenerated: false,
      newEvent: {
        title: '',
        path: '',
        address: '',
        onlineLink: '',
        startDate: '',
        callToAction: '',
        description: '',
        document: '',
        prepare: '',
        followUp: '',
        sync: {
          googleCalendar: false,
          facebookPage: false
        }
      }
    }
  },
  validations () {
    return {
      newEvent: this.$store.state.currentEvent.validations
    }
  },
  methods: {
    generateJitsiLink () {
      let result = ''
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const charactersLength = characters.length
      for (let i = 0; i < 12; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      this.newEvent.onlineLink = 'https://meet.jit.si/' + this.$store.state.currentMovement.data.path + '-' + result
      this.jitsiLinkGenerated = true
      this.$q.notify({ message: 'Jitsi video call link generated', icon: 'mdi-check', timeout: 2500 })
    },
    async createEvent () {
      this.loading = true

      const serverData = {
        createdOn: serverTimestamp(),
        published: true,
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
