<template>
  <q-header bordered class="bg-secondary text-white">
    <q-toolbar>
      <q-btn
        flat
        round
        dense
        icon="mdi-close"
        :to="{ name: 'Dashboard Calendar' }"
      />
      <q-toolbar-title
        class="gt-xs"
        v-if="$route.name === 'Dashboard New Event'"
        >Create event</q-toolbar-title
      >
      <q-toolbar-title
        class="gt-xs"
        v-if="$route.name === 'Dashboard Event Edit'"
        >Edit event</q-toolbar-title
      >
      <q-toolbar-title class="lt-sm">Event</q-toolbar-title>
      <q-space />
      <div class="q-gutter-x-sm" v-if="$route.name === 'Dashboard New Event'">
        <q-btn
          label="Save draft"
          no-caps
          outline
          color="white"
          @click="createEvent()"
          :loading="loading"
        />

        <q-btn
          label="Publish"
          no-caps
          color="white"
          text-color="black"
          @click="createEvent()"
          :loading="loading"
          :disable="this.v$.event.data.$invalid"
        />
      </div>
      <div class="q-gutter-x-sm" v-if="$route.name === 'Dashboard Event Edit'">
        <q-btn
          label="Unpublish"
          no-caps
          color="white"
          outline
          :loading="loading"
          :disable="this.v$.event.data.$invalid"
        />
        <q-btn
          label="Save"
          no-caps
          color="white"
          text-color="black"
          @click="createEvent()"
          :loading="loading"
          :disable="this.v$.event.data.$invalid"
        />
      </div>
    </q-toolbar>
  </q-header>

  <div v-if="!event.dataLoaded">Loading...</div>
  <div v-else-if="event.error">Something went wrong loading this event.</div>
  <div v-else class="q-gutter-y-md">
    <mini-event-dashboard
      :event="event.data"
      v-if="$route.name === 'Dashboard Event Edit'"
      editing
    />
    <!-- ℹ️ BASIC INFO -->
    <q-card>
      <q-card-section>
        <div class="q-gutter-y-sm">
          <div class="text-bold">About this event</div>

          <q-input
            label="📢 Event title"
            outlined
            color="secondary"
            v-model="event.data.title"
            :error="this.v$.event.data.title.$error"
            :errorMessage="
              mixin_mergeErrorMessages(this.v$.event.data.title.$errors)
            "
            @blur="generatePath()"
          />

          <q-input
            placeholder="my-url"
            bottom-slots
            filled
            color="secondary"
            dense
            v-model="event.data.path"
          >
            <template v-slot:hint>
              <div>
                {{
                  "rebel.tools/" +
                  this.$store.state.currentMovement.data.path +
                  "/events/" +
                  event.data.path
                }}
              </div>
            </template>
            <template v-slot:prepend>
              <div class="text-grey-8 text-body2">🔗</div>
            </template>
          </q-input>

          <q-input
            label="👉 Call to action"
            outlined
            type="textarea"
            color="secondary"
            v-model="event.data.callToAction"
            autogrow
            input-style="min-height: 2em"
            counter
            maxlength="250"
            hint="Keep it short"
          />

          <q-input
            label="📝 Event description"
            outlined
            type="textarea"
            color="secondary"
            v-model="event.data.description"
            autogrow
            input-style="min-height: 6em"
          />
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
            outlined
            color="secondary"
            type="datetime-local"
            stack-label
            v-model="event.data.startDateLocalFormat"
            :error="this.v$.event.data.startDateLocalFormat.$error"
            :errorMessage="
              mixin_mergeErrorMessages(
                this.v$.event.data.startDateLocalFormat.$errors
              )
            "
          />
          <q-input
            label="Ends at"
            outlined
            color="secondary"
            type="datetime-local"
            stack-label
            :disable="!event.data.startDateLocalFormat"
            :dense="!event.data.startDateLocalFormat"
            v-model="event.data.endDateLocalFormat"
            :error="this.v$.event.data.endDateLocalFormat.$error"
            :errorMessage="
              mixin_mergeErrorMessages(
                this.v$.event.data.endDateLocalFormat.$errors
              )
            "
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
            outlined
            color="secondary"
            v-model="event.data.address"
            :error="this.v$.event.data.address.$error"
            :errorMessage="
              mixin_mergeErrorMessages(this.v$.event.data.address.$errors)
            "
          />
          <q-input
            label="🔗 Online link"
            outlined
            color="secondary"
            hint="Video call, livestream or other online space"
            v-model="event.data.onlineLink"
            :error="this.v$.event.data.onlineLink.$error"
            :errorMessage="
              mixin_mergeErrorMessages(this.v$.event.data.onlineLink.$errors)
            "
          >
            <template v-slot:append>
              <q-btn
                icon="mdi-video-plus"
                label="Add video call"
                no-caps
                color="secondary"
                flat
                dense
                @click="generateJitsiLink()"
                v-show="!jitsiLinkGenerated || !event.data.onlineLink"
              />
            </template>
          </q-input>
        </div>
      </q-card-section>
    </q-card>

    <!-- 🏞 VISUALS -->
    <image-selector />

    <!-- 🛠 ADVANCED TOOLS -->
    <q-card>
      <q-expansion-item
        expand-separator
        icon="mdi-comment-question-outline"
        label="Attach form"
      >
        <q-card>
          <q-card-section>
            <div class="q-gutter-sm">
              <div>
                Attach a form to ask additional questions to participants, after
                they have signed up.
              </div>
              <q-input label="📄 Search forms" outlined color="secondary">
                <template v-slot:append>
                  <q-btn
                    icon="mdi-comment-question-outline"
                    label="Create new"
                    no-caps
                    color="grey"
                    flat
                    dense
                  >
                    <q-tooltip>Forms coming soon</q-tooltip>
                  </q-btn>
                </template>
              </q-input>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item
        expand-separator
        icon="mdi-information"
        label="Info for participants"
      >
        <q-card>
          <q-card-section>
            <div class="q-gutter-sm">
              <q-input
                label="📄 Document link"
                outlined
                color="secondary"
                v-model="event.data.document"
                :error="this.v$.event.data.document.$error"
                :errorMessage="
                  mixin_mergeErrorMessages(this.v$.event.data.document.$errors)
                "
              >
                <template v-slot:append>
                  <q-btn
                    icon="mdi-file-document"
                    label="Create Google Docs"
                    no-caps
                    color="grey"
                    flat
                    dense
                  >
                    <q-tooltip>Google Docs integration coming soon</q-tooltip>
                  </q-btn>
                </template>
              </q-input>
              <q-input
                label="1️⃣ How to prepare"
                outlined
                type="textarea"
                color="secondary"
                v-model="event.data.prepare"
                autogrow
                input-style="min-height: 4em"
              />
              <q-input
                label="2️⃣ Next steps"
                outlined
                type="textarea"
                color="secondary"
                v-model="event.data.nextSteps"
                autogrow
                input-style="min-height: 4em"
              />
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item
        expand-separator
        icon="mdi-calendar-sync"
        label="Magic sync ✨"
      >
        <q-card>
          <q-card-section>
            <div class="q-gutter-y-sm">
              <div>
                Soon, you'll be able to sync your Rebel Tools events
                automagically.
              </div>
              <q-list bordered class="rounded-borders">
                <q-item tag="label" v-ripple disable>
                  <q-item-section avatar>
                    <q-icon name="mdi-calendar" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Google Calendar</q-item-label>
                  </q-item-section>
                  <q-item-section avatar>
                    <q-toggle
                      color="secondary"
                      v-model="event.data.sync.GoogleCalendar"
                    />
                  </q-item-section>
                </q-item>
                <q-item tag="label" v-ripple disable>
                  <q-item-section avatar>
                    <q-icon name="mdi-facebook" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Facebook Event</q-item-label>
                  </q-item-section>
                  <q-item-section avatar>
                    <q-toggle
                      color="secondary"
                      v-model="event.data.sync.FacebookPage"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-card>
  </div>
