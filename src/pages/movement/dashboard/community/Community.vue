<template>
  <q-header bordered class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title>Community</q-toolbar-title>
      <q-btn round flat icon="mdi-magnify" disable />
    </q-toolbar>
  </q-header>

  <q-page-container>
    <q-page padding>
      <q-tabs
        v-model="tab"
        no-caps
        class="bg-grey-3 rounded-borders"
        active-color="secondary"
      >
        <q-tab name="rebels" icon="mdi-account-group" label="Rebels" />
        <q-tab
          name="outreach"
          icon="mdi-account-multiple-plus"
          label="Outreach"
        />
        <q-tab name="roles" icon="mdi-badge-account" label="Roles" />
        <q-tab
          name="teams"
          icon="mdi-account-supervisor-circle"
          label="Teams"
        />
      </q-tabs>

      <q-card class="q-mt-md">
        <q-tab-panels v-model="tab">
          <q-tab-panel name="rebels" class="q-pa-none">
            <rebels />
          </q-tab-panel>
          <q-tab-panel name="outreach" class="q-pa-none">
            <q-card-section>Outreach is not available yet.</q-card-section>
          </q-tab-panel>
          <q-tab-panel name="roles" class="q-pa-none">
            <q-card-section>Roles are not available yet.</q-card-section>
          </q-tab-panel>
          <q-tab-panel name="teams" class="q-pa-none">
            <q-card-section>Teams are not available yet.</q-card-section>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-page>
  </q-page-container>

  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn icon="mdi-plus" color="primary" fab disable />
  </q-page-sticky>
</template>
<script>
import Rebels from "pages/movement/dashboard/community/Rebels";

export default {
  components: { Rebels },
  data() {
    return {
      tab: "rebels",
    };
  },
};
</script>
