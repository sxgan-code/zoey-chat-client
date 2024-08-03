<script setup lang="ts">
import { ref } from 'vue'
import ZoeyIcon from '@/components/sys/ZoeyIcon.vue'

const isLogin = ref(true)

function selectCurr(curr: boolean) {
  registerData.value = {
    email: 'sxgan@foxmail.com',
    password: 'aaa123',
    rePassword: '',
    verifyCode: ''
  }
  // errMsg.value = ''
  isLogin.value = curr
}

// 表单校验
/**
 * 登录请求参数
 */
export interface LoginData {
  /**
   * 邮箱
   */
  email: string
  /**
   * 密码
   */
  password: string
  /**
   * 确认密码
   */
  rePassword: string

  /**
   * 验证码
   */
  verifyCode: string
}

const registerData = ref<LoginData>({
  email: '',
  password: '',
  rePassword: '',
  verifyCode: ''
})
const errMsg = ref('错误')
</script>

<template>
  <div class="login-root-box">
    <div class="head-controller-close">
      <span class="icon-box-close">
        <zoey-icon class="icon-ali-close" name="ali_close" />
      </span>
    </div>
    <div class="select-win-box">
      <div :class="isLogin ? 'login-box bg-color' : 'login-box'" @click="selectCurr(true)">
        登录账号
      </div>
      <div :class="isLogin ? 'reg-box' : 'reg-box bg-color'" @click="selectCurr(false)">
        注册账号
      </div>
    </div>
    <div v-if="isLogin" class="content-box login-content">
      <div class="box-title">
        <h4>账号登录</h4>
      </div>
      <div class="box-form">
        <div>
          <input
            id=""
            v-model="registerData.email"
            class="input-box"
            type="text"
            name=""
            placeholder="请输入邮箱"
          />
        </div>
        <div>
          <input
            id=""
            v-model="registerData.password"
            class="input-box"
            type="password"
            name=""
            data="passworedtype"
            placeholder="请输入密码"
          />
        </div>
        <div class="error-tip">
          <span>{{ '错误消息' }}</span>
        </div>
        <input type="button" class="but-box but-submit" value="注册" />
        <div class="forget-password"><span>忘记密码?</span></div>
      </div>
    </div>
    <div v-if="!isLogin" class="content-box reg-content">
      <div class="box-title">
        <h4>账号注册</h4>
      </div>
      <div class="box-form">
        <div>
          <input
            id=""
            v-model="registerData.email"
            class="input-box"
            type="text"
            placeholder="请输入邮箱"
            name=""
          />
        </div>
        <div>
          <input
            id=""
            v-model="registerData.password"
            class="input-box"
            type="password"
            name=""
            placeholder="请输入密码"
          />
        </div>
        <div>
          <input
            id=""
            v-model="registerData.rePassword"
            class="input-box"
            type="password"
            name=""
            placeholder="请再次输入确认密码"
          />
        </div>
        <div class="verify-box">
          <input
            id=""
            v-model="registerData.verifyCode"
            class="input-box input-verify"
            type="password"
            name=""
            placeholder="请输入验证码"
          />
          <input type="button" />
        </div>
        <div class="error-tip">
          <span>{{ errMsg }}</span>
        </div>
        <input type="button" class="but-box but-submit" value="注册" />
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

  .content-box {
    width: 80vw;
    margin: 0 auto;
    text-align: center;

    .box-title h4 {
      font-size: 2.2rem;
      margin-bottom: 2rem;
      font-weight: inherit;
      font-family: 'HarmonyOS Sans', sans-serif;
    }

    .box-form {
      width: 80vw;
      height: 30vh;

      .input-box {
        width: 30rem;
        height: 3.5rem;
        margin: 0.5rem;
        font-size: 1.4rem;
        font-family: 'JetBrainsMono Bold', sans-serif;
        border: 0.1rem solid #cccccc;
        border-radius: 0.5rem;
        padding-left: 1.5rem;
        color: #333;
      }

      input::-webkit-input-placeholder {
        /* placeholder颜色 */
        color: #cccccc;
        /* placeholder字体大小 */
        font-size: 12px;
      }

      .but-box {
        width: 32rem;
        height: 3.5rem;
        background: #0099ff;
        border: none;
        border-radius: 0.5rem;
        color: #fff;
        font-family: 'HarmonyOS Sans Bold', sans-serif;
      }

      .but-box-click {
        background: rgba(#0099ff, 0.7);
      }

      .but-box:hover {
        background: rgba(#0099ff, 0.7);
      }

      .input-verify {
        width: 12rem;
      }

      .but-verify {
        width: 14rem;
        margin-right: 4rem;
      }

      .error-tip {
        height: 3rem;
        width: 31.5rem;
        line-height: 3rem;
        font-family: 'HarmonyOS Sans Bold', sans-serif;
        font-size: 1.2rem;
        color: red;
        text-align: left;
        margin: 0 auto;
      }

      .forget-password {
        width: 32rem;
        line-height: 3rem;
        margin: 0 auto;
        display: flex;
        justify-content: flex-end;

        span {
          font-size: 1.2rem;
          font-family: 'HarmonyOS Sans Bold', sans-serif;
          cursor: pointer;

          &:hover {
            color: #0099ff;
          }
        }
      }
    }
  }
}
</style>
