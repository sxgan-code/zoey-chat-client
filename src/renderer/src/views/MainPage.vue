<script setup lang="ts">
import ids from 'virtual:svg-icons-names'
import ZoeyIcon from '@/components/sys/ZoeyIcon.vue'
import { copyToClipboard } from '@/utils/common-utils.ts'
</script>
<template>
  <div class="main-page">
    <div class="menu drag">
      <div>
        <img width="20" height="20" src="../assets/img/icon.png" />
      </div>
      <div>
        <zoey-icon class="chat-icon" name="chat_dangqianhuihua" color="#818181" />
      </div>
      <div>
        <zoey-icon class="chat-icon" name="chat_yonghu" color="#818181" />
      </div>
      <div>
        <zoey-icon class="chat-icon" name="chat_setting" color="#818181" />
      </div>


    </div>
    <div class="chat-list">

      <zoey-icon name="chat_plus" />
      <zoey-icon name="chat_zuidapaiduishu" />
      <zoey-icon name="chat_Female" />
      <zoey-icon name="chat_yonghu" />
      <zoey-icon name="chat_wenjianjia" />
      <zoey-icon name="chat_yijian" />
      <zoey-icon name="chat_duanxin" />
      <zoey-icon name="chat_Male" />
      <zoey-icon name="chat_kaixin" />

      <zoey-icon name="chat_minus" />
      <zoey-icon name="chat_FullScreen" />
      <zoey-icon name="chat_close" />
    </div>
    <div
      class="chat-content"
      style="
        width: 100vw;
        display: flex;
        justify-items: center;
        align-content: center;
        justify-content: center;
        flex-wrap: wrap;
      "
    >
      <div
        v-for="name in ids"
        style="
          width: 5rem;
          height: 5rem;
          text-align: center;
          background: #ccc;
          margin: 1rem;
          display: flex;
          justify-content: center;
          justify-items: center;
          align-content: center;
        "
        @click="copyToClipboard(name.substring(5))"
      >
        <zoey-icon style="width: 2rem; height: 2rem" :name="name.substring(5)" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-page {
  background: #f5f5f5;
  height: 100vh;
  width: 100vw;
  display: flex;

  .menu {
    width: 6rem;
    background: #2E2E2E;
    display: flex;
    flex-direction: column;

    div {
      width: 3rem;
      height: 3rem;
      margin: 0 1.5rem;
      -webkit-app-region: no-drag; // 鼠标移入时，不触发拖拽
      ::v-deep .svg-icon {
        fill: #0E8E89;
      }
    }
  }


  .chat-list {
    flex: 20;
    width: 8rem;

  }

  .chat-content {
    flex: 72;
    overflow: auto;
  }
}
</style>
