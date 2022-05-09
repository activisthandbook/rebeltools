<template>
  <q-card-section v-if="!loaded">Loading...</q-card-section>
  <q-card-section v-else-if="error">
    <oops-error title="Something went wrong loading rebels." :error="error" />
  </q-card-section>
  <q-card-section v-else-if="!members[0]"> No rebels found. </q-card-section>
  <q-list separator>
    <q-item
      v-for="(member, index) in members"
      :key="index"
      class="q-py-md"
      clickable
      :to="{ name: 'Dashboard Rebel', params: { userID: member.id } }"
    >
      <q-item-section avatar>
        <!-- <q-avatar color="grey-4" text-color="white" icon="mdi-account" /> -->
        <avatar-image :userID="member.id" />
      </q-item-section>
      <q-item-section>
        <q-item-label class="row no-wrap items-center">
          <span class="ellipsis q-mr-xs" v-if="member.firstName">
            {{ member.firstName }}
            {{ member.lastName }}
          </span>
          <span class="ellipsis q-mr-xs" v-else>
            {{ member.emailAddress }}
          </span>
          <q-icon
            name="mdi-badge-account"
            size="xs"
            color="grey-9"
            dark
            class="q-my-none"
            v-if="member.role"
          >
            <q-tooltip :offset="[0, 6]" class="text-body2 bg-grey-9 shadow-7">{{
              member.role.name
            }}</q-tooltip>
          </q-icon>
          <q-chip
            v-if="member.engagementScore"
            icon="mdi-heart"
            size="sm"
            color="grey-9"
            dark
            class="q-my-none"
            :label="member.engagementScore"
          >
            <q-tooltip :offset="[0, 6]" class="text-body2 bg-grey-9 shadow-7">
              Engagement score ❤️</q-tooltip
            >
          </q-chip>
          <q-chip
            v-if="member.countAllSignups"
            icon="mdi-cursor-default-click"
            size="sm"
            outline
            color="grey-9"
            class="q-my-none"
            :label="member.countAllSignups"
          >
            <q-tooltip :offset="[0, 6]" class="text-body2 bg-grey-9 shadow-7"
              >Online activity 🌐</q-tooltip
            >
          </q-chip>
          <!-- <q-chip icon="mdi-chat" size="sm" color="grey-9" dark class="q-my-none">Send welcome message!</q-chip> -->
          <!-- <q-chip icon="mdi-heart" label="Help them integrate!" color="secondary" dark size="sm" class="q-my-none"/> -->
        </q-item-label>
        <q-item-label caption class="q-gutter-sm" v-if="member.firstName">
          <span style="white-space: nowrap"
            ><q-icon name="mdi-email" /> {{ member.emailAddress }}</span
          >
          <span style="white-space: nowrap"
            ><q-icon name="mdi-phone" /> {{ member.phoneNumber }}</span
          >
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script>
import AvatarImage from "components/AvatarImage";
import OopsError from "components/OopsError";
export default {
  components: {
    AvatarImage,
    OopsError,
  },
  props: ["members", "loaded", "error"],
};
</script>
