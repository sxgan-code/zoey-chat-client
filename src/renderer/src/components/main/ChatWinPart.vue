<script setup lang="ts">
import ZoeyIcon from '@/components/sys/ZoeyIcon.vue'
import ZoeyButton from '@/components/btn/ZoeyButton.vue'

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
      <div class="chat-name no-drag">{{ '订阅号-' + id }}</div>
      <div class="chat-operate no-drag">
        <zoey-icon name="ali_operate" />
      </div>
    </div>
    <div class="box-content no-drag">

    </div>
    <div class="send-msg-box no-drag">
      <div class="msg-icon-box">
        <zoey-icon name="ali_smile" />
        <zoey-icon name="ali_folder" />
        <zoey-icon name="ali_comments" />
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
