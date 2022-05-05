<template>
  <q-header bordered class="bg-secondary text-white">
    <q-toolbar>
      <q-btn
        flat
        round
        dense
        icon="mdi-close"
        :to="{ name: 'Dashboard Community' }"
      />
      <q-toolbar-title>Rebel profile</q-toolbar-title>
    </q-toolbar>
  </q-header>
  <div v-if="!memberDataLoaded">Loading...</div>
  <oops-error
    title="Member not found."
    description="This member was deleted."
    v-else-if="memberError"
  />
  <div class="q-gutter-y-md" v-else>
    <q-card>
      <q-list>
        <q-item class="q-mt-sm">
          <q-item-section avatar>
            <avatar-image :userID="$route.params.userID" size="64px" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="row no-wrap items-center justify-between">
              <h2 class="ellipsis q-pa-xs">
                {{ memberData.firstName }} {{ memberData.lastName }}
              </h2>
              <!-- <q-btn no-caps color="secondary" outline size="14px" padding="4px 4px" rounded style="flex-shrink:0">
                <span class="q-ml-sm q-mr-xs">Boost</span>
                <q-chip icon="mdi-lightning-bolt-circle" color="secondary" text-color="white" class="q-my-none q-mx-none cursor-pointer" label="1" size="12px"/>
                <q-tooltip>Add points to engagement score</q-tooltip>
              </q-btn> -->
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-card-section class="q-pt-sm">
        <q-input
          label="📝 Notes"
          outlined
          color="secondary"
          type="textarea"
          autogrow
          input-style="min-height: 2em"
          v-model="memberData.notes"
          @blur="saveNotes()"
        />
        <div class="q-gutter-sm q-mt-sm">
          <q-btn
            icon="mdi-phone"
            label="Call"
            no-caps
            color="secondary"
            :href="'tel:' + memberData.phoneNumber"
          />
          <q-btn
            icon="mdi-chat"
            label="Chat"
            no-caps
            color="secondary"
            :href="
              'sms:' +
              memberData.phoneNumber +
              '&body=Hi%20' +
              memberData.firstName
            "
          />
          <q-btn
            label="Email"
            icon="mdi-email"
            no-caps
            color="secondary"
            :href="
              'mailto:' +
              memberData.firstName +
              ' <' +
              memberData.emailAddress +
              '>'
            "
            target="_blank"
          />
          <!-- <q-btn no-caps color="secondary" outline size="12px" padding="4px 4px">
            <span class="q-mx-sm">Boost</span>
            <q-chip icon="mdi-lightning-bolt-circle" color="secondary" text-color="white" class="q-my-none q-mx-none cursor-pointer" label="1" size="sm"/>
            <q-tooltip>Engagement score</q-tooltip>
          </q-btn> -->
        </div>
      </q-card-section>
    </q-card>
    <q-card>
      <q-list padding>
        <q-item>
          <q-item-section>
            <q-item-label class="text-bold">
              <span>About</span>
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn
              no-caps
              color="secondary"
              padding="5px 5px"
              rounded
              style="flex-shrink: 0"
              class="q-ma-none"
              icon="mdi-plus"
            >
              <span class="q-ml-xs q-mr-xs">Add engagement</span>
              <q-chip
                icon="mdi-lightning-bolt-circle"
                color="white"
                text-color="secondary"
                class="q-my-none q-mx-none cursor-pointer"
                size="12px"
                label="8"
              >
                <!-- <div class="q-pr-xs">8<span style="font-size:8px;position:absolute;margin-top:-3px;">+1</span></div> -->
              </q-chip>
              <q-tooltip
                :offset="[0, 8]"
                class="text-body2 bg-white text-black shadow-7"
                >Add points to engagement score! ⚡️</q-tooltip
              >
              <!-- <q-icon name="mdi-plus" size="14px"/> -->
            </q-btn>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon name="mdi-badge-account" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="row no-wrap items-center justify-between">
              <span class="ellipsis q-pa-xs">Project facilitator</span>
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn
              icon="mdi-pencil"
              label="Edit"
              no-caps
              flat
              size="14px"
              color="black"
              padding="4px 8px"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon name="mdi-email" />
          </q-item-section>
          <q-item-section class="ellipsis">
            {{ memberData.emailAddress }}
          </q-item-section>
          <q-item-section side>
            <q-btn icon="mdi-content-copy" round flat dense />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon name="mdi-phone" />
          </q-item-section>
          <q-item-section class="ellipsis">
            ‭{{ memberData.phoneNumber }}
          </q-item-section>
          <q-item-section side>
            <q-btn icon="mdi-content-copy" round flat dense />
          </q-item-section>
        </q-item>
        <q-item disable>
          <q-item-section avatar>
            <q-icon name="mdi-map" />
          </q-item-section>
          <q-item-section class="ellipsis"> Location </q-item-section>
        </q-item>
      </q-list>
    </q-card>
    <q-card class="q-py-sm">
      <q-item>
        <q-item-section>
          <q-item-label class="text-bold">
            <span>Activity</span>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-expansion-item v-model="eventsExpanded" expand-separator>
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar icon="mdi-calendar" />
          </q-item-section>

          <q-item-section> Events </q-item-section>

          <q-item-section side>
            <q-chip
              icon="mdi-cursor-default-click"
              class="q-my-none q-mx-none"
              :label="2"
              size="12px"
            >
              <q-tooltip>Online activity</q-tooltip>
            </q-chip>
          </q-item-section>
        </template>
        <q-list>
          <q-item>
            <q-item-section>‭{{ memberData.eventSignups }}</q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
      <q-expansion-item v-model="campaignsExpanded" expand-separator>
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar icon="mdi-bullhorn" />
          </q-item-section>

          <q-item-section> Campaigns </q-item-section>

          <q-item-section side>
            <q-chip
              icon="mdi-cursor-default-click"
              class="q-my-none q-mx-none"
              :label="1"
              size="12px"
            >
              <q-tooltip>Online activity</q-tooltip>
            </q-chip>
          </q-item-section>
        </template>
        <q-list>
          <q-item>
            <q-item-section>Campaign 1</q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
    </q-card>
    <q-select
      label="🏷 Tags"
      outlined
      hint="Press enter to add tag"
      v-model="tags"
      use-input
      use-chips
      multiple
      hide-dropdown-icon
      input-debounce="0"
      @new-value="addTag"
    />
  </div>
