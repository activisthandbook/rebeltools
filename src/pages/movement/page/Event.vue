<template>
  <div v-if="!$store.state.currentEvent.dataLoaded" class="q-gutter-y-md">
    <q-skeleton height="112px" />
    <q-card flat>
      <q-img :ratio="1920 / 1080" class="bg-grey-4" />
    </q-card>
    <q-card>
      <q-skeleton height="192.8px" class="bg-secondary" />
    </q-card>
  </div>
  <oops-error
    title="Event not found."
    description="This event was deleted or hidden."
    v-else-if="$store.state.currentEvent.error"
  />
  <div v-else class="q-gutter-y-md">
    <!-- <q-banner
      inline-actions
      class="bg-grey-3"
      v-if="!$store.state.currentEvent.data.published"
    >
      This event has not been published yet.
      <template v-slot:action>
        <q-btn label="Edit" no-caps color="secondary" disable />
      </template>
    </q-banner> -->
    <h1>{{ $store.state.currentEvent.data.title }}</h1>
    <q-card flat>
      <q-img
        src="https://source.unsplash.com/random/608x342"
        :ratio="1920 / 1080"
        class="bg-grey-4"
      />
      <span class="absolute-bottom-left q-ma-md">
        <q-chip
          color="white"
          class="text-bold"
          square
          icon="mdi-video"
          v-if="$store.state.currentEvent.data.onlineLink"
        >
          Online
        </q-chip>
        <q-chip
          color="white"
          class="text-bold"
          square
          icon="mdi-map-marker"
          v-if="$store.state.currentEvent.data.address"
        >
          {{ $store.state.currentEvent.data.address }}
        </q-chip>
        <br />
        <q-chip color="white" class="text-bold" square size="xl">
          <q-avatar icon="mdi-calendar" color="primary" text-color="white" />
          {{ mixin_humanDate($store.state.currentEvent.data.startDate) }}
        </q-chip>
      </span>
    </q-card>
    <!-- <h1>{{ $store.state.currentEvent.data.title }}</h1> -->
    <smart-action
      :action="{
        actionType: 'event',
        actionID: $store.state.currentEvent.data.id,
        title: 'Sign up for event',
        description: $store.state.currentEvent.data.callToAction,
        buttonLabel: 'Join event',
        actionCount: $store.state.currentEvent.data.countSignups,
      }"
    />
    <div style="white-space: pre-wrap">
      {{ $store.state.currentEvent.data.description }}
    </div>
    <div
      class="text-caption text-bold"
      v-if="
        $store.state.currentAction.dataLoaded &&
        $store.state.currentAction.error == 'action-not-found'
      "
    >
      Sign up for this event to get access to additional info.
    </div>
    <mini-event-dashboard
      v-if="admins.includes(userUID)"
      :event="$store.state.currentEvent.data"
    />
    <q-card
      bordered
      flat
      v-if="
        admins.includes(userUID) ||
        ($store.state.currentAction.dataLoaded &&
          !$store.state.currentAction.error)
      "
    >
      <q-card-section>
        <div class="q-gutter-y-sm">
          <div class="text-bold">Joining info</div>
          <div v-if="$store.state.currentEvent.data.prepare">
            {{ $store.state.currentEvent.data.prepare }}
          </div>
          <div class="q-gutter-sm">
            <q-btn
              label="Join online"
              no-caps
              icon="mdi-video"
              color="black"
              outline
              v-if="$store.state.currentEvent.data.onlineLink"
              :href="$store.state.currentEvent.data.onlineLink"
              target="_blank"
            />
            <q-btn
              label="Map directions"
              no-caps
              icon="mdi-directions"
              color="black"
              outline
              :href="
                'https://www.google.com/maps/dir//' +
                $store.state.currentEvent.data.address
              "
              target="_blank"
              v-if="$store.state.currentEvent.data.address"
            />
            <q-btn
              label="Document"
              no-caps
              icon="mdi-file-document"
              color="black"
              outline
              :href="$store.state.currentEvent.data.document"
              v-if="$store.state.currentEvent.data.document"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
  <q-page-scroller
    reverse
    position="bottom"
    :scroll-offset="300"
    :offset="[0, 0]"
    expand
  >
    <div
      class="col cursor-pointer q-pa-sm bg-white text-primary text-bold text-center shadow-5"
    >
      <q-icon name="mdi-arrow-down" />Joining info
    </div>
    <!-- <q-btn
      icon="mdi-arrow-down"
      label="Participant info"
      no-caps
      color="primary"
      unelevated
      class="shadow-4"
    /> -->
  </q-page-scroller>
  <q-page-sticky
    position="bottom-right"
    :offset="[18, 18]"
    v-if="admins.includes(userUID)"
  >
    <q-btn
      icon="mdi-pencil"
      color="primary"
      fab
      :to="{
        name: 'Dashboard Event Edit',
        params: { eventID: $store.state.currentEvent.data.id },
      }"
    />
  </q-page-sticky>
</template>
<script>
import { openURL } from "quasar";

import OopsError from "components/OopsError";
import MiniEventDashboard from "components/miniDashboards/MiniEventDashboard";
import SmartAction from "components/SmartAction";

// import dayjs from 'dayjs'
// import calendar from 'dayjs/plugin/calendar'
// import updateLocale from 'dayjs/plugin/updateLocale'
// dayjs.extend(calendar)
// dayjs.extend(updateLocale)

// dayjs.updateLocale('en', {
//   calendar: {
//     lastDay: '[Yesterday at] H:mm',
//     sameDay: '[Today at] H:mm',
//     nextDay: '[Tomorrow at] H:mm',
//     lastWeek: '[Last] dddd [at] H:mm',
//     nextWeek: 'dddd [at] H:mm',
//     sameElse: 'D MMM YYYY, H:mm'
//   }
// })

export default {
  components: {
    SmartAction,
    OopsError,
    MiniEventDashboard,
  },
  mounted() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        if (this.$route.params.eventPath) {
          this.$store.dispatch(
            "currentEvent/subscribeToDatabase",
            this.$route.params.eventPath
          );
        }
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
  },
  unmounted() {
    this.$store.commit("currentEvent/destroy");
  },
  methods: {
    openExternal: (link) => {
      openURL(link);
    },
  },
  computed: {
    admins: {
      get() {
        return this.$store.state.currentMovement.data.admins;
      },
    },
    userUID: {
      get() {
        return this.$store.state.auth.data.uid;
      },
    },
  },
};
</script>
