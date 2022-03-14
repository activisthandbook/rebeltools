<template>
  <h2>Invite friends</h2>
  <p>Let's grow {{ $store.state.currentMovement.data.name }} together. Share the link, {{$store.state.currentUser.data.firstName }}.</p>
  <q-input label="🔗 Share the link" v-model="url" @focus="(input) => input.target.select()" ref="url" dark color="white" filled/>
  <q-btn icon="mdi-content-copy" label="Copy link" no-caps @click="copy()" color="white" text-color="black"/>
</template>
<script>
import { getAnalytics, logEvent } from 'firebase/analytics'
const analytics = getAnalytics()

export default {
  computed: {
    url: {
      get: function () {
        return window.location.href + '?invite=' + this.$store.state.auth.data.uid
      },
      set: function (newValue) {
      }
    }
  },
  methods: {
    copy: function () {
      navigator.clipboard.writeText(this.url)
      this.$q.notify({ message: 'Link copied', icon: 'mdi-check' })

      logEvent(analytics, 'page_link_copied', {
        url: this.url,
        ref: 'smartAction_sharePage'
      })
    }
  }
}
</script>
