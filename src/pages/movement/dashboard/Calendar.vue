<template>
  <q-header bordered class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title>Calendar</q-toolbar-title>
      <q-btn round flat icon="mdi-magnify" disable />
    </q-toolbar>
  </q-header>

  <q-page-container>
    <q-page padding>
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
          <!-- CALENDAR LIST -->
          <event-list
            :events="events.data"
            :loaded="events.dataLoaded"
            :error="events.error"
          />
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
    </q-page>
  </q-page-container>
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
      tab: "upcoming",
      events: {
        unsubscribe: null,
        dataLoaded: false,
        data: null,
        error: null,
      },
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
      // this.events.dataLoaded = false;

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

      this.events.unsubscribe = onSnapshot(
        // Query the collection
        q,
        // Process the data that is received
        (querySnapshot) => {
          const events = [];
          querySnapshot.forEach((doc) => {
            events.push({
              ...doc.data(),
              id: doc.id,
            });
          });
          this.events.data = events;
          this.events.dataLoaded = true;
        },
        // Handle errors
        (error) => {
          this.events.dataLoaded = true;
          this.events.error = error;
        }
      );
    },
  },
};
</script>
