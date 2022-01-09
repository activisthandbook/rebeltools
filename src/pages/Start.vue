<!--
PAGE: START 🏁
This is what would usually be the sign in or register page. But in our case, both follow the same procedure (invite link). We want to make engagement as seamless as possible, so that is why we 'removed' the process of registering.

Path: /start
 -->
<template>
  <q-skeleton class="q-my-lg" height="172px" v-if="!$store.state.auth.dataLoaded"/>
  <div v-else>
    <q-card class="q-my-lg" v-if="$store.state.auth.data.emailVerified">
      <q-card-section>
        <div class="q-gutter-y-sm">
          <h2>Welcome back!</h2>
          <div>On this page, you can sign in. But you already seem to be signed in. Are you confused? Well, we are.</div>
          <q-btn label="Go home" :to="{name: 'Home'}" color="primary" icon="mdi-home" no-caps/>
        </div>
      </q-card-section>
    </q-card>
    <smart-action
      v-else
      :onlySignup="true"
      :signup="{
        dataPath: 'movements/x',
        title: 'Get started',
        description: 'Fill in your email address to register or sign in.',
        buttonLabel: 'Join movement'
      }"
    />
  </div>
</template>
<script>
import SmartAction from 'src/components/SmartAction'

export default {
  components: {
    SmartAction
  }
}
</script>
