<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const fullName = computed(() => store.getters.fullName)
</script>

<template>
  <h1>
    Current User Name: <span class="user-name">{{ fullName }}</span>
  </h1>
</template>
