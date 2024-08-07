<script setup lang="ts">
import ids from 'virtual:svg-icons-names'
import { copyToClipboard } from '@/utils/common-utils.ts'
import ZoeyIcon from '@/components/sys/ZoeyIcon.vue'
</script>

<template>
  <div class="icon-list">
    <div v-for="name in ids" @click="copyToClipboard(name.substring(5))">
      <zoey-icon :name="name.substring(5)" />
      {{ name.substring(5) }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.icon-list {
  width: 65vw;
  margin: 2rem auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  background-image: url("https://raw.githubusercontent.com/sxgan-code/zoey-open-images/main/backgroud/zoey002.jpg");
  div {
    width: 10rem;
    height: 10rem;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    backdrop-filter: blur(10px) brightness(90%);
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    svg {

      width: 4rem;
      height: 4rem;
      fill: #818181;
    }
  }
}
</style>
