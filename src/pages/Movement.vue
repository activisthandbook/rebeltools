<template>
  <div class="q-gutter-sm q-mb-lg">
    <h1>Activist Handbook is the Wikipedia for rebels.</h1>
    <p>Activist Handbook is a collaborative platform for rebels to exchange knowledge and experiences. We are inviting you to join our international project!</p>
  </div>

  <q-card class="bg-primary" dark>

    <q-card-section class="q-gutter-sm column">
      <h2>Join us</h2>
      <div>
        We'd love to get to know you. Sign up and join our international community of change-makers.
      </div>
      <q-input label="Email" outlined bg-color="white">
        <template v-slot:append>
          <q-btn icon="mdi-arrow-right" color="primary" round>
            <q-tooltip>Sign up</q-tooltip>
          </q-btn>
        </template>
      </q-input>
    </q-card-section>
  </q-card>

  <div class="q-gutter-y-sm q-my-lg">
    <h2>Upcoming events</h2>
    <event-list/>
    <div class="row justify-end items-center q-gutter-x-sm">
      <div class="text-caption">3 more events</div>
      <q-btn icon-right="mdi-arrow-right-circle" label="See all" flat color="primary" no-caps :to="{name: 'Events'}" dense/>
    </div>
  </div>

  <div class="q-gutter-y-sm q-my-lg">
    <h2 class="q-mb-sm">Become involved</h2>
    <vacancies-list/>
    <div class="row justify-end items-center q-gutter-x-sm">
      <div class="text-caption">4 more vacancies</div>
      <q-btn icon-right="mdi-arrow-right-circle" label="See all" flat color="primary" no-caps :to="{name: 'Community'}" dense/>
    </div>
  </div>
</template>

<script>
import EventList from '../components/EventList.vue'
import VacanciesList from '../components/VacanciesList.vue'

export default {
  name: 'PageIndex',
  components: { EventList, VacanciesList }
}
</script>
