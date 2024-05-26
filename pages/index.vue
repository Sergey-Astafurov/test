<template>
  <div class="container mx-auto justify-center py-6 flex flex-wrap">
    <SortPost v-model="website.selected" :userList="website.userList" @change="website.sortedList" />
    <PostList>
      <PostItem
        v-for="(postItem, index) in website.sortedList()"
        :key="postItem.id"
        :postItem="postItem"
      />
    </PostList>
    <ThePagination @skip="website.skip($event)" />
  </div>
</template>

<script setup>
const website = useWebsiteStore();
onMounted(async () => {
  setTimeout(async() => {
      await nextTick();
      await website.getPostList();
      await website.getUsers();

  }, 500);
});

</script>

<style lang="scss" scoped></style>
