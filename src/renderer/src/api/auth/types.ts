/**
 * 验证码响应
 */
export interface VerifyCodeResult {
  /**
   * 验证码
   */
  verifyCode: string
}

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
  rePassword?: string

  /**
   * 验证码
   */
  verifyCode?: string
  /**
   * 图片验证码文本
   */
  imgVerifyCode?: string
  /**
   * 图片验证码token
   */
  verToken?: string

  /**
   * 记住我
   */
  rememberMe: boolean
}

/**
 * 登录响应
 */
export interface LoginResult {
  /**
   * 访问token
   */
  token: string

  /* 图片验证vToken */
  verToken: string

  /*图片*/
  base64Img: string
}
