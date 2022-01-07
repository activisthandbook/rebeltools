<!--
LAYOUT: HOME 🏡
This layout is used for public pages meant to motivate people to start using Rebel Tools.

Path: /*
 -->
<template>
  <q-layout view="hHh lpR fFf">

    <q-header bordered class="bg-white text-black non-selectable">
      <q-toolbar>
          <q-avatar square @click="$router.push({name: 'Home'})" class="cursor-pointer">
            <img src="../assets/logo.svg" alt="Logo Rebel Tools">
          </q-avatar>
        <q-toolbar-title @click="$router.push({name: 'Home'})" class="cursor-pointer">
          Rebel Tools
        </q-toolbar-title>
        <q-btn icon="mdi-heart" label="Volunteer" outline no-caps @click="openExternal('https://guides.rebel.tools/docs/contribute')"/>
      </q-toolbar>
    </q-header>

    <q-page-container class="flex justify-center">
      <q-page padding class="q-pt-lg q-pb-xl full-width">
        <router-view />
        <footer class="text-body-2 q-gutter-y-md text-grey-8 q-mt-xl q-pt-sm">
          <q-separator class="q-my-xl"/>
          <h2>Rebel Tools</h2>

          <div class="row q-col-gutter-y-lg q-mt-lg">
            <div class="q-gutter-y-sm col-sm-4 col-12">
              <div class="text-bold">About</div>
              <div><a href="https://guides.rebel.tools/docs/support" class="text-grey-8">User guides</a></div>
              <div><a href="https://guides.rebel.tools/docs/dev" class="text-grey-8">Documentation</a></div>
              <div><router-link to="/privacy" class="text-grey-8">Privacy</router-link></div>
              <div><a href="https://github.com/activisthandbook/rebeltools/blob/main/LICENSE.md" class="text-grey-8">License</a></div>
            </div>
            <div class="q-gutter-y-sm col-sm-4 col-12">
              <div class="text-bold">Stay updated</div>
              <div><a href="http://activism.rocks/join" class="text-grey-8">Newsletter</a></div>
              <div><a href="https://www.instagram.com/activisthandbook/" class="text-grey-8">Instagram</a></div>
              <div><a href="https://twitter.com/home?lang=en" class="text-grey-8">Twitter</a></div>
              <div><a href="https://www.youtube.com/channel/UCnaQQFVNV0eKc4j3-zwc09A" class="text-grey-8">YouTube</a></div>
              <div><a href="https://www.facebook.com/activisthandbook" class="text-grey-8">Facebook</a></div>
            </div>
            <div class="q-gutter-y-sm col-sm-4 col-12">
              <div class="text-bold">Comparisons</div>
              <div><router-link :to="{name: 'Action Network'}" class="text-grey-8">Action Network</router-link></div>
              <!-- <div><router-link to="/nationbuilder" class="text-grey-8">Nation Builder</router-link></div>
              <div><router-link to="/changeorg" class="text-grey-8">Change.org</router-link></div>
              <div><router-link to="/changeorg" class="text-grey-8">Wordpress</router-link></div> -->
            </div>
          </div>

        </footer>
      </q-page>
    </q-page-container>

  </q-layout>
</template>
<script>
import { openURL } from 'quasar'

export default {
  methods: {
    openExternal: (link) => {
      openURL(link)
    }
  }
}
</script>
<style scoped>
.q-page{
  max-width: 640px;
}
</style>
