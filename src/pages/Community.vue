<template>
  <div class="q-gutter-y-md">
    <h1>Community</h1>
    <div>
      <q-card>
        <q-list bordered>
          <q-expansion-item
            expand-separator
            bordered
            icon="mdi-lightning-bolt"
            label="Vacant roles"
          >
            <div class="q-pa-md">
              <vacancies-list/>
            </div>
          </q-expansion-item>
          <q-expansion-item
            expand-separator
            bordered
            icon="mdi-account-group"
            label="Our teams"
          >
            <div class="q-pa-md">
              List of teams
            </div>
          </q-expansion-item>
          <q-expansion-item
            expand-separator
            bordered
            icon="mdi-heart"
            label="Partners"
          >
            <div class="q-pa-md">
              Partners
            </div>
          </q-expansion-item>
        </q-list>
      </q-card>
    </div>
    <div>
      <h2 class="q-mb-sm">People</h2>
      <people-list/>
    </div>
  </div>
</template>
<script>
import PeopleList from '../components/PeopleList.vue'
import VacanciesList from '../components/VacanciesList.vue'

export default {
  components: { PeopleList, VacanciesList }
}
</script>
