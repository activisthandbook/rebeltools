<!--
LAYOUT: MOVEMENT 🌊
This layout is used for all public movement pages (their homepage, events, community, etc).

Path: /super-admin/*
 -->
<template>
  <q-layout view="hHr lpR fFr">
    <q-header class="bg-secondary" >
      <q-toolbar>

        <q-toolbar-title>
          <q-icon name="mdi-shield-check" />
          Super admin
        </q-toolbar-title>

        <q-btn icon="mdi-exit-to-app" label="Close dashboard" :to="{name: 'Home'}" color="white" text-color="black" no-caps/>

      </q-toolbar>
    </q-header>
    <q-page-container class="flex justify-center">
      <q-page padding class="q-pt-lg q-gutter-y-md full-width">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<style>
.q-page{
  max-width: 640px;
}
</style>
