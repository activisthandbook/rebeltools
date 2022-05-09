<template>
  <q-card flat bordered>
    <q-list padding>
      <q-item>
        <q-item-section class="text-bold">
          Organisers dashboard
        </q-item-section>
        <q-item-section side>
          <q-btn
            v-if="!editing"
            label="Edit event"
            flat
            no-caps
            color="secondary"
            icon="mdi-pencil"
            dense
            :to="{
              name: 'Dashboard Event Edit',
              params: { eventID: event.id },
            }"
          />
          <q-btn
            v-else
            label="View event"
            flat
            no-caps
            color="secondary"
            icon="mdi-eye"
            dense
            :to="{
              name: 'Event',
              params: { eventPath: event.path },
            }"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <q-card-section class="q-pt-none">
      <div class="q-gutter-y-sm">
        <q-list class="q-col-gutter-sm row">
          <div class="col-12 col-sm-6">
            <q-item
              class="rounded-borders bg-secondary"
              clickable
              v-ripple
              dark
              @click="openParticipantsDialog()"
            >
              <q-item-section avatar>
                <q-avatar icon="mdi-check-bold" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Participants</q-item-label>
                <!-- <q-item-label caption>Name, name, name</q-item-label> -->
              </q-item-section>
              <q-item-section side>
                <h2 class="text-white">{{ event.countSignups }}</h2>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-12 col-sm-6">
            <q-item
              class="bg-secondary rounded-borders disabled"
              clickable
              v-ripple
              dark
            >
              <q-item-section avatar>
                <q-avatar icon="mdi-comment-question-outline" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Form submissions!</q-item-label>
              </q-item-section>
              <q-item-section side>
                <h2 class="text-white">-</h2>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-12 col-sm-6">
            <q-item
              class="bg-secondary rounded-borders disabled"
              clickable
              v-ripple
              dark
            >
              <q-item-section avatar>
                <q-avatar icon="mdi-share" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Invited</q-item-label>
              </q-item-section>
              <q-item-section side>
                <h2 class="text-white">-</h2>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-12 col-sm-6">
            <q-item
              class="bg-secondary rounded-borders disabled"
              clickable
              v-ripple
              dark
            >
              <q-item-section avatar>
                <q-avatar icon="mdi-google-analytics" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Page views</q-item-label>
              </q-item-section>
              <q-item-section side>
                <h2 class="text-white">-</h2>
              </q-item-section>
            </q-item>
          </div>
        </q-list>
      </div>
    </q-card-section>
  </q-card>

  <q-dialog v-model="participantsDialog" :maximized="$q.screen.lt.sm">
    <q-layout view="hHh lpR fFf" container class="bg-grey-1">
      <q-header class="bg-white text-black" bordered>
        <q-toolbar>
          <q-btn flat round dense icon="mdi-close" v-close-popup />

          <q-toolbar-title>Event participants</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <member-list
          :members="members.data"
          :loaded="members.dataLoaded"
          :error="members.error"
        />
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>
<script>
import MemberList from "components/lists/MemberList";

import {
  query,
  onSnapshot,
  getFirestore,
  where,
  collection,
} from "firebase/firestore";
const db = getFirestore();

export default {
  components: {
    MemberList,
  },
  props: {
    event: {
      type: Object,
    },
    editing: {
      type: Boolean,
    },
  },
  data() {
    return {
      participantsDialog: false,
      members: {
        data: [],
        dataLoaded: false,
        error: null,
      },
    };
  },
  methods: {
    openParticipantsDialog() {
      this.participantsDialog = true;
      if (!this.members.dataLoaded) {
        const membersProfileRef = collection(
          db,
          "movements",
          this.$store.state.currentMovement.data.id,
          "members"
        );
        const q = query(
          membersProfileRef,
          where("eventSignups", "array-contains", this.event.id)
        );

        onSnapshot(
          q,
          (querySnapshot) => {
            const memberList = [];
            querySnapshot.forEach((doc) => {
              memberList.push(doc.data());
            });
            this.members.data = memberList;
            this.members.dataLoaded = true;
          },
          (error) => {
            this.members.error = error;
          }
        );
      }
    },
  },
};
</script>
