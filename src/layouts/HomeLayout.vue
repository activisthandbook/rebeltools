<!--
LAYOUT: HOME 🏡
This layout is used for public pages meant to motivate people to start using Rebel Tools.

Path: /*
 -->
<template>
  <q-layout view="hHh lpR fFf" >
    <q-page-container class="flex justify-center">
      <q-page padding class="q-pt-lg q-pb-xl full-width">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.q-page{
  max-width: 640px;
}
</style>
