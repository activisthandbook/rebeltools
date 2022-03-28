<template>
  <q-header bordered class="bg-secondary text-white">
    <q-toolbar>
      <q-btn flat round dense icon="mdi-close" :to="{name: 'Dashboard Calendar'}" />
      <q-toolbar-title>Event dashboard</q-toolbar-title>
      <q-btn label="Edit" icon="mdi-pencil" no-caps color="white" text-color="black"/>
    </q-toolbar>
  </q-header>
  <div class="q-gutter-y-md">
    <q-card>
      <q-card-section>
        <q-item class="full-width q-pa-none">
        <q-item-section class="col-4  overflow-hidden row items-center q-pr-sm">
          <q-img :ratio="16/9" :src="'https://source.unsplash.com/random/160x90?sig=' + Math.floor(Math.random() * 1000)" class="rounded-borders bg-grey-2 cursor-pointer" spinner-color="transparent"/>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-h2 q-ma-none">
            Event title
          </q-item-label>
          <q-item-label>
            <!-- <q-chip label="Date" icon="mdi-calendar"/>
            <q-chip label="Location" icon="mdi-pin"/> -->
            Date, location
          </q-item-label>
          <q-item-label class="q-gutter-xs">
            <q-btn label="View" no-caps color="secondary" icon="mdi-eye" size="12px"/>
          </q-item-label>
        </q-item-section>
      </q-item>
      </q-card-section>

    </q-card>
  </div>
</template>
