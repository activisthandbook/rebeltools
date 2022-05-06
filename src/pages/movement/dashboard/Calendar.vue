<template>
  <q-header bordered class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title>Calendar</q-toolbar-title>
      <q-btn round flat icon="mdi-magnify" disable />
    </q-toolbar>
  </q-header>

  <div class="q-gutter-y-md">
    <q-tabs
      v-model="tab"
      inline-label
      no-caps
      class="bg-grey-3 rounded-borders"
    >
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
        <div class="text-grey">Loading events...</div>
      </q-card-section>

      <q-card-section v-else-if="!data.length" class="text-body2 text-center">
        No events planned.
      </q-card-section>

      <!-- CALENDAR LIST -->
      <event-list :events="data" v-else />
    </q-card>

    <activist-handbook
      title="Guides for organisers"
      description="Learn how to organise succesful actions from experienced campaigners around the globe. Here are some relevant guides from Activist Handbook:"
      campaign="dashboard_calendar"
      :articles="[
        {
          title: 'How to organise actions',
          link: 'https://activisthandbook.org/en/organising/action',
        },
        {
          title: 'Explore tactics',
          link: 'https://activisthandbook.org/en/tactics',
        },
      ]"
    />
  </div>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn
      icon="mdi-plus"
      color="primary"
      fab
      :to="{ name: 'Dashboard New Event' }"
    />
  </q-page-sticky>
</template>
<script>
import ActivistHandbook from "components/ActivistHandbook";
import EventList from "components/lists/EventList";
import { Timestamp } from "firebase/firestore";

import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
const db = getFirestore();

export default {
  components: { EventList, ActivistHandbook },
  data() {
    return {
      dataLoaded: false,
      data: null,
      tab: "upcoming",
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.fetchCalendar();
      this.$watch(
        () => this.tab,
        () => {
          this.fetchCalendar();
        },
        // fetch the data when the view is created and the data is
        // already being observed
        { immediate: true }
      );
    });
  },
  methods: {
    fetchCalendar() {
      const today = new Date();

      let q = null;

      if (this.tab === "upcoming") {
        q = query(
          collection(db, "calendar"),
          where("movementID", "==", this.$store.state.currentMovement.data.id),
          where("endDate", ">=", Timestamp.fromDate(today))
        );
      } else {
        q = query(
          collection(db, "calendar"),
          where("movementID", "==", this.$store.state.currentMovement.data.id),
          where("endDate", "<=", Timestamp.fromDate(today))
        );
      }

      onSnapshot(q, (querySnapshot) => {
        const events = [];
        querySnapshot.forEach((doc) => {
          events.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        this.data = events;
        this.dataLoaded = true;
      });
    },
    toReadableTime(timestamp) {
      const time = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "long",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      });
      return time.format(timestamp.toDate());
    },
  },
};
</script>