</template>
<script>
import OopsError from "components/OopsError";
import AvatarImage from "components/AvatarImage";

import {
  onSnapshot,
  getFirestore,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
const db = getFirestore();

export default {
  components: { AvatarImage, OopsError },
  data() {
    return {
      unsubscribe: null,
      memberDataLoaded: false,
      memberData: null,
      memberError: null,
      eventsExpanded: false,
      campaignsExpanded: false,
      tags: null,
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
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        // console.log(this.$route.params.eventPath);
        if (this.$route.params.userID) {
          // console.log('event load')
          this.fetchMemberFromDatabase();
        }
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
  },

  unmounted() {
    this.unsubscribe();
  },
  methods: {
    addTag(val, done) {
      // specific logic to eventually call done(...) -- or not
      done(val, "add-unique");

      // done callback has two optional parameters:
      //  - the value to be added
      //  - the behavior (same values of new-value-mode prop,
      //    and when it is specified it overrides that prop –
      //    if it is used); default behavior (if not using
      //    new-value-mode) is to add the value even if it would
      //    be a duplicate
    },
    fetchMemberFromDatabase() {
      const q = doc(this.memberProfilesRef, this.$route.params.userID);

      this.unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (querySnapshot.exists()) {
          console.log("test");
          this.memberData = querySnapshot.data();
          this.memberDataLoaded = true;
        } else {
          this.memberError = "Member not found";
        }
      });
    },
    async saveNotes() {
      const ref = doc(this.memberProfilesRef, this.$route.params.userID);
      await updateDoc(ref, {
        notes: this.memberData.notes,
      }).then(() => {
        this.mixin_savedNotification("Notes saved");
      });
    },
  },
};
</script>