</template>
<script>
import ImageSelector from "components/ImageSelector";
import MiniEventDashboard from "components/miniDashboards/MiniEventDashboard";

import {
  getFirestore,
  onSnapshot,
  doc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";
const analytics = getAnalytics();

import useVuelidate from "@vuelidate/core";

export default {
  components: {
    ImageSelector,
    MiniEventDashboard,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      loading: false,
      jitsiLinkGenerated: false,
      event: {
        data: {
          sync: {},
          path: "",
        },
        dataLoaded: false,
        error: null,
        unsubscribe: null,
      },
    };
  },
  watch: {
    "$route.params.eventID": {
      handler: function () {
        if (this.$route.params.eventID) {
          this.fetchFromDatabase(this.$route.params.eventID);
        }
      },
      immediate: true,
    },
  },
  validations() {
    return {
      event: { data: this.$store.state.currentEvent.validations },
    };
  },
  methods: {
    fetchFromDatabase(eventID) {
      const q = doc(getFirestore(), "calendar", eventID);
      this.event.unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          if (querySnapshot.exists) {
            this.event.data = querySnapshot.data();
            this.event.data.id = querySnapshot.id;
            this.event.dataLoaded = true;
          } else {
            Notify.create({
              message: "Event not found",
              icon: "mdi-alert",
            });
          }
        },
        (error) => {
          // In case of error
          this.event.error = error;
          this.event.dataLoaded = true;

          Notify.create({
            message: error + " (currentEvent.js)",
            icon: "mdi-alert",
          });
        }
      );
    },
    generatePath() {
      if (!this.event.data.path) {
        this.event.data.path = this.event.data.title
          .toLowerCase() // Make everything lowercase
          .trim() // Remove leading and trailing whitespace
          .replaceAll(" ", "-") // Replace spaces with dashes
          .replace(/[^a-z,0-9,-]+/g, "") // Remove all non-alphanumeric characters, except dashes
          .replace(/-{2,}/g, "-"); // Remove any double dashes
      }
    },
    generateJitsiLink() {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < 12; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      this.event.onlineLink =
        "https://meet.jit.si/" +
        this.$store.state.currentMovement.data.path +
        "-" +
        result;
      this.jitsiLinkGenerated = true;
      this.$q.notify({
        message: "Jitsi video call link generated",
        icon: "mdi-check",
        timeout: 2500,
      });
    },
    async createEvent() {
      this.loading = true;

      const serverData = {
        timestampCreated: serverTimestamp(),
        published: true,
        movementID: this.$store.state.currentMovement.data.id,
        ...this.event.data,
      };
      serverData.startDate = this.convertToFirestoreTimestamp(
        this.event.startDateLocalFormat
      );
      serverData.endDate = this.convertToFirestoreTimestamp(
        this.event.endDateLocalFormat
      );

      this.$store
        .dispatch("currentEvent/addToDatabase", serverData)
        .then(() => {
          this.loading = false;
          this.$router.push({ name: "Dashboard Calendar" });
          logEvent(analytics, "event_created");
        });
    },
    convertToFirestoreTimestamp(dateTimeLocal) {
      const b = dateTimeLocal.split(/\D+/);
      const jsDate = new Date(
        b[0],
        --b[1],
        b[2],
        b[3],
        b[4],
        b[5] || 0,
        b[6] || 0
      );

      return Timestamp.fromDate(jsDate);
    },
  },
};
</script>
