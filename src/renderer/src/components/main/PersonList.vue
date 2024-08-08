<script setup lang="ts">
import { ref } from 'vue'

/**
 * 设置列表点击样式
 */
const selectNodeNum = ref(-1)
const selectCurrNode = (index: number) => {
  console.log(index)
  selectNodeNum.value = index
}
</script>

<template>
  <div v-for="(item,index) in 15" :class="selectNodeNum===index?'list-item select-node':'list-item'"
       @click="selectCurrNode(index)" :key="index+'-'+selectNodeNum">
    <div class="box">
      <div class="img-box">
        <img src="@/assets/img/avatar.png" alt="">
      </div>
      <div class="person-box">
        <div class="name-time">
          <span class="name">订阅号{{ index }}</span>
          <span class="time">13:30</span>
        </div>
        <div class="new-content">天外来物：哈哈哈哈</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-item {
  width: 26rem;
  height: 8rem;

  &:hover {
    background: #c8c8c8;
  }

  .box {
    width: 24rem;
    height: 6rem;
    margin: 1rem;
    display: flex;

    .img-box {
      margin: 0.5rem;

      img {
        width: 5rem;
        height: 5rem;
      }
    }

    .person-box {
      width: 17rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .name-time {
        width: 17rem;
        display: flex;
        justify-content: space-between;
        font-size: 1.6rem;

        .name {
          width: 8rem;
        }

        .time {
          color: #bbbbbb;
        }
      }

      .new-content {
        width: 17rem;
        height: 2rem;
        font-size: 1.2rem;
        color: #bbbbbb;
      }
    }
  }
}

.select-node {
  background: #c8c8c8;
}
</style>
