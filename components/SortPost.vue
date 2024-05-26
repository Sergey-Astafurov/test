<template>
  <select class="border-2 p-2" v-model="model">
    <option value=""  >Сортировка по имени</option>
    <option :value="user.username" v-for="user in userList" :key="user.id">
      {{ user.username }}
    </option>
  </select>
</template>

<script setup>
const props = defineProps(['userList'])
const model = defineModel()
</script>

<style lang="scss" scoped></style>
