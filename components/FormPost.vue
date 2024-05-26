<template>
<form class="flex flex-col gap-4" action="" @submit.prevent="emit('submit')">
      <h3>Title</h3>
      <input
        class="border-2 p-4 text-xl border-pink-600"
        v-model="title"
        type="text"
      />
      <h3>Body</h3>
      <textarea
        class="border-2 p-4 text-xl border-pink-600"
        v-model="body"
        cols="10"
        rows="10"
        type="text"
      ></textarea>
      <button class="p-4 border-4 border-purple-950">Сохранить</button>
    </form>
</template>

<script setup>
const title = defineModel('title')
const body = defineModel('body')
const emit = defineEmits(['submit'])
</script>

<style lang="scss" scoped>

</style>