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
      <div class="chat-name no-drag">{{ '订阅号-' + id }}</div>
      <div class="chat-operate no-drag">
        <zoey-icon name="ali_operate" />
      </div>
    </div>
    <div class="box-content no-drag">

    </div>
    <div class="send-msg-box no-drag">
      <div></div>
      <div></div>
      <div></div>
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

  .box-content {
    flex: 8;
    overflow-y: auto;
    background: #f5f5f5;
    border-bottom: 0.1rem solid #cccccc;
  }

  .send-msg-box {
    flex: 2;
  }
}
</style>
