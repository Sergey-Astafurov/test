<template>
  <div class="container mx-auto font-mono">
    <div class="text-xl">{{ post.userId }} : {{ post.username }}</div>
    <form class="flex flex-col gap-4" action="" @submit.prevent="submit">
      <h3>Title</h3>
      <input
        class="border-2 p-4 text-xl border-pink-600"
        v-model="post.title"
        type="text"
      />
      <h3>Body</h3>
      <textarea
        class="border-2 p-4 text-xl border-pink-600"
        v-model="post.body"
        cols="10"
        rows="10"
        type="text"
      ></textarea>
      <button class="p-4 border-4 border-purple-950">Сохранить</button>
    </form>
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
