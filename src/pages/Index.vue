<template>
  <q-page padding class="q-gutter-md">
    <q-card class="column justify-end bg-secondary text-white">
      <q-img
          src="https://placeimg.com/500/300/people"
          :ratio="2/1"
        />
      <q-card-section>

        <div class="text-h4 full-width">A call to action</div>
        <div class="text-body1 full-width">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente accusantium, sit, veritatis nemo eaque praesentium ratione omnis unde corporis rerum fugit tenetur assumenda officiis molestias corrupti. Expedita doloremque laborum a.</div>
      </q-card-section>
    </q-card>
    <q-card flat bordered>
      <q-card-section class="row justify-between">
        <div class="text-h5">Events</div>
        <q-btn flat label="View all"/>
      </q-card-section>
        <q-list separator>
          <q-item clickable v-ripple>

            <q-item-section>
              <q-item-label overline>2 August 19:00</q-item-label>
              <q-item-label>Just an event</q-item-label>
            </q-item-section>

            <q-item-section side>
              <div class="row items-center q-gutter-sm">
                <q-badge color="black">10 joining</q-badge>
                <q-btn icon="mdi-account-plus" round flat color="secondary"/>
              </div>

            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>

            <q-item-section>
              <q-item-label overline>6 August 19:00</q-item-label>
              <q-item-label>Another event</q-item-label>
            </q-item-section>

            <q-item-section side>
              <div class="row items-center q-gutter-sm">
                <q-badge color="black">7 joining</q-badge>
                <q-btn icon="mdi-account-plus" round flat color="secondary"/>
              </div>

            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>

            <q-item-section>
              <q-item-label overline>17 August 19:00</q-item-label>
              <q-item-label>The last event</q-item-label>
            </q-item-section>

            <q-item-section side>
              <div class="row items-center q-gutter-sm">
                <q-badge color="black">12 joining</q-badge>
                <q-btn icon="mdi-account-plus" round flat color="secondary"/>
              </div>

            </q-item-section>
          </q-item>

        </q-list>

    </q-card>
  </q-page>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageIndex'
})
</script>
