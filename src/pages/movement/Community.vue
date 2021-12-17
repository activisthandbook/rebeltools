<!--
PAGE: MOVEMENT / COMMUNITY 💜
This page shows oppertunities for people to get involved in the movement community.

Path: /:movementID/community
 -->
<template>
  <h1>Community</h1>
  <q-card class="text-bold">
    <q-list>
      <q-item clickable v-ripple :to="{name:'Vacant roles'}">
        <q-item-section avatar>
          <q-icon name="mdi-lightning-bolt" />
        </q-item-section>
        <q-item-section>
          Vacant roles
        </q-item-section>
        <q-item-section side>
          <q-icon name="mdi-arrow-right" />
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple :to="{name:'Our teams'}">
        <q-item-section avatar>
          <q-icon name="mdi-account-group" />
        </q-item-section>
        <q-item-section>
          Our teams
        </q-item-section>
        <q-item-section side>
          <q-icon name="mdi-arrow-right" />
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple :to="{name:'Partners'}">
        <q-item-section avatar>
          <q-icon name="mdi-heart" />
        </q-item-section>
        <q-item-section>
          Partners
        </q-item-section>
        <q-item-section side>
          <q-icon name="mdi-arrow-right" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
  <div>
    <h2 class="q-mb-sm">People</h2>
    <people-list/>
  </div>
</template>
<script>
import PeopleList from '../../components/PeopleList.vue'

export default {
  components: { PeopleList }
}
</script>
