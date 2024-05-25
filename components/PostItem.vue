<template>
  <li class="md:w-1/2 w-full p-5 border-2 flex flex-wrap">
    <nuxt-link :to="{ name: 'posts-id', params: { id: postItem.id,  } }">
      <b class="border-b-4 border-b-pink-800">{{ postItem.username }}</b>
      <h3 class="py-4">{{ postItem.title }}</h3>
      <p class="w-full">{{ postItem.body }}</p>
    </nuxt-link>
  </li>
</template>

<script setup>
const props = defineProps(['postItem'])

</script>

<style lang="scss" scoped></style>
