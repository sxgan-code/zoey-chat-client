<script setup lang="ts">

import BubbleBox from '@/components/bubble/BubbleBox.vue'
import ZoeyIcon from '@/components/sys/ZoeyIcon.vue'
import { ref } from 'vue'
import { EmojiContentType, emojis, EmojiType } from '@/assets/emoji/emoji.ts'

let props = defineProps({
  show: { type: Boolean, default: false }//弹框是否显示
})
const emitSmail = defineEmits<{ (event: 'send:emoji', emo: EmojiContentType): void }>()
const sendEmoji = (emo: EmojiContentType) => {
  const msg = window.electron.ipcRenderer.invoke('test-msg', 'clickmsg')
  msg.then((res) => {
    console.log(res)
  })
  console.log(msg)
  emitSmail('send:emoji', emo)
}
const nodeNum = ref(1)
const emos = ref<EmojiType>(emojis.smail)
const selectNode = (index: number) => {
  nodeNum.value = index
  switch (index) {
    case 1:
      emos.value = emojis.smail
      break
    case 2:
      emos.value = emojis.person
      break
    case 3:
      emos.value = emojis.animal
      break
    case 4:
      emos.value = emojis.drink
      break
    case 5:
      emos.value = emojis.address
      break
    case 6:
      emos.value = emojis.activity
      break
    case 7:
      emos.value = emojis.sign
      break
    case 8:
      emos.value = emojis.thing
      break
  }
}
/* 气泡框 */
const clickX = ref(0)
const clickY = ref(0)
const isSmailShow = ref(false)
const isFolderShow = ref(false)
const clickBubbleBox = (event: MouseEvent, type: number) => {
  clickX.value = event.clientX - event.offsetX
  clickY.value = event.clientY - event.offsetY
  if (type === 1) {
    isSmailShow.value = true
  } else if (type === 2) {
    isFolderShow.value = true
  }
}

const clickSmailShow = () => {
  isSmailShow.value = !isSmailShow.value
}

</script>

<template>
  <div class="msg-icon-box">
    <zoey-icon id="smile-box-btn" name="ali_smile" @click="clickBubbleBox($event,1)" />
    <zoey-icon id="folder-box-btn" name="ali_folder" />
    <zoey-icon id="comments-box" name="ali_comments" />
    <bubble-box :show="isSmailShow" @update:modelValue="clickSmailShow" :width="400" :height="400"
                :clickX="clickX" :clickY="clickY">
      <div class="small">
        <div class="top">
          <div class="title">{{ emos?.name }}</div>
          <div class="emo-list">
            <div class="emo" v-for="item in emos?.list" @click="sendEmoji(item)">
              {{ item.emoji }}
            </div>
          </div>
        </div>
        <hr>
        <div class="menu">
          <div :class="nodeNum===1?'select-node':''" @click="selectNode(1)">
            <zoey-icon width="2.8rem" height="2.8rem" name="ali_menu_smail" />
          </div>
          <div :class="nodeNum===2?'select-node':''" @click="selectNode(2)">
            <zoey-icon width="2.5rem" height="2.5rem" name="ali_menu_person" />
          </div>
          <div :class="nodeNum===3?'select-node':''" @click="selectNode(3)">
            <zoey-icon width="2rem" height="2rem" name="ali_menu_animal" />
          </div>
          <div :class="nodeNum===4?'select-node':''" @click="selectNode(4)">
            <zoey-icon width="2.1rem" height="2.1rem" name="ali_menu_food" />
          </div>
          <div :class="nodeNum===5?'select-node':''" @click="selectNode(5)">
            <zoey-icon width="2.1rem" height="2.1rem" name="ali_menu_address" />
          </div>
          <div :class="nodeNum===6?'select-node':''" @click="selectNode(6)">
            <zoey-icon width="2.1rem" height="2.1rem" name="ali_menu_fireworks" />
          </div>
          <div :class="nodeNum===7?'select-node':''" @click="selectNode(7)">
            <zoey-icon width="2rem" height="2rem" name="ali_menu_sign" />
          </div>
          <div :class="nodeNum===8?'select-node':''" @click="selectNode(8)">
            <zoey-icon width="2.5rem" height="2.5rem" name="ali_menu_thing" />
          </div>
        </div>
      </div>
    </bubble-box>
  </div>
</template>

<style scoped lang="scss">
.msg-icon-box {
  height: 3rem;
  display: flex;
  align-items: center;
  padding-left: 2rem;

  > svg {
    width: 1.8rem;
    height: 1.8rem;
    cursor: pointer;
    margin-right: 1.5rem;
    fill: #545454;

    &:hover {
      fill: #222222;
    }
  }
}

.small {
  width: 40rem;
  height: 40rem;

  .top {
    width: 38rem;
    height: 34rem;
    margin: 0 auto;

    .title {
      width: 38rem;
      line-height: 3rem;
      margin: 0 auto;
      font-size: 1.4rem;
      font-family: "幼圆", sans-serif;
      color: #555555;
    }

    .emo-list {
      width: 38rem;
      height: 30rem;
      display: flex;
      flex-wrap: wrap;
      overflow-y: auto;
      margin: 0 auto;

      .emo {
        width: 3rem;
        height: 3rem;
        display: flex;
        font-size: 2rem;
        margin: 0.3rem;
        justify-content: center;
        align-items: center;

        &:hover {
          background: #eeeeee;
          border-radius: 0.2rem;
        }
      }

    }

  }

  hr {
    width: 38rem;
    color: #cccccc;
    margin: 0 auto;
    opacity: 0.2;
  }

  .menu {
    width: 38rem;
    margin: 0 auto;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    div {
      width: 3rem;
      height: 3rem;
      margin: 0.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.3rem;

      &:hover {
        background: #cccccc;
      }

      svg {
        fill: #666666;
        cursor: pointer;
      }

      svg:hover {
        fill: #444444;
      }
    }

    .select-node {
      background: #cccccc;
    }

  }
}
</style>
