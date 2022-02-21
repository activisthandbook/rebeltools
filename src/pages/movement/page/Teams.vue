<!--
PAGE: MOVEMENT / TEAMS 💪

Path: /:movementID/teams
 -->
<template>
  <h1>Our teams</h1>
  <teams-list/>
</template>
<script>
import TeamsList from 'components/TeamsList.vue'

export default {
  components: { TeamsList }
}
</script>
