<template>
  <h2>
    Invite friends<span v-if="$store.state.currentUser.data.firstName"
      >, {{ $store.state.currentUser.data.firstName }}</span
    >
  </h2>
  <p>
    Let's grow {{ $store.state.currentMovement.data.name }} together. Share your
    personal invite link:
  </p>
  <q-input
    label="🔗 Share invite link"
    v-model="url"
    @focus="(input) => input.target.select()"
    ref="url"
    dark
    color="white"
    filled
  >
    <template v-slot:append>
      <q-btn
        icon="mdi-content-copy"
        label="Copy link"
        no-caps
        @click="copy()"
        color="white"
        text-color="black"
      />
    </template>
  </q-input>
  <!-- <q-linear-progress
    size="30px"
    :value="0.75"
    stripe
    track-color="white"
    rounded
    class="q-mt-md"
  >
    <div class="absolute-full flex flex-center">
      <q-chip color="white" text-color="black" square dense>
        <span>75%</span>
        <span><strong class="q-mr-xs">8</strong> people joining</span>
      </q-chip>
    </div>
  </q-linear-progress> -->
  <q-chip color="primary" text-color="white" square class="q-ml-none">
    <span
      ><strong>4</strong> <span v-if="actionType === 'movement'">members</span
      ><span v-if="actionType === 'event'">participants</span></span
    >
  </q-chip>
  <q-chip color="white" text-color="black" square>
    <q-spinner-rings
      color="primary"
      size="2em"
      style="margin-left: -12px; margin-right: -2px"
    />
    <span><strong>0</strong> accepted your invite</span>
  </q-chip>
  <!-- <div
    class="text-right"
    style="margin-top: -64px; position: relative; font-size: 60px; height: 64px"
  >
    <span style="margin-right: -16px"> 🎉 </span>
  </div> -->
  <div class="flex items-center text-body2">
    <span class="text-italic q-mr-sm" style="opacity: 0.8"
      >Want to invite many people?</span
    >
    <q-btn
      icon="mdi-account-multiple-plus"
      label="Create invite list"
      dense
      no-caps
      unelevated
      style="
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.9);
      "
      padding="2px 6px"
      size="12px"
    />
  </div>
</template>
<script>
import { getAnalytics, logEvent } from "firebase/analytics";
const analytics = getAnalytics();

export default {
  props: ["actionType"],
  computed: {
    url: {
      get: function () {
        return (
          window.location.href + "?invite=" + this.$store.state.auth.data.uid
        );
      },
      set: function (newValue) {},
    },
  },
  methods: {
    copy: function () {
      navigator.clipboard.writeText(this.url);
      this.$q.notify({
        message: "Link copied",
        icon: "mdi-check",
      });

      logEvent(analytics, "page_link_copied", {
        url: this.url,
        ref: "smartAction_sharePage",
      });
    },
  },
};
</script>
