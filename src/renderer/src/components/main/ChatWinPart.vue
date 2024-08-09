<script setup lang="ts">
import ZoeyIcon from '@/components/sys/ZoeyIcon.vue'
import ZoeyButton from '@/components/btn/ZoeyButton.vue'
import { emojis } from '@/assets/emoji/emoji.ts'
import BubbleBox from '@/components/bubble/BubbleBox.vue'
import { onUnmounted, ref } from 'vue'

/**
 * 路由参数
 */
defineProps({
  id: String
})

/* 气泡框 */
const clickX = ref(0)
const clickY = ref(0)
const isSmailShow = ref(false)
const clickBubbleBox = (event: Event) => {
  clickX.value = event.clientX - event.offsetX
  clickY.value = event.clientY - event.offsetY
  isSmailShow.value = true
}

// 点击事件，用于隐藏div
function hideBox(event: any) {
  console.log(event)
  // 检查事件是否来自i-user-info和div-user-info元素,且userInfoBox.value不为空
  if (event.target.id !== 'smile-box-btn' && event.target.id !== 'smile-box') {
    isSmailShow.value = false
  }
}

// 绑定到window，确保即使点击框内也能监听外部点击
document.body.addEventListener('click', hideBox)
// 在onUnmounted生命周期钩子中移除事件监听，避免内存泄露
onUnmounted(() => {
  window.removeEventListener('click', hideBox)
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
      <div v-for="item in emojis">
        {{ item.name }}
        <div v-for="emo in item.list">
          {{ emo.emo }}
        </div>
      </div>
    </div>
    <div class="send-msg-box no-drag">
      <div class="msg-icon-box">
        <bubble-box />
        <zoey-icon id="smile-box-btn" name="ali_smile" @click="clickBubbleBox($event)" />
        <zoey-icon id="folder-box" name="ali_folder" />
        <zoey-icon id="comments-box" name="ali_comments" />
        <bubble-box id="smile-box" :show="isSmailShow" width="500" height="300" :clickX="clickX" :clickY="clickY">HHHH
        </bubble-box>
      </div>
      <div class="write-msg-box">
        <textarea />
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

    .msg-icon-box {
      height: 3rem;
      display: flex;
      align-items: center;
      padding-left: 2rem;

      svg {
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
        overflow-y: auto;
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
