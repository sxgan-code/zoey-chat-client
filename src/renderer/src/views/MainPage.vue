<script setup lang="ts">

import ZoeyIcon from '@/components/sys/ZoeyIcon.vue'
import { goToHref } from '@/utils/common-utils.ts'
import PersonList from '@/components/main/PersonList.vue'
import { ref } from 'vue'

/**
 * 主窗口控制
 */
const isWinMax = ref(false)
const winCtrl = (str: string) => {
  console.log(str)
  if (str === 'min') {
    window.electron.ipcRenderer.send('main-win-ctrl', 'min')
  } else if (str === 'maxOrUnmax' && isWinMax.value) {
    console.log(isWinMax.value, 'unmax')
    window.electron.ipcRenderer.send('main-win-ctrl', 'unmax')
    isWinMax.value = !isWinMax.value
  } else if (str === 'maxOrUnmax' && !isWinMax.value) {
    console.log(isWinMax.value, 'max')
    window.electron.ipcRenderer.send('main-win-ctrl', 'max')
    isWinMax.value = !isWinMax.value
  } else {
    window.electron.ipcRenderer.send('main-win-ctrl', 'close')
  }
}
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
        <div class="search-person no-drag">
          <zoey-icon name="ali_search" />
          <input type="text" placeholder="搜索" />
          <zoey-icon name="ali_wrong" />
        </div>
        <div class="add-person no-drag">
          <zoey-icon name="ali_add" />
        </div>
      </div>
      <div class="person-list">
        <PersonList />
      </div>
    </div>
    <div class="chat-right-box">
      <div class="win-ctrl drag">
        <div class="no-drag" @click="winCtrl('min')">
          <zoey-icon width="1.8rem" height="1.8rem" name="ail_minus" />
        </div>
        <div class="no-drag" @click="winCtrl('maxOrUnmax')">
          <zoey-icon width="1.6rem" height="1.6rem" name="ali_FullScreen" />
        </div>
        <div class="no-drag" @click="winCtrl('close')">
          <zoey-icon width="2rem" height="2rem" name="ali_close" />
        </div>
      </div>
      <div class="chat-content">
        <router-view />
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
    background: #eae8e7;

    .list-top {
      height: 6.8rem;
      width: calc(100% - 0.2rem);
      background: #efefef;
      border-right: 0.2rem solid #eee;
      box-shadow: 0 0.1rem 0.2rem #ccc;
      display: flex;
      justify-content: center;
      align-items: center;

      .search-person {
        width: 16rem;
        height: 2.2rem;
        border-radius: 0.5rem;
        background: #e2e2e2;
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
          margin: 0.5rem;
          width: 1.4rem;
          height: 1.4rem;
          fill: #7b7b7b;

          &:hover {
            fill: #555555;
          }
        }

        input {
          padding: 0 0.5rem;
          border: none;
          background: none;
          width: 10rem;
          height: 2.2rem;
        }
      }

      .add-person {
        background: #e2e2e2;
        width: 2rem;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.5rem;
        margin-left: 1rem;

        svg {
          width: 1.5rem;
          height: 1.5rem;
          fill: #7b7b7b;
        }

        &:hover {
          background: #d1d1d1;

          svg {
            fill: #555555;
          }
        }
      }
    }

    .person-list {
      height: calc(100vh - 6.8rem);
      width: 26rem;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }

  /*右侧主区域*/
  .chat-right-box {
    height: 100vh;
    width: calc(100vw - 32rem);

    .win-ctrl {
      width: 100%;
      height: 2rem;
      display: flex;
      justify-content: end;
      align-items: center;

      div {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 0.5rem;
        width: 2rem;
        height: 2rem;

        &:hover {
          background: #e2e2e2;
        }

        &:last-child:hover {
          background: #FB7373;
        }

        svg {
          fill: #333333;
        }
      }

    }

    .chat-content {
      width: 100%;
      height: calc(100vh - 3rem);
      overflow: auto;
    }
  }
}
</style>
