<template>
  <div class="container mx-auto font-mono">
    <div class="text-xl">{{post.id }} : {{ post.username }}</div>
    <FormPost @submit="submit" v-model:title="post.title" v-model:body="post.body"/>
  </div>
</template>

<script setup>
const route = useRoute();
const post = ref([]);
const getCurrentPost = async () => {
  let currentPost = await $fetch(
    `https://jsonplaceholder.typicode.com/posts/${route.params.id}`
  );
  const users = await $fetch("https://jsonplaceholder.typicode.com/users");
  const getUser = users.find((user) => {
    return user.id == currentPost.userId;
  });
  currentPost.username = getUser.username;
  post.value = currentPost;
};
async function submit() {
  const sendPost = await $fetch(`https://jsonplaceholder.typicode.com/posts/${route.params.id}`,
    {
      method: "PATCH",
      headers: {"Content-type": "application/json; charset=UTF-8"},
      body: JSON.stringify({
        title: post.value.title,
        body: post.value.body,
      })
    }
  )
}
onMounted(async () => {
  await nextTick();
  await getCurrentPost();
});
</script>

<style lang="scss" scoped></style>
