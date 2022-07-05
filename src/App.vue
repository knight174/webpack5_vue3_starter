<script setup lang="ts">
import CurrentUser from './components/CurrentUser.vue'
</script>

<template>
  <img alt="Vue logo" src="@/assets/logo.png" />
  <CurrentUser />
  <nav>
    <router-link :to="{ name: 'Home' }">Home</router-link> |
    <router-link :to="{ name: 'Axios' }">Axios</router-link> |
    <router-link :to="{ name: 'Vuex' }">Vuex</router-link>
  </nav>
  <router-view></router-view>
</template>

<style>
.user-name {
  font-weight: normal;
}
</style>
