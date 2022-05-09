<template>
  <div class="text-center q-pt-lg q-pb-xl">
    <div style="font-size: 64px">😕</div>
    <div class="text-bold">{{ title }}</div>
    <div>{{ description }}</div>
    <div class="text-caption text-grey">{{ error }}</div>
  </div>
</template>
<script>
export default {
  props: ["title", "description", "error"],
};
</script>
