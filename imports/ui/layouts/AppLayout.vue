<script setup>
import AppMenu from './AppMenu.vue'
</script>

<template>
  <AppMenu />
  <main>
    <router-view />
  </main>
</template>

<style scoped>
main {
  min-height: calc(100vh - 91.59px - 72px);
  padding: 3rem 0;
}
</style>
