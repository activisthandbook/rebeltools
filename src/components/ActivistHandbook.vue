<template>
  <q-card flat class="bg-secondary" dark>
    <q-card-section>
      <div class="q-gutter-y-sm">
        <h2><span v-if="emoji" style="font-style:normal">{{emoji}}</span> {{ title }}</h2>
        <div>{{ description }}</div>
        <div class="q-gutter-sm" v-if="articles">
          <q-btn
            v-for="article in articles" :key="article.title"
            :label="article.title"
            color="white"
            text-color="black"
            no-caps
            :href="article.link + '?utm_source=rebeltools&utm_medium=admin_banner&utm_campaign=' + campaign"
            target="_blank"
            unelevated

          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  props: ['emoji', 'title', 'description', 'articles', 'campaign']
}
</script>
<style scoped>
.q-card{font-size: .9em}
</style>
