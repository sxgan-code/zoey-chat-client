<script setup lang="ts">
import { LoginData } from '@/api/auth/types.ts'
import { ref } from 'vue'
import ZoeyButton from '@/components/btn/ZoeyButton.vue'
import { checkAndReturnMsg } from '@/utils/verify-utils.ts'
import { sendMailVerifyCode, signupApi } from '@/api/auth'
import message from '@/components/message/index.ts'

/**
 * 公共变量和方法
 */
const errorMsg = ref('')
const signupData = ref<LoginData>({
  email: 'sxgan@foxmail.com',
  password: '',
  rePassword: '',
  verifyCode: '',
  imgVerifyCode: '',
  rememberMe: false,
  verToken: ''
})
const verifyForm = () => {
  console.log(signupData.value)
  const emailVerify = checkAndReturnMsg(signupData.value.email, 'email')
  console.log(emailVerify)
  const pwdVerify = checkAndReturnMsg(signupData.value.password, 'pwd')
  if (emailVerify != '') {
    errorMsg.value = emailVerify
  } else if (pwdVerify != '') {
    errorMsg.value = pwdVerify
  } else if (signupData.value.password != signupData.value.rePassword) {
    errorMsg.value = '两次密码不一致'
  } else if (signupData.value.verifyCode == '') {
    errorMsg.value = '请输入验证码'
  }
}
/**
 * 发送邮箱验证码
 */
const btnVal = ref('获取验证码')
const verifyBtnBool = ref(false)
const getEmailVerify = async () => {
  const msg = checkAndReturnMsg(signupData.value.email, 'email')
  if (msg === '') {
    errorMsg.value = ''
    // 生成一个时间
    let time = 60
    // 生成一个自动计时的函数
    const t = setInterval(() => {
      // time 自减
      if (time > 0) {
        // 先减少，在做其他的事情，不然，等待一秒，加上网络延迟，效果不好
        verifyBtnBool.value = true
        --time
        btnVal.value = `${time}秒后再获取`
      } else {
        // 清除函数
        verifyBtnBool.value = false
        clearInterval(t)
        btnVal.value = '获取验证码'
      }
    }, 1000)

    sendMailVerifyCode(signupData.value)
      .then((res) => {
        if (res.status == 200) {
          message.success('验证码发送成功')
          console.log(res)
        } else {
          errorMsg.value = res.message
        }
      })
      .catch((err) => {
        message.error('服务器错误，请稍后再试')
        console.log(err)
      })
  } else {
    errorMsg.value = msg
    return false
  }
}
const toSignup = () => {
  verifyForm()
  if (errorMsg.value == '') {
    signupApi(signupData.value)
      .then((res) => {
        console.log(res)
        // loading.value = false
        message.success('注册成功，请登录')
        // isRegister.value = false
      })
      .catch((err) => {
        console.log(err)
        // loading.value = false
        message.error('系统错误')
      })
  }
}
</script>

<template>
  <div class="content-box reg-content">
    <div class="box-title">
      <h4>账号注册</h4>
    </div>
    <div class="box-form">
      <div>
        <input
          id=""
          v-model="signupData.email"
          class="input-box"
          type="text"
          placeholder="请输入邮箱"
          name=""
          @input="
            checkAndReturnMsg(signupData.email, 'email') == ''
              ? (errorMsg = '')
              : (errorMsg = checkAndReturnMsg(signupData.email, 'email'))
          "
        />
      </div>
      <div>
        <input
          id=""
          v-model="signupData.password"
          class="input-box"
          type="password"
          name=""
          placeholder="请输入密码"
          @input="
            checkAndReturnMsg(signupData.password, 'pwd') == ''
              ? (errorMsg = '')
              : (errorMsg = checkAndReturnMsg(signupData.password, 'pwd'))
          "
        />
      </div>
      <div>
        <input
          id=""
          v-model="signupData.rePassword"
          class="input-box"
          type="password"
          name=""
          placeholder="请再次输入确认密码"
          @input="signupData.password == signupData.rePassword ? (errorMsg = '') : (errorMsg = '两次密码不一致')"
        />
      </div>
      <div class="verify-box">
        <input
          id=""
          v-model="signupData.verifyCode"
          class="input-box input-verify"
          type="text"
          name=""
          placeholder="请输入验证码"
        />
        <zoey-button
          v-tip="{ text: '点击发送邮箱验证码', bg: 'black' }"
          class="but-verify"
          :disabled="verifyBtnBool"
          type="primary"
          @click="getEmailVerify"
        >
          {{ btnVal }}
        </zoey-button>
      </div>
      <div class="error-tip">
        <span>{{ errorMsg }}</span>
      </div>
      <zoey-button type="primary" size="large" class="but-box but-submit" @click="toSignup">注册</zoey-button>
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
      width: 32.5rem;
      margin: 0 auto;
      display: flex;

      .input-verify {
        width: 12rem;
      }

      .but-verify {
        margin: 0.5rem 2rem;
        width: 12rem;
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
