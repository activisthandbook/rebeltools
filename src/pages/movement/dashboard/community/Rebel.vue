<template>
  <q-header bordered class="bg-white text-black">
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

  <q-page-container>
    <q-page padding>
      <transition-group name="slide-fade">
        <!-- <div v-if="!member.dataLoaded">Loading...</div> -->
        <oops-error
          title="Member not found."
          description="This member was deleted."
          v-if="member.error"
        />
        <div class="q-gutter-y-md" v-else-if="member.dataLoaded">
          <q-card>
            <q-list>
              <q-item class="q-mt-sm">
                <q-item-section avatar>
                  <avatar-image :userID="$route.params.userID" :size="64" />
                </q-item-section>
                <q-item-section>
                  <q-item-label
                    class="row no-wrap items-center justify-between"
                  >
                    <h2 class="q-py-xs" style="font-size: 24px">
                      <span v-if="member.data.firstName"
                        >{{ member.data.firstName }}
                        {{ member.data.lastName }}</span
                      >
                      <span v-else>{{ member.data.emailAddress }}</span>
                    </h2>
                    <!-- <q-btn no-caps color="secondary" outline size="14px" padding="4px 4px" rounded style="flex-shrink:0">
                <span class="q-ml-sm q-mr-xs">Boost</span>
                <q-chip icon="mdi-lightning-bolt-circle" color="secondary" text-color="white" class="q-my-none q-mx-none cursor-pointer" label="1" size="12px"/>
                <q-tooltip>Add points to engagement score</q-tooltip>
              </q-btn> -->
                  </q-item-label>
                </q-item-section>
                <q-item-section side class="text-right">
                  <div :class="{ animation: allowedToIncreaseEngagement }">
                    <q-btn
                      no-caps
                      color="primary"
                      rounded
                      :class="{
                        'engagement-button q-ma-none': true,
                        'shadow-12': allowedToIncreaseEngagement,
                        'cursor-not-allowed': !allowedToIncreaseEngagement,
                      }"
                      :outline="!allowedToIncreaseEngagement"
                      unelevated
                      :icon="icon"
                      @click="increaseEngagementScore()"
                      :label="member.data.engagementScore"
                    >
                      <q-tooltip
                        v-if="allowedToIncreaseEngagement"
                        class="bg-white text-black shadow-12"
                        :offset="[0, 12]"
                        style="font-size: 14px"
                      >
                        Engagement score ❤️
                      </q-tooltip>
                    </q-btn>
                  </div>
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
                v-model="member.data.notes"
                @focus="member.dataOld.notes = member.data.notes"
                @blur="saveNotes($event)"
              />
              <div class="q-gutter-sm q-mt-sm">
                <q-btn
                  v-if="member.data.phoneNumber"
                  icon="mdi-phone"
                  label="Call"
                  no-caps
                  color="secondary"
                  :href="'tel:' + member.data.phoneNumber"
                />
                <q-btn
                  icon="mdi-chat"
                  label="Chat"
                  no-caps
                  color="secondary"
                  v-if="member.data.phoneNumber"
                >
                  <q-menu
                    transition-show="jump-down"
                    transition-hide="fade"
                    :offset="[0, 4]"
                  >
                    <q-list>
                      <q-item
                        clickable
                        v-close-popup
                        @click="
                          mixin_openURL(
                            'sms:' +
                              member.data.phoneNumber +
                              '&body=Hi%20' +
                              member.data.firstName
                          )
                        "
                      >
                        <q-item-section avatar>
                          <q-avatar icon="mdi-message-processing-outline" />
                        </q-item-section>
                        <q-item-section>SMS</q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        @click="
                          mixin_openURL(
                            'https://api.whatsapp.com/send?phone=' +
                              member.data.phoneNumber.replace(/\D/g, '') +
                              '&text=Hi%20' +
                              member.data.firstName
                          )
                        "
                      >
                        <q-item-section avatar>
                          <q-avatar icon="mdi-whatsapp" />
                        </q-item-section>
                        <q-item-section>WhatsApp</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
                <q-btn
                  label="Email"
                  icon="mdi-email"
                  no-caps
                  color="secondary"
                  :href="
                    'mailto:' +
                    member.data.firstName +
                    ' <' +
                    member.data.emailAddress +
                    '>?body=Hi%20' +
                    member.data.firstName +
                    ',%0D%0A%0D%0A' +
                    'Best,%0D%0A' +
                    $store.state.currentUser.data.firstName +
                    '%0D%0A%0D%0A' +
                    $store.state.currentMovement.data.name +
                    '%0D%0A%0D%0A' +
                    'https://rebel.tools/' +
                    $store.state.currentMovement.data.path
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
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-avatar icon="mdi-badge-account" />
                </q-item-section>
                <q-item-section>
                  <q-item-label
                    class="row no-wrap items-center justify-between"
                  >
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
              <q-item
                clickable
                @click="mixin_copyText(member.data.emailAddress)"
                v-ripple
              >
                <q-item-section avatar>
                  <q-avatar icon="mdi-email" />
                </q-item-section>
                <q-item-section class="ellipsis">
                  {{ member.data.emailAddress }}
                </q-item-section>
                <q-item-section side>
                  <q-btn icon="mdi-content-copy" round flat dense />
                </q-item-section>
              </q-item>
              <q-item
                v-if="member.data.phoneNumber"
                clickable
                @click="mixin_copyText(member.data.phoneNumber)"
                v-ripple
              >
                <q-item-section avatar>
                  <q-avatar icon="mdi-phone" />
                </q-item-section>
                <q-item-section class="ellipsis">
                  ‭{{ member.data.phoneNumber }}
                </q-item-section>
                <q-item-section side>
                  <q-btn icon="mdi-content-copy" round flat dense />
                </q-item-section>
              </q-item>
              <q-item v-if="member.data.location">
                <q-item-section avatar>
                  <q-avatar icon="mdi-map" />
                </q-item-section>
                <q-item-section class="ellipsis text-capitalize">
                  {{ member.data.location.city }},
                  {{ member.data.location.country }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
          <q-card class="q-py-sm">
            <q-item>
              <q-item-section class="text-bold"> Activity </q-item-section>
              <!-- <q-item-section side>
                <q-chip
                  v-if="activeInLast14Days"
                  color="secondary"
                  text-color="white"
                  icon="mdi-cursor-default-click"
                  >Recently active</q-chip
                >
                <q-chip
                  v-else-if="inactiveLast30Days"
                  color="secondary"
                  text-color="white"
                  icon="mdi-sleep"
                  >Inactive</q-chip
                >
              </q-item-section> -->
            </q-item>
            <q-expansion-item
              v-model="eventsExpanded"
              expand-separator
              v-if="member.data.countEventSignups"
            >
              <template v-slot:header>
                <q-item-section avatar>
                  <q-avatar icon="mdi-calendar" />
                </q-item-section>

                <q-item-section> Events </q-item-section>

                <q-item-section side>
                  <q-chip
                    v-if="member.data.countEventSignups"
                    icon="mdi-cursor-default-click"
                    class="q-my-none q-mx-none text-bold"
                    :label="member.data.countEventSignups"
                    size="12px"
                    color="secondary"
                    text-color="white"
                  >
                    <q-tooltip>Online activity</q-tooltip>
                  </q-chip>
                </q-item-section>
              </template>
              <event-list :events="events" />
              <q-list>
                <q-item>
                  <q-item-section
                    >‭{{ member.data.eventSignups }}</q-item-section
                  >
                </q-item>
              </q-list>
            </q-expansion-item>
            <q-expansion-item
              v-model="campaignsExpanded"
              expand-separator
              v-if="member.data.countCampaignSignups"
            >
              <template v-slot:header>
                <q-item-section avatar>
                  <q-avatar icon="mdi-bullhorn" />
                </q-item-section>

                <q-item-section> Campaigns </q-item-section>

                <q-item-section side>
                  <q-chip
                    v-if="member.data.countCampaignSignups"
                    icon="mdi-cursor-default-click"
                    class="q-my-none q-mx-none"
                    :label="member.data.countCampaignSignups"
                    size="12px"
                    color="secondary"
                    text-color="white"
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
            <q-list>
              <q-item v-if="member.data.countAcceptedInvites">
                <q-item-section avatar>
                  <q-avatar icon="mdi-share" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <span>Accepted invites</span>
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label>
                    <q-chip square>{{
                      member.data.countAcceptedInvites
                    }}</q-chip>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-avatar icon="mdi-cursor-default-click" />
                </q-item-section>
                <q-item-section class="ellipsis">
                  <q-item-label v-if="member.data.timestampFirstAction">
                    Last action
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  {{ mixin_humanDate(member.data.timestampLastAction) }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-avatar icon="mdi-history" />
                </q-item-section>
                <q-item-section class="ellipsis">
                  <q-item-label v-if="member.data.timestampFirstAction">
                    Joining date
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  {{ mixin_humanDate(member.data.timestampFirstAction) }}
                </q-item-section>
              </q-item>
            </q-list>
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
      </transition-group>
    </q-page>
  </q-page-container>
</template>
<script>
import OopsError from "components/OopsError";
import EventList from "components/lists/EventList";
import AvatarImage from "components/AvatarImage";
import party from "party-js";

import {
  onSnapshot,
  getFirestore,
  collection,
  doc,
  updateDoc,
  increment,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
const db = getFirestore();

export default {
  components: { AvatarImage, OopsError, EventList },
  data() {
    return {
      unsubscribe: null,
      member: {
        dataLoaded: false,
        data: {},
        dataOld: {}, // Used for tracking if user made changes (for saving to Firestore)
        error: null,
      },
      events: {
        dataLoaded: false,
        data: {},
        error: null,
      },
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
    allowedToIncreaseEngagement: function () {
      // Check if admin is allowed to increase engagement (we say it's only once a day, but in reality its once every 12 hours)
      const jsYesterday = new Date(Date.now() - 1000 * 60 * 60 * 12);
      const firebaseYesterday = Timestamp.fromDate(jsYesterday);
      if (this.member.data.engagementScoreTimestamp > firebaseYesterday) {
        return false;
      } else {
        return true;
      }
    },
    activeInLast14Days: function () {
      // Check if user has been active online online in the last 14 days
      const jsLast14Days = new Date(Date.now() - 1000 * 60 * 60 * 24 * 14);
      const firebaseLast14Days = Timestamp.fromDate(jsLast14Days);
      if (this.member.data.timestampLastAction > firebaseLast14Days) {
        return true;
      } else {
        return false;
      }
    },
    inactiveLast30Days: function () {
      // Check if user has been active online online in the last 14 days
      const jsLastMonth = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30);
      const firebaseLastMonth = Timestamp.fromDate(jsLastMonth);
      if (this.member.data.timestampLastAction < firebaseLastMonth) {
        return true;
      } else {
        return false;
      }
    },
    icon: function () {
      if (this.allowedToIncreaseEngagement) {
        return "mdi-heart";
      } else {
        return "mdi-check";
      }
    },
  },
  watch: {
    "$route.params.userID": {
      handler: function () {
        if (this.$route.params.userID) {
          this.fetchMemberFromDatabase();
        }
      },
      immediate: true,
    },
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
    async fetchMemberFromDatabase() {
      this.member.dataLoaded = false;
      const q = doc(this.memberProfilesRef, this.$route.params.userID);

      this.unsubscribe = await onSnapshot(q, (querySnapshot) => {
        if (querySnapshot.exists()) {
          this.member.data = querySnapshot.data();
          this.member.dataLoaded = true;
        } else {
          this.member.dataLoaded = true;
          this.member.error = "Member not found";
        }
      });
    },
    async increaseEngagementScore() {
      if (this.allowedToIncreaseEngagement) {
        const ref = doc(this.memberProfilesRef, this.$route.params.userID);
        party.confetti(document.querySelector(".engagement-button"), {
          color: party.Color.fromHex(
            this.$store.state.currentMovement.data.primaryColor
          ),
        });
        await updateDoc(ref, {
          engagementScore: increment(1),
          engagementScoreTimestamp: serverTimestamp(),
        });
      } else {
        this.$q.dialog({
          title: "Engagement score ❤️",
          message:
            "You can only increase someone's engagement score once per day. Come back tomorrow!",
        });
      }
    },
    async saveNotes() {
      if (this.member.data.notes !== this.member.dataOld.notes) {
        const ref = doc(this.memberProfilesRef, this.$route.params.userID);
        await updateDoc(ref, {
          notes: this.member.data.notes,
        }).then(() => {
          this.mixin_savedNotification("Notes saved");
        });
      }
    },
  },
};
</script>
<style scoped>
.engagement-button {
  transition: 0.2s ease-in-out;
}
.engagement-button:hover {
  transform: scale(1.1);
}
.engagement-button:active {
  transform: scale(0.9);
}
.animation {
  animation: heartbeat 5s infinite;
}
@keyframes heartbeat {
  0% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.05) rotate(1deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}
</style>
