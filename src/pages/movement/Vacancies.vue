<!--
PAGE: MOVEMENT / VACANCIES 🤝

Path: /:movementID/partners
 -->
<template>
  <h1>Vacant roles</h1>
  <div>
    <!-- <q-select filled v-model="selectedTeam" map-options clearable option-value="id" option-label="name" label="Teams" :options="loremIpsum.teams"/> -->
    <vacancies-list class="q-mt-sm" :filter="{team: selectedTeam}"/>
  </div>
</template>
<script>
import VacanciesList from '../../components/VacanciesList.vue'

export default {
  components: { VacanciesList },
  data () {
    return {
      selectedTeam: null,
      loremIpsum: {
        teams: [
          {
            name: 'Core circle',
            id: 1
          },
          {
            name: 'Communications circle',
            id: 2
          },
          {
            name: 'Finance circle',
            id: 3
          }
        ]
      }
    }
  }
}
</script>
