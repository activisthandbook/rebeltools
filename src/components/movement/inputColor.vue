<template>
  <q-input label="Primary colour" outlined v-model="newMovement.primaryColor" :rules="['anyColor']">
    <template v-slot:append>
      <q-btn icon="mdi-palette" class="cursor-pointer" v-bind:style="{ background: newMovement.primaryColor }" text-color="white">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-color v-model="newMovement.primaryColor" />
        </q-popup-proxy>
      </q-btn>
    </template>
  </q-input>
</template>
