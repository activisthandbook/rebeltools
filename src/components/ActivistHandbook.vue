<template>
  <q-card flat class="bg-secondary" dark>
    <q-card-section>
      <div class="q-gutter-y-sm">
        <h2>{{ title }}</h2>
        <div>{{ description }}</div>
        <div class="q-gutter-sm">
          <q-btn
            v-for="article in articles" :key="article.title"
            :label="article.title"
            color="white"
            text-color="black"
            no-caps
            icon-right="mdi-open-in-new"
            :href="article.link + '?utm_source=rebeltools&utm_medium=admin_banner&utm_campaign=' + campaign"
            target="_blank"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  props: ['title', 'description', 'articles', 'campaign']
}
</script>
