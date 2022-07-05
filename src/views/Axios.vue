<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import axios from '../utils/axios'

const username: string = 'Knight174'

interface AxiosVue {
  user: object
  loading: boolean
}

const state: AxiosVue = reactive({
  user: {},
  loading: true
})

const fetchUser = (username: string) => {
  return axios.get(`/users/${username}`)
}

onMounted(async () => {
  try {
    const { data } = await fetchUser(username)
    state.user = { ...data }
    state.loading = false
  } catch (err) {
    throw new Error(err)
  }
})
</script>

<template>
  <h1>Hello, Axios!</h1>
  <div class="content" v-loading="state.loading">
    {{ state.user }}
  </div>
</template>

<style scoped lang="scss">
.content {
  border: 1px solid $red;
  width: 500px;
  min-height: 500px;
  margin: auto;
}
</style>
