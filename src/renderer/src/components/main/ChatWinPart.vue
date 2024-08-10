<script setup lang="ts">
import ZoeyIcon from '@/components/sys/ZoeyIcon.vue'
import ZoeyButton from '@/components/btn/ZoeyButton.vue'
import { EmojiContentType, emojis } from '@/assets/emoji/emoji.ts'
import SmailPart from '@/components/main/SmailPart.vue'
import { ref, watch } from 'vue'
import { send } from 'vite'

/**
 * 路由参数
 */
defineProps({
  id: String
})

const sendMsgVal = ref('==============================saaaaaaaaaaaaaaaaaaaalllllllllllll' +
  'lllllllllllllllllllllllllllllllllllllllllllllllllllladfjjdklfjkdn啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦' +
  ' 事实上事实上少时诵诗书是撒是撒是撒是撒是撒是撒是撒是撒是撒是撒是撒是大少时诵诗书少时诵诗书是撒是撒')
const writeEmoji = (emo: EmojiContentType) => {
  sendMsgVal.value += emo.emoji
}
const msgRef = ref()
const scrollBottom = (event: Event) => {
  console.log(msgRef.value.sorollTop, msgRef.value.scrollHeight)

}
watch(sendMsgVal,(nwe,old)=>{
  console.log(msgRef)
  console.log(msgRef.value.sorollTop, msgRef.value.scrollHeight)
  msgRef.value.sorollTop = msgRef.value.scrollHeight
})
</script>

<template>
  <div class="chat-box">
    <div class="box-top">
      <div class="chat-name no-drag">{{ '订阅号-' + id }}</div>
      <div class="chat-operate no-drag">
        <zoey-icon name="ali_operate" />
      </div>
    </div>
    <div class="box-content no-drag">
    </div>
    <div class="send-msg-box no-drag">
      <smail-part @send:emoji="writeEmoji" />
      <div class="write-msg-box">
        <textarea ref="msgRef" v-model="sendMsgVal" />
      </div>
      <div class="send-btn">
        <zoey-button class="btn" type="primary" plain size="small">发送</zoey-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat-box {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  .box-top {
    height: 4.8rem;
    border-bottom: 0.1rem solid #cccccc;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .chat-name {
      font-size: 2.4rem;
      padding-left: 2rem;

      &:hover {
        cursor: pointer;

      }
    }

    .chat-operate {
      width: 3rem;
      height: 3rem;
      padding-right: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        width: 1.5rem;
        height: 1.5rem;

      }

      &:hover {
        cursor: pointer;

        svg {
          fill: #666666;
        }
      }
    }
  }

  /*消息展示区*/
  .box-content {
    flex: 8;
    overflow-y: auto;
    background: #f5f5f5;
    border-bottom: 0.1rem solid #cccccc;
  }

  /*发送区域*/
  .send-msg-box {
    flex: 2;
    display: flex;
    flex-direction: column;

    .write-msg-box {
      flex: 8;

      textarea {
        font-family: "幼圆", sans-serif;
        width: calc(100% - 4rem);
        background: none;
        resize: none;
        border: none;
        line-height: 2.4rem;
        height: 7rem;
        overflow: auto;
        font-size: 1.5rem;
        padding: 0 2rem;
      }
    }

    .send-btn {
      height: 3rem;
      width: calc(100% - 2rem);
      display: flex;
      padding-right: 2rem;
      justify-content: end;

      .btn {
        width: 8rem;
      }
    }
  }
}
</style>
