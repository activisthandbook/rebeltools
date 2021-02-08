<template>
  <q-layout view="hHh LpR fff">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="mdi-menu" @click="toggleLeftDrawer" class="xs"/>

        <q-toolbar-title>
          My Movement
        </q-toolbar-title>
        <q-btn icon="mdi-account-circle-outline" round flat/>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered :width="200" :breakpoint="599">
      <q-scroll-area class="fit">

          <q-list padding class="menu-list">
            <q-item>
            <q-img
            src="https://placeimg.com/150/150/nature"
            :ratio="1/1"
            class="rounded-borders"
          />
            </q-item>

            <q-item clickable v-ripple exact>
              <q-item-section avatar >
                <q-icon name="mdi-home" />
              </q-item-section>

              <q-item-section>
                Home
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple exact>
              <q-item-section avatar>
                <q-icon name="mdi-calendar" />
              </q-item-section>

              <q-item-section>
                Events
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="mdi-account-group" />
              </q-item-section>

              <q-item-section>
                Community
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="mdi-arrow-right-circle-outline" />
              </q-item-section>

              <q-item-section>
                Join
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
    </q-drawer>

    <q-page-container class="bg-grey-1 column items-center q-pb-xl q-mb-md">
      <router-view />
    </q-page-container>

    <q-page-sticky position="bottom-right" :offset="[16, 16]">
      <q-btn unelevated label="Dashboard" icon="mdi-speedometer-slow" color="white" text-color="primary" class="shadow-8 q-mr-sm"/>
      <q-btn unelevated label="Edit" icon="mdi-pencil" color="white" text-color="primary" class="shadow-8 q-mr-sm" @click="rightDrawerOpen = !rightDrawerOpen" />
      <q-btn unelevated round icon="mdi-plus" color="primary" class="shadow-8 q-mr-sm">
        <q-menu :offset="[0, 12]">
          <q-list style="min-width: 150px">
            <q-item-label header>Create new...</q-item-label>
            <q-item clickable v-close-popup>
              <q-item-section avatar>
                <q-icon name="mdi-plus-box" />
              </q-item-section>
              <q-item-section>Movement</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section avatar>
                <q-icon name="mdi-account-multiple" />
              </q-item-section>
              <q-item-section>Team</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section avatar>
                <q-icon name="mdi-email" />
              </q-item-section>
              <q-item-section>Newsletter</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section avatar>
                <q-icon name="mdi-calendar" />
              </q-item-section>
              <q-item-section>Event</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

    </q-page-sticky>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>
<style scoped lang="sass">
.q-page
  max-width: 640px
  width: 100%
</style>
