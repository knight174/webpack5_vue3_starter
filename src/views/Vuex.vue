<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const firstName = ref('')

function updateName() {
  store.commit('updateName', firstName.value)
  firstName.value = ''
}
</script>

<template>
  <h1>Hello, Vuex!</h1>
  <label for="name-input" class="form-group">
    <h1>Update First Name:</h1>
    <input type="text" id="name-input" :placeholder="firstName ? '' : 'Please input your name.'" v-model="firstName" />
  </label>
  <el-button @click="updateName">Update User Name</el-button>
</template>

<style scoped lang="scss">
.form-group {
  display: block;
  width: 50%;
  margin: 0 auto;

  h1 {
    display: inline;
    margin-right: 10px;
  }
}
</style>
