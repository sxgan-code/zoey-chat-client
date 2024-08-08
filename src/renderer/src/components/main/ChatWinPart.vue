<script setup lang="ts">
import ZoeyIcon from '@/components/sys/ZoeyIcon.vue'

/**
 * 路由参数
 */
defineProps({
  id: String
})

</script>

<template>
  <div class="chat-box">
    <div class="box-top">
      <div class="chat-name">{{ '订阅号-' + id }}</div>
      <div>
        <zoey-icon name="ali_category" />
      </div>
    </div>
    <div class="box-content"></div>
  </div>
</template>

<style scoped lang="scss">

</style>
