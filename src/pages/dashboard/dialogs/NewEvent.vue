<template>
  <q-header bordered class="bg-secondary text-white">
    <q-toolbar>
      <q-btn flat round dense icon="mdi-close" :to="{name: 'Dashboard Calendar'}" />
      <q-toolbar-title>New event</q-toolbar-title>
      <q-btn label="Create" no-caps color="white" text-color="black"/>
    </q-toolbar>
  </q-header>

  <q-card>
    <q-card-section>
      <div class="q-gutter-y-sm">
        <div class="text-bold">Event details</div>
        <q-input label="📢 Event title" outlined color="secondary"/>
        <q-input label="📆 Date" outlined color="secondary"/>
        <q-input label="📝 Event description" outlined type="textarea" color="secondary"/>
        <q-item clickable class="q-pa-none bg-grey-3 rounded-borders" v-ripple>
          <q-img :ratio="16/9">

          <q-chip class="q-ma-lg" icon="mdi-image" color="white" text-color="black">Open image editor</q-chip>

          </q-img>
        </q-item>
      </div>
    </q-card-section>
  </q-card>

</template>
<script>
export default {
  props: ['open']
}
</script>
