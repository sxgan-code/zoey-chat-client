<script setup lang="ts">
import SigninPart from '@/components/auth/SigninPart.vue'
import SignupPart from '@/components/auth/SignupPart.vue'
import ZoeyIcon from '@/components/sys/ZoeyIcon.vue'
import { ref } from 'vue'
import { vLoading } from '@/components/loading/loading.ts'

const isLogin = ref(true)
const isLoading = ref(false)
function selectCurr(curr: boolean) {
  // errMsg.value = ''
  isLogin.value = curr
}
</script>

<template>
  <div v-loading="isLoading" class="login-root-box">
    <div class="head-controller-close">
      <span class="icon-box-close">
        <zoey-icon class="icon-ali-close" name="ali_close" />
      </span>
    </div>
    <div class="select-win-box">
      <div :class="isLogin ? 'bg-color' : ''" @click="selectCurr(true)">登录账号</div>
      <div :class="!isLogin ? 'bg-color' : ''" @click="selectCurr(false)">注册账号</div>
    </div>
    <div class="auth">
      <div v-if="isLogin" class="auth-signin">
        <signin-part v-model="isLoading" />
      </div>
      <div v-if="!isLogin" class="auth-signup">
        <signup-part v-model="isLoading" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-root-box {
  width: 100vw;
  height: 100vh;
  font-size: 1rem;

  .head-controller-close {
    height: 3rem;
    width: 100vw;
    background: #333;
    -webkit-app-region: drag; // 整个菜单栏可拖拽
    display: flex;
    justify-content: flex-end;
    align-content: center;

    .icon-box-close {
      width: 3rem;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 0.5rem;
      -webkit-app-region: no-drag; // 鼠标移入时，不触发拖拽
      .icon-ali-close {
        fill: #cccccc;

        &:hover {
          fill: #7bcdef;
        }
      }
    }
  }

  .select-win-box {
    width: 70vw;
    height: 4rem;
    background: #f4f4f4;
    margin: 2rem auto 3rem;
    border-radius: 2.5rem;
    border: 0.2rem solid #f4f4f4;
    display: flex;

    div {
      color: #696969;
      width: 35vw;
      height: 4rem;
      text-align: center;
      line-height: 4rem;
      font-size: 1.8rem;
      font-family: 'HarmonyOS Sans Bold', sans-serif;
      border-radius: 2.5rem;
    }

    .bg-color {
      background: #ffffff;
      color: #000;
    }
  }
}
</style>
