<!--
PAGE: MOVEMENT / HOME 🏡
This is the main landing page of movements

Path: /:movementID/
 -->
<template>
  <div class="q-gutter-sm">
    <h1>{{ headline }}</h1>
    <p>{{ description }}</p>
  </div>

  <!-- <q-card class="bg-primary q-my-lg" dark>
    <q-card-section class="q-gutter-sm column">
      <h2>{{ primaryAction.title }}</h2>
      <div v-if="primaryAction.description">{{ primaryAction.description }}</div>
      <q-input label="Email" outlined bg-color="white">
        <template v-slot:append>
          <q-btn icon="mdi-arrow-right" color="primary" round>
            <q-tooltip>Sign up</q-tooltip>
          </q-btn>
        </template>
      </q-input>
    </q-card-section>
  </q-card> -->

  <div class="q-gutter-y-sm">
    <h2>Upcoming events</h2>
    <event-list/>
    <div class="row justify-end items-center q-gutter-x-sm">
      <div class="text-caption">3 more events</div>
      <q-btn icon-right="mdi-arrow-right-circle" label="See all" flat color="primary" no-caps :to="{name: 'Events'}" dense/>
    </div>
  </div>

  <div class="q-gutter-y-sm">
    <h2 class="q-mb-sm">Become involved</h2>
    <vacancies-list/>
    <div class="row justify-end items-center q-gutter-x-sm">
      <div class="text-caption">4 more vacancies</div>
      <q-btn icon-right="mdi-arrow-right-circle" label="See all" flat color="primary" no-caps :to="{name: 'Vacant roles'}" dense/>
    </div>
  </div>
</template>

<script>
import EventList from '../../components/EventList.vue'
import VacanciesList from '../../components/VacanciesList.vue'

export default {
  name: 'PageIndex',
  components: { EventList, VacanciesList },
  computed: {
    headline: {
      get () { return this.$store.state.currentMovement.data.headline }
    },
    description: {
      get () { return this.$store.state.currentMovement.data.description }
    },
    primaryAction: {
      get () { return this.$store.state.currentMovement.data.primaryAction }
    }
  }
}
</script>
