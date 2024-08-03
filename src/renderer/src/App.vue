<script setup lang="ts">
// const ipcHandle = () => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <div class="main-root">
    <router-view />
  </div>
</template>
<style scoped lang="scss">
.main-root {
  width: 100vw;
  height: 100vh;
  background: #FFFFFF;
}
</style>
