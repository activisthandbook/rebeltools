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
      <q-toolbar-title>Event dashboard</q-toolbar-title>
      <q-btn
        label="Edit"
        icon="mdi-pencil"
        no-caps
        color="white"
        text-color="black"
        :to="{ name: 'Dashboard Event Edit' }"
      />
    </q-toolbar>
  </q-header>
  <div v-if="!$store.state.currentEvent.dataLoaded" class="q-gutter-y-md">
    Loading...
  </div>
  <oops-error
    title="Event not found."
    description="This event was deleted or hidden."
    v-else-if="$store.state.currentEvent.error"
  />
  <div class="q-gutter-y-md" v-else>
    <q-card>
      <q-card-section>
        <q-item class="full-width q-pa-none">
          <q-item-section
            class="col-4 overflow-hidden row items-center q-pr-sm"
          >
            <q-img
              :ratio="16 / 9"
              :src="
                'https://source.unsplash.com/random/160x90?sig=' +
                Math.floor(Math.random() * 1000)
              "
              class="rounded-borders bg-grey-2 cursor-pointer"
              spinner-color="transparent"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-h2 q-ma-none">{{
              $store.state.currentEvent.data.title
            }}</q-item-label>
            <q-item-label>
              <!-- <q-chip label="Date" icon="mdi-calendar"/>
            <q-chip label="Location" icon="mdi-pin"/> -->
              {{ mixin_humanDate($store.state.currentEvent.data.startDate) }},
              {{ $store.state.currentEvent.data.address }}
            </q-item-label>
            <q-item-label class="q-gutter-xs">
              <q-btn
                label="Show event"
                no-caps
                color="secondary"
                icon="mdi-eye"
                size="12px"
                :to="{
                  name: 'Event',
                  params: { eventPath: $store.state.currentEvent.data.path },
                }"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
    <q-card>
      <q-card-section v-if="!members[0]">
        Nobody has signed up for this event yet
      </q-card-section>
      <member-list :members="members" v-else />
    </q-card>
  </div>
</template>
<script>
import OopsError from "components/OopsError";
import MemberList from "components/lists/MemberList";

import {
  query,
  onSnapshot,
  getFirestore,
  collection,
  where,
} from "firebase/firestore";
const db = getFirestore();

export default {
  components: {
    OopsError,
    MemberList,
  },
  data() {
    return {
      membersLoaded: false,
      members: [],
    };
  },
  computed: {
    memberProfilesRef: function () {
      return collection(
        db,
        "movements",
        this.$store.state.currentMovement.data.id,
        "members"
      );
    },
  },
  watch: {
    "$route.params.eventID": {
      handler: function () {
        if (this.$route.params.eventID) {
          this.$store.dispatch(
            "currentEvent/subscribeToDatabaseID",
            this.$route.params.eventID
          );
          this.fetchMembersFromDatabase();
        }
      },
      immediate: true,
    },
  },
  unmounted() {
    this.$store.commit("currentEvent/destroy");
  },
  methods: {
    fetchMembersFromDatabase() {
      const q = query(
        this.memberProfilesRef,
        where("eventSignups", "array-contains", this.$route.params.eventID)
      );

      onSnapshot(q, (querySnapshot) => {
        const memberList = [];
        querySnapshot.forEach((doc) => {
          memberList.push(doc.data());
        });
        this.members = memberList;
        this.membersLoaded = true;
      });
    },
  },
};
</script>
