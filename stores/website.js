import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCountStore = defineStore('countStore', ()=>{
  const count = ref(0)
  return{count}
})