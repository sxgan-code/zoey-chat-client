/**
 * @Description: 公共校验工具
 * @Author: sxgan
 * @Date: 2024/3/2 20:04
 * @Version: 1.0
 **/

/**
 * 检查字符串是否为所传类型，当类型正确返回true
 * @param str
 * @param type
 */
const VerifyTypeTypes = [
  'phone',
  'tel',
  'card',
  'pwd',
  'postal',
  'QQ',
  'email',
  'money',
  'URL',
  'IP',
  'date',
  'number',
  'english',
  'chinese',
  'lower',
  'upper',
  'HTML'
] as const
type VerifyType = (typeof VerifyTypeTypes)[number]
export const checkAndReturnMsg = (str: string, type: VerifyType): string => {
  switch (type) {
    case 'phone': //手机号码
      if (str == null || str.length == 0) {
        return '请输入手机号码'
      }
      if (!/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str)) {
        return '请输入正确的手机号码'
      }
      return ''
    case 'tel': //座机
      if (str == null || str.length == 0) {
        return '请输入座机号码'
      }
      if (!/^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str)) {
        return '请输入正确的手机号码'
      }
      return ''
    case 'card': //身份证
      if (str == null || str.length == 0) {
        return '请输入身份证'
      }
      if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str)) {
        return '请输入正确的身份证号'
      }
      return ''
    case 'pwd': //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
      if (str == null || str.length == 0) {
        return '请输入密码'
      }
      if (!/^[a-zA-Z]\w{5,17}$/.test(str)) {
        return '密码须字母开头长度为6~18的字母、数字或下划线'
      }
      return ''
    case 'postal': //邮政编码
      if (str == null || str.length == 0) {
        return '请输入邮政编码'
      }
      if (!/[1-9]\d{5}(?!\d)/.test(str)) {
        return '邮政编码格式不正确'
      }
      return ''
    case 'QQ': //QQ号
      if (str == null || str.length == 0) {
        return '请输入QQ号'
      }
      if (!/^[1-9][0-9]{4,9}$/.test(str)) {
        return 'QQ号格式不正确'
      }
      return ''
    case 'email': //邮箱
      console.log('email')
      if (str == null || str.length == 0) {
        return '请输入邮箱'
      }
      if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str)) {
        return '邮箱格式不正确'
      }
      return ''
    case 'money': //金额(小数点2位)
      if (str == null || str.length == 0) {
        return '请输入金额'
      }
      if (!/^\d*(?:\.\d{0,2})?$/.test(str)) {
        return '金额格式不正确'
      }
      return ''
    case 'date': //日期时间
      if (str == null || str.length == 0) {
        return '请输入日期时间'
      }
      if (
        /^(\d{4})-(\d{2})-(\d{2}) (\d{2})(?::\d{2}|:(\d{2}):(\d{2}))$/.test(str) ||
        /^(\d{4})-(\d{2})-(\d{2})$/.test(str)
      ) {
        return '日期格式不正确'
      }
      return ''
    case 'number': //数字
      if (str == null || str.length == 0) {
        return '请输入数字'
      }
      if (!/^[0-9]$/.test(str)) {
        return '数字格式不正确'
      }
      return ''
    case 'english': //英文
      if (str == null || str.length == 0) {
        return '请输入英文'
      }
      if (!/^[a-zA-Z]+$/.test(str)) {
        return '请输入正确的英文'
      }
      return ''
    case 'chinese': //中文
      if (str == null || str.length == 0) {
        return '请输入中文'
      }
      if (!/^[\u4E00-\u9FA5]+$/.test(str)) {
        return '请输入正确的中文'
      }
      return ''
    case 'lower': //小写
      if (str == null || str.length == 0) {
        return '请输入小写'
      }
      if (!/^[a-z]+$/.test(str)) {
        return '请输入正确的小写'
      }
      return ''
    case 'upper': //大写
      if (str == null || str.length == 0) {
        return '请输入大写'
      }
      if (!/^[A-Z]+$/.test(str)) {
        return '请输入正确的大写'
      }
      return ''
    case 'HTML': //HTML标记
      if (str == null || str.length == 0) {
        return '请输入HTML标记'
      }
      if (!/<("[^"]*"|'[^']*'|[^'">])*>/.test(str)) {
        return '请输入正确的HTML标记'
      }
      return ''
    default:
      return ''
  }
}
/**
 * VUE验证邮箱
 * @param s
 */
