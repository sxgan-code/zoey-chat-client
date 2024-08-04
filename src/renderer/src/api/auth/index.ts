import request from '@/utils/http.ts'
import { LoginData, LoginResult, VerifyCodeResult } from '@/api/auth/types.ts'
import { ResponseResult } from '@/api/common-types.ts'

/**
 * @description 获取邮箱验证码
 * @param data
 */
export function sendMailVerifyCode(data: LoginData): Promise<ResponseResult<VerifyCodeResult>> {
  const requestJsonData = JSON.stringify(data)
  return request({
    url: '/auth/mailVerifyCode',
    method: 'post',
    data: requestJsonData,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}

/**
 * 注册API
 *
 * @param data {LoginData}
 * @returns
 */
export function signupApi(data: LoginData): Promise<ResponseResult<LoginResult>> {
  const requestJsonData = JSON.stringify(data)
  const formData = new FormData()
  formData.append('username', data.email)
  formData.append('password', data.password)
  formData.append('verifyCode', data.verifyCode || '')
  return request({
    url: '/auth/signup',
    method: 'post',
    data: requestJsonData,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}

/**
 * 获取图片验证码
 *
 * @returns 校验图片
 */
export function verifyCodeImgApi(): Promise<ResponseResult<LoginResult>> {
  return request({
    url: '/auth/imgVerifyCode',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}

/**
 * 登录API
 *
 * @param data {LoginData}
 * @returns
 */
export function signinApi(data: LoginData): Promise<ResponseResult<LoginResult>> {
  const requestJsonData = JSON.stringify(data)
  const formData = new FormData()
  formData.append('username', data.email)
  formData.append('password', data.password)
  return request({
    url: '/auth/signin',
    method: 'post',
    data: requestJsonData,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
