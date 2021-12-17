<!--
COMPONENT: SMART ACTION 🙌
This component allows users to sign up for movements and events.
1. When signed in, it shows a signup button
2. When logged out, it shows an email signup field
 -->
<template>
  <q-card>
    <q-card-section class="q-gutter-sm column">
      <h2>{{ title }}</h2>
      <div v-if="description">{{ description }}</div>
      <q-input label="Email" outlined bg-color="white">
        <template v-slot:append>
          <q-btn icon="mdi-arrow-right" color="primary" round>
            <q-tooltip>Sign up</q-tooltip>
          </q-btn>
        </template>
      </q-input>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  props: ['title', 'description']
}
</script>
