<template>
  <q-list separator>
    <q-item
      class="full-width q-pa-md"
      v-for="event in events"
      :key="event.id"
      clickable
      :to="{ name: 'Dashboard Event', params: { eventID: event.id } }"
    >
      <q-item-section class="col-3 overflow-hidden row items-center q-pr-xs">
        <q-img
          :ratio="16 / 9"
          :src="
            'https://source.unsplash.com/random/160x90?sig=' +
            Math.floor(Math.random() * 1000)
          "
          class="rounded-borders bg-grey-2 cursor-pointer"
          spinner-color="transparent"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label caption>
          {{ mixin_humanDate(event.startDate) }} |
          {{ event.address }}
        </q-item-label>
        <q-item-label class="text-bold q-ma-none">
          <span class="cursor-pointer q-mr-xs">{{ event.title }}</span>
          <!-- <q-chip
                icon="mdi-cursor-default-click"
                :label="event.signupCount"
                size="sm"
                class="q-ma-none text-bold"
                color="secondary"
                dark
              /> -->
        </q-item-label>
        <q-item-label class="q-gutter-xs">
          <q-chip
            icon="mdi-cursor-default-click"
            :label="event.signupCount + ' signups'"
            size="sm"
            class="q-ma-none text-bold"
            color="secondary"
            dark
          />
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script>
export default {
  props: ["events"],
};
</script>