export const isEmail = (s: string) => {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}
/**
 * VUE验证手机号码
 * @param s
 */
export const isMobile = (s: string) => {
  return /^1[0-9]{10}$/.test(s)
}
/**
 * VUE验证电话号码
 * @param s
 */
export const isPhone = (s: string) => {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}
/**
 * VUE验证是否url地址
 * @param s
 */
export const isURL = (s: string) => {
  return /^http[s]?:\/\/.*/.test(s)
}
/**
 * VUE验证是否字符串
 * @param o
 */
export const isString = (o: string) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'String'
}
/**
 * VUE验证是否数字
 * @param o
 */
export const isNumber = (o: string) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Number'
}
/**
 * VUE验证是否boolean
 * @param o
 */
export const isBoolean = (o: string) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
}
/**
 * VUE验证是否函数
 * @param o
 */
export const isFunction = (o: string) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
}
/**
 * VUE验证是否为null
 * @param o
 */
export const isNull = (o: string) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Null'
}
/**
 * VUE验证是否undefined
 * @param o
 */
export const isUndefined = (o: string) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined'
}
/**
 * VUE验证是否对象
 * @param o
 */
export const isObj = (o: string) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
}
/**
 * VUE验证是否数组
 * @param o
 */
export const isArray = (o: string) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
}
/**
 * VUE验证是否时间
 * @param o
 */
export const isDate = (o: string) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Date'
}
/**
 * VUE验证是否正则
 * @param o
 */
export const isRegExp = (o: string) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'RegExp'
}
/**
 * VUE判断是否错误对象
 * @param o
 */
export const isError = (o: string) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Error'
}
/**
 * VUE判断是否Symbol函数
 * @param o
 */
export const isSymbol = (o: string) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Symbol'
}
/**
 * VUE判断是否Promise对象
 * @param o
 */
export const isPromise = (o: string) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Promise'
}
/**
 * VUE判断是否Set对象
 * @param o
 */
export const isSet = (o: string) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Set'
}
export const ua = navigator.userAgent.toLowerCase()
/**
 * VUE判断是否是移动端
 */
export const isDeviceMobile = () => {
  return /android|webos|iphone|ipod|balckberry/i.test(ua)
}
/**
 * VUE判断是否是QQ浏览器
 */
export const isQQBrowser = () => {
  return !!ua.match(/mqqbrowser|qzone|qqbrowser|qbwebviewtype/i)
}
/**
 * VUE判断是否是爬虫
 */
export const isSpider = () => {
  return /adsbot|googlebot|bingbot|msnbot|yandexbot|baidubot|robot|careerbot|seznambot|bot|baiduspider|jikespider|symantecspider|scannerlwebcrawler|crawler|360spider|sosospider|sogou web sprider|sogou orion spider/.test(
    ua
  )
}
/**
 * VUE判断是否ios
 */
export const isIos = () => {
  const u = navigator.userAgent
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    //安卓手机
    return false
  } else if (u.indexOf('iPhone') > -1) {
    //苹果手机
    return true
  } else if (u.indexOf('iPad') > -1) {
    //iPad
    return false
  } else if (u.indexOf('Windows Phone') > -1) {
    //winphone手机
    return false
  } else {
    return false
  }
}
/**
 * VUE判断是否为PC端
 */
export const isPC = () => {
  const userAgentInfo = navigator.userAgent
  const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
  let flag = true
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      return ''
    }
  }
  return flag
}
