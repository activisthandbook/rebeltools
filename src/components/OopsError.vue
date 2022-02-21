<template>
  <div class="text-center q-py-xl">
    <div style="font-size:64px">😕</div>
    <div class="text-bold">{{ title }}</div>
    <div>{{ description }}</div>
  </div>
</template>
<script>
export default {
  props: ['title', 'description']
}
</script>
