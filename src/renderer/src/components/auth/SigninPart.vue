<script setup lang="ts">
import { LoginData } from '@/api/auth/types.ts'
import { onMounted, ref } from 'vue'
import { signinApi, verifyCodeImgApi } from '@/api/auth'
import ZoeyButton from '@/components/btn/ZoeyButton.vue'
import { checkAndReturnMsg } from '@/utils/verify-utils.ts'
import message from '@/components/message'
import { goToHref } from '@/utils/common-utils.ts'

/**
 * 公共变量及方法
 */
const isLoading = defineModel<boolean>()
const errorMsg = ref('')
const signinData = ref<LoginData>({
  email: 'sxgan@foxmail.com',
  password: 'sxgan123',
  rePassword: '',
  verifyCode: '',
  imgVerifyCode: '',
  rememberMe: false,
  verToken: ''
})
const verifyForm = () => {
  const emailVerify = checkAndReturnMsg(signinData.value.email, 'email')
  const pwdVerify = checkAndReturnMsg(signinData.value.password, 'pwd')
  if (emailVerify != '') {
    errorMsg.value = emailVerify
  } else if (pwdVerify != '') {
    errorMsg.value = pwdVerify
  } else if (signinData.value.imgVerifyCode == '') {
    errorMsg.value = '请输入图片验证码'
  }
}
/**
 * 当点击登录验证码图片
 * */
const verifyImg = ref()
const getVerifyCodeImg = () => {
  verifyCodeImgApi().then((res) => {
    console.log(res)
    verifyImg.value.src = res.data.base64Img
    signinData.value.verToken = res.data.verToken
  })
}
/**
 * 点击登录按钮
 */
const toSignin = () => {
  verifyForm()
  if (errorMsg.value == '') {
    // 表单所有元素验证通过，可以提交了
    console.log('登录', signinData.value)
    isLoading.value = true
    signinApi(signinData.value)
      .then((res) => {
        isLoading.value = false
        if (res.status === 200) {
          console.log(res.data.token)
          // loading.value = false
          localStorage.setItem('token', res.data.token)
          goToHref('local_router', '/main')

          message.success('登录成功')
        } else {
          message.error(res.message)
        }
      })
      .catch((err) => {
        isLoading.value = false
        message.error('系统错误')
        goToHref('local_router', '/main')
      })
  }
}
onMounted(() => {
  getVerifyCodeImg()
})
</script>

<template>
  <div class="content-box login-content">
    <div class="box-title">
      <h4>账号登录</h4>
    </div>
    <div class="box-form">
      <div>
        <input
          id=""
          v-model="signinData.email"
          class="input-box"
          type="text"
          name=""
          placeholder="请输入邮箱"
          @input="
            checkAndReturnMsg(signinData.email, 'email') == ''
              ? (errorMsg = '')
              : (errorMsg = checkAndReturnMsg(signinData.email, 'email'))
          "
        />
      </div>
      <div>
        <input
          id=""
          v-model="signinData.password"
          class="input-box"
          type="password"
          name=""
          data="passworedtype"
          placeholder="请输入密码"
          @input="
            checkAndReturnMsg(signinData.password, 'pwd') == ''
              ? (errorMsg = '')
              : (errorMsg = checkAndReturnMsg(signinData.password, 'pwd'))
          "
        />
      </div>
      <div class="verify-box">
        <input
          id=""
          v-model="signinData.imgVerifyCode"
          class="input-box input-verify"
          type="password"
          name=""
          placeholder="请输入图片验证码"
        />
        <div class="img-verify">
          <img
            ref="verifyImg"
            v-tip="{ text: '点击刷新', bg: 'black' }"
            width="120"
            style="margin-left: 2.5rem"
            height="35"
            alt=""
            src=""
            @click="getVerifyCodeImg"
          />
        </div>
      </div>
      <div class="error-tip">
        <span>{{ errorMsg }}</span>
      </div>
      <zoey-button type="primary" size="large" class="but-box but-submit" @click="toSignin">登录</zoey-button>
      <div class="forget-password"><span>忘记密码?</span></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
      margin: 0 auto;
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

    .verify-box {
      display: flex;
      width: 32.5rem;
      margin: 0 auto;

      .input-verify {
        width: 14rem;
      }

      .img-verify {
        cursor: pointer;
        margin-top: 0.5rem;
      }
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
</style>
