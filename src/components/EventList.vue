<template>
  <div class="q-gutter-y-sm">
    <q-card flat bordered v-ripple v-for="(event, index) in loremIpsum.events" :key="index" class="cursor-pointer">
      <!-- <q-card-section> -->

        <q-item clickable class="full-width q-pa-sm">
          <div class="col-4 overflow-hidden row items-center q-pr-md">
          <q-img :ratio="16/9" :src="event.image" class="rounded-borders" spinner-color="transparent"/>
        </div>
          <q-item-section>
            <q-item-label caption>{{ event.date }}, {{ event.location }}</q-item-label>
            <div class="text-bold q-ma-none">
              {{ event.title }}
            </div>
            <div class="text-caption">
              <q-chip :label="event.attending" :icon="event.going ? 'mdi-check-circle' : 'mdi-check'" :color="event.going ? 'primary': 'black'" text-color="white" size="sm"/>
            </div>
          </q-item-section>

        </q-item>

      <!-- </q-card-section> -->
    </q-card>
  </div>
</template>
<script>
export default {
  name: 'event-list',
  data () {
    return {
      loremIpsum: {
        events: [
          {
            image: 'https://source.unsplash.com/random?protestors',
            title: 'Meetup: Some topic',
            description: 'Movement mobiliser',
            date: '14 Feb 14:00',
            location: 'Online',
            attending: '16 people',
            going: false
          },
          {
            image: 'https://source.unsplash.com/random?people',
            title: 'Meetup: Some topic',
            description: 'Movement mobiliser',
            date: '14 Feb 14:00',
            location: 'Online',
            attending: 'You + 14 others',
            going: true
          },
          {
            image: 'https://source.unsplash.com/random?protest',
            title: 'Meetup: Some topic',
            description: 'Movement mobiliser',
            date: '14 Feb 14:00',
            location: 'Online',
            attending: '13 people',
            going: false
          }
        ]
      }
    }
  }
}
</script>
