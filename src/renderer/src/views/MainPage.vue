<script setup lang="ts">
import ids from 'virtual:svg-icons-names'
import ZoeyIcon from '@/components/sys/ZoeyIcon.vue'
import { copyTextToClipboard, copyToClipboard } from '@/utils/common-utils.ts'
</script>
<template>
  <div class="main-page">
    <div class="menu">
      <zoey-icon name="chat_dangqianhuihua" />
      <zoey-icon name="chat_yonghu" />
      <zoey-icon name="chat_plus" />
      <zoey-icon name="chat_zuidapaiduishu" />
      <zoey-icon name="chat_Female" />
      <zoey-icon name="chat_yonghu" />
      <zoey-icon name="chat_wenjianjia" />
      <zoey-icon name="chat_yijian" />
      <zoey-icon name="chat_duanxin" />
      <zoey-icon name="chat_Male" />
      <zoey-icon name="chat_kaixin" />
      <zoey-icon name="chat_setting" />
      <zoey-icon name="chat_minus" />
      <zoey-icon name="chat_FullScreen" />
      <zoey-icon name="chat_close" />
    </div>
    <div class="chat-list"></div>
    <div class="chat-content"
         style="width: 100vw;display: flex;justify-items: center;align-content: center;justify-content: center; flex-wrap: wrap">
      <div style="width: 5rem;height: 5rem;text-align: center;background:#ccc;margin: 1rem" v-for="name in ids" @click="copyToClipboard(
        name.substring(5)
      )">
        <zoey-icon :name="name.substring(5)" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-page {
  background: #f5f5f5;
  height: 100vh;
  width: 100vw;
}
</style>
