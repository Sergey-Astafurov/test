<template>
  <div class="container mx-auto justify-center py-6 flex flex-wrap">
    <select class="border-2 p-2" v-model="selected" >
      <option value="" disabled>Сортировка по имени</option>
      <option v-for="user in userList" :key="user.id">
        {{ user.username }}
      </option>
    </select>
    <div class="flex py-8" >
      <ul class="flex justify-center gap-5 w-full flex-wrap">
        <PostItem
          v-for="(postItem, index) in sortedList"
          :key="postItem.id"
          :postItem="postItem"
        />
      </ul>
    </div>

    <div class="flex gap-7">
      <div
        class="border-2 p-3 cursor-pointer"
        v-for="(item, index) in 5"
        :key="index"
        @click="skip(item - 1)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
const getUsers = async () => {
  const users = await $fetch("https://jsonplaceholder.typicode.com/users");
  userList.value.push(...users);
};

const limitPost = 20;
const page = ref();
const currentPage = ref(0);
const selected = ref("");
const postList = ref([]);
const userList = ref([]);
const getPostList = async () => {
  const posts = await $fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=20`
  );
  const users = await $fetch("https://jsonplaceholder.typicode.com/users");
  getPost(posts, users);
};
async function skip(item) {
  const posts = await $fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=20&_start=${
      item * limitPost
    }`
  );
  const users = await $fetch("https://jsonplaceholder.typicode.com/users");
  getPost(posts, users);
}

let sortedList = computed(() => {
  if (!selected.value) {
    return postList.value;
  } else{
    let arr = []
    // postList.value = []
    const userId = userList.value.find((user) => {
      return user.username === selected.value;
    });
    const sortPosts =  fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId.id}`
    ).then(response => response.json())
  .then(commits =>{
    let arr = [...commits]
    const result = getPost(arr,userList.value)
   });
   return postList.value

  }
});

function getPost(post, user) {
  postList.value = [];
  for (let key1 in post) {
    for (let key2 in user) {
      if (post[key1].userId == user[key2].id) {
        postList.value.push({
          id: post[key1].id,
          userId: post[key1].userId,
          title: post[key1].title,
          body: post[key1].body,
          username: user[key2].username,
        });
      }
    }
  }
}

onMounted(async () => {
  await nextTick();
  await getUsers();
  await getPostList();
});
</script>

<style lang="scss" scoped></style>
