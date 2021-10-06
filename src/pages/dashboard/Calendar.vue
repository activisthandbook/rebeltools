<template>
  <div>
    <h1>Calendar</h1>
    <event-list/>
  </div>

</template>
<script>
import EventList from '../../components/EventList.vue'

export default {
  components: { EventList }
}
</script>
