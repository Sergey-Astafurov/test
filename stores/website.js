import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useWebsiteStore = defineStore('websiteStore', () => {
  const limitPost = 20; // количество постов на странице
  const postList = ref([]); // список постов
  const userList = ref([]); // список пользователей
  const selected = ref(""); // выбраный из списка
  async function getPostsAPI() { // вернуть список постов
    const posts = await $fetch('https://jsonplaceholder.typicode.com/posts?_limit=20');
    return posts;
  }
  async function getUsersAPI() { // вернуть список пользователей
    const users = await $fetch("https://jsonplaceholder.typicode.com/users");
    return users;
  }
  async function getUsers() { // положить вользователя
    const users = await $fetch("https://jsonplaceholder.typicode.com/users");
    userList.value.push(...users);
  };
  async function getPostList() { // спарсить данные
    postList.value = []
    userList.value = []
    const posts = await getPostsAPI()
    const users = await getUsersAPI()
    getPost(posts, users);
  };

  async function skip(item) { // пагинация
    const posts = await $fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=20&_start=${item*limitPost}`
    );
    const users = await getUsersAPI();
    getPost(posts, users);
  }
  function sortedList(){ // сортировка
    if (!selected.value) {
      return postList.value;
    } else {
      let arr = [];
      const userId = userList.value.find((user) => {
        return user.username === selected.value;
      });
      const sortPosts = fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId.id}`
      ).then((response) => response.json()).then((commits) => {
          let arr = [...commits];
          const result = getPost(arr, userList.value);
        });
      return postList.value;
    }
  };
  function getPost(post, user) {  // обьединение массивов
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


  return {
    limitPost, getPostList, postList, userList, skip, getPost, getPostsAPI, getUsersAPI, getUsers, sortedList, selected,
  }
})