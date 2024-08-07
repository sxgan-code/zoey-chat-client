<script setup lang="ts">

import ZoeyIcon from '@/components/sys/ZoeyIcon.vue'
import { copyToClipboard, goToHref } from '@/utils/common-utils.ts'
</script>
<template>
  <div class="main-page">
    <div class="menu drag">
      <div class="avatar-box">
        <img class="no-drag" src="../assets/img/icon.png" @click="goToHref('local_router','/main/icons')" alt="" />
      </div>
      <div class="icon-box">
        <zoey-icon class="chat-icon" name="ali_chat" />
      </div>
      <div class="icon-box">
        <zoey-icon class="chat-icon" name="ali_accountfilling" />
      </div>
      <div class="icon-box">
        <zoey-icon class="chat-icon" name="ali_box" />
      </div>
      <div class="icon-box last-end">
        <zoey-icon class="chat-icon " name="ali_setting" />
      </div>

    </div>
    <div class="chat-list">

    </div>
    <div class="chat-content">
      <router-view />
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
      width: 4rem;
      height: 4rem;
      -webkit-app-region: no-drag; // 鼠标移入时，不触发拖拽
      img {
        width: 4rem;
        height: 4rem;
      }
      .chat-icon {
        fill: #818181;
        width: 2.2rem;
        height: 2.2rem;
        margin: 0.9rem;

      }

      .svg-icon:hover {
        fill: #20D298;
      }

    }
    .avatar-box{
      margin: 2rem 1rem;
    }
    .icon-box{
      margin: 0.5rem 0.9rem;
    }
    .last-end{
      position: absolute;
      bottom: 0;
      left: 0;
      margin-bottom: 2rem;
    }


  }


  .chat-list {
    width: 26rem;
    background: #DEDEDE;

  }

  .chat-content {
    width: calc(100vw - 32rem);
    overflow: auto;
  }
}
</style>
