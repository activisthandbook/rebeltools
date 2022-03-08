<template>
  <q-header bordered class="bg-secondary text-white">
    <q-toolbar>
      <q-btn flat round dense icon="mdi-close" :to="{name: 'Dashboard Community'}" />
      <q-toolbar-title>Rebel profile</q-toolbar-title>
    </q-toolbar>
  </q-header>
  <div class="q-gutter-y-md">
    <q-card>
      <q-list>
        <q-item class="q-mt-sm">
          <q-item-section avatar>
            <q-avatar color="grey-4" text-color="white" icon="mdi-account"/>
          </q-item-section>
          <q-item-section>
            <q-item-label class="row no-wrap items-center justify-between">
              <h2 class="ellipsis q-pa-xs">
                Joppe Hoekstra
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
        <q-input label="📝 Notes" outlined color="secondary" type="textarea" autogrow input-style="min-height: 2em"/>
        <div class="q-gutter-sm q-mt-sm">
          <q-btn icon="mdi-phone" label="Call" no-caps color="secondary"/>
          <q-btn icon="mdi-chat" label="Chat" no-caps color="secondary"/>
          <q-btn label="Send email" icon="mdi-email" no-caps color="secondary"/>
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
            <q-btn no-caps color="secondary" padding="5px 5px" rounded style="flex-shrink:0" class="q-ma-none" icon="mdi-plus">
              <span class="q-ml-xs q-mr-xs" >Add engagement</span>
              <q-chip icon="mdi-lightning-bolt-circle" color="white" text-color="secondary" class="q-my-none q-mx-none cursor-pointer" size="12px" label="8">
                <!-- <div class="q-pr-xs">8<span style="font-size:8px;position:absolute;margin-top:-3px;">+1</span></div> -->
              </q-chip>
              <q-tooltip :offset="[0, 8]" class="text-body2 bg-white text-black shadow-7">Add points to engagement score! ⚡️</q-tooltip>
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
              <div class="q-gutter-sm">
                <q-btn icon="mdi-pencil" label="Edit" no-caps flat color="secondary" size="14px" padding="4px 8px"/>
              </div>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon name="mdi-email" />
          </q-item-section>
          <q-item-section class="ellipsis">joppehoekstra@gmail.com</q-item-section>
          <q-item-section side>
            <q-btn icon="mdi-content-copy" round flat dense/>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon name="mdi-phone" />
          </q-item-section>
          <q-item-section class="ellipsis">‭+31 6 57 70 48 83‬</q-item-section>
          <q-item-section side>
            <q-btn icon="mdi-content-copy" round flat dense/>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon name="mdi-map" />
          </q-item-section>
          <q-item-section class="ellipsis">‭Rottedam‬</q-item-section>
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
      <q-expansion-item v-model="eventsExpanded">
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar icon="mdi-calendar" />
          </q-item-section>

          <q-item-section>
            Events
          </q-item-section>

          <q-item-section side>
            <q-chip icon="mdi-cursor-default-click" class="q-my-none q-mx-none" :label="2" size="12px">
              <q-tooltip>Online activity</q-tooltip>
            </q-chip>
          </q-item-section>
        </template>
        <q-list>
          <q-item>
            <q-item-section>Event 1</q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
      <q-expansion-item v-model="eventsExpanded">
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar icon="mdi-bullhorn" />
          </q-item-section>

          <q-item-section>
            Campaigns
          </q-item-section>

          <q-item-section side>
            <q-chip icon="mdi-cursor-default-click" class="q-my-none q-mx-none" :label="1" size="12px">
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
  </div>
</template>
<script>
export default {
  data () {
    return {
      eventsExpanded: false
    }
  }
}
</script>
