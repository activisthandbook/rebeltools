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

  <smart-action :title="primaryAction.title" :description="primaryAction.description" actionlabel="Join movement" :actionpeople="24"/>

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
  <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="admins.includes(userUID)">
    <q-btn icon="mdi-file-document-edit" color="primary" fab :to="{name: 'Dashboard Page'}"/>
  </q-page-sticky>
</template>

<script>
import SmartAction from 'src/components/SmartAction.vue'
import EventList from '../../components/EventList.vue'
import VacanciesList from '../../components/VacanciesList.vue'

export default {
  name: 'PageIndex',
  components: { EventList, VacanciesList, SmartAction },
  computed: {
    headline: {
      get () { return this.$store.state.currentMovement.data.headline }
    },
    description: {
      get () { return this.$store.state.currentMovement.data.description }
    },
    primaryAction: {
      get () { return this.$store.state.currentMovement.data.primaryAction }
    },
    admins: {
      get () { return this.$store.state.currentMovement.data.admins }
    },
    userUID: {
      get () { return this.$store.state.auth.user.uid }
    }
  }
}
</script>
