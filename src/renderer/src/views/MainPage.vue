<script setup lang="ts">

import ZoeyIcon from '@/components/sys/ZoeyIcon.vue'
import { goToHref } from '@/utils/common-utils.ts'
import PersonList from '@/components/main/PersonList.vue'
import { ref } from 'vue'

/**
 * 选择菜单
 * @param index
 */
const selectMenuNode = ref(-1)
const clickMenu = (index: number) => {
  selectMenuNode.value = index
}
const getMenuStyleClass = (index: number) => {
  if (index === selectMenuNode.value) {
    return 'chat-icon select-menu'
  } else {
    return 'chat-icon'
  }
}
</script>
<template>
  <div class="main-page">
    <div class="menu drag">
      <div class="avatar-box">
        <img class="no-drag" src="../assets/img/icon.png" @click="goToHref('local_router','/main/icons')" alt="" />
      </div>
      <div class="icon-box" @click="clickMenu(1)">
        <zoey-icon :class="getMenuStyleClass(1)" name="ali_chat" />
      </div>
      <div class="icon-box" @click="clickMenu(2)">
        <zoey-icon :class="getMenuStyleClass(2)" name="ali_accountfilling" />
      </div>
      <div class="icon-box" @click="clickMenu(3)">
        <zoey-icon :class="getMenuStyleClass(3)" name="ali_box" />
      </div>
      <div class="icon-box last-end" @click="clickMenu(4)">
        <zoey-icon :class="getMenuStyleClass(4)" name="ali_setting" />
      </div>

    </div>
    <div class="chat-list">
      <div class="list-top drag">
        <div class="search-person">
        </div>
        <div class="add-person">
        </div>
      </div>
      <div class="person-list">
        <PersonList />
      </div>
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
  /*左侧菜单栏*/
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

      .select-menu {
        fill: #20D298;
      }
    }

    .avatar-box {
      margin: 2rem 1rem;
    }

    .icon-box {
      margin: 0.5rem 0.9rem;
    }

    .last-end {
      position: absolute;
      bottom: 0;
      left: 0;
      margin-bottom: 2rem;
    }
  }

  /*联系人列表*/
  .chat-list {
    width: 26rem;
    background: #DEDEDE;

    .list-top {
      height: 6.8rem;
      width: calc(100% - 0.2rem);
      background: #efefef;
      border-right: 0.2rem solid #eee;
      box-shadow: 0 0.1rem 0.2rem #ccc;
    }

    .person-list {
      height: calc(100vh - 6.8rem);
      width: 26rem;
      display: flex;
      flex-direction: column;
      overflow-y: overlay;
      overflow-x: hidden;

    }


  }

  /*右侧主区域*/
  .chat-content {
    width: calc(100vw - 32rem);
    overflow: auto;
  }
}
</style>
