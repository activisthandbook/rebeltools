<template>
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
          <span class="ellipsis q-mr-xs">
            {{ member.firstName }}
            {{ member.lastName }}
          </span>
          <q-icon
            name="mdi-badge-account"
            size="xs"
            color="grey-9"
            dark
            class="q-my-none"
          >
            <q-tooltip :offset="[0, 6]" class="text-body2 bg-grey-9 shadow-7">{{
              member.role.name
            }}</q-tooltip>
          </q-icon>
          <q-chip
            icon="mdi-lightning-bolt-circle"
            size="sm"
            color="grey-9"
            dark
            class="q-my-none"
            label="1"
          >
            <q-tooltip :offset="[0, 6]" class="text-body2 bg-grey-9 shadow-7"
              >Engagement score ⚡️</q-tooltip
            >
          </q-chip>
          <q-chip
            v-if="member.eventSignups"
            icon="mdi-cursor-default-click"
            size="sm"
            outline
            color="grey-9"
            class="q-my-none"
            :label="member.eventSignups.length"
          >
            <q-tooltip :offset="[0, 6]" class="text-body2 bg-grey-9 shadow-7"
              >Online activity 🌐</q-tooltip
            >
          </q-chip>
          <!-- <q-chip icon="mdi-chat" size="sm" color="grey-9" dark class="q-my-none">Send welcome message!</q-chip> -->
          <!-- <q-chip icon="mdi-heart" label="Help them integrate!" color="secondary" dark size="sm" class="q-my-none"/> -->
        </q-item-label>
        <q-item-label caption class="q-gutter-sm">
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
export default {
  components: {
    AvatarImage,
  },
  props: ["members"],
};
</script>
