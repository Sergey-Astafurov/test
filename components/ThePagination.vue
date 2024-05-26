<template>
  <div class="flex gap-7">
    <div
      class="border-2 p-3 cursor-pointer"
      v-for="(item, index) in 5"
      :key="index"
      @click="emit('skip', item - 1)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["skip"]);
</script>

<style lang="scss" scoped></style>
