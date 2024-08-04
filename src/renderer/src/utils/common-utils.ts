/// @filename: CommonUtils.ts
import router from '@/router/index'
import message from '@/components/message'

/*路由跳转指定地址*/
export function goToRouter(path: string) {
  router.push({ path: path })
}

const HrefTypes = ['local_router', 'online_href'] as const
type HrefType = (typeof HrefTypes)[number]

export function goToHref(type: HrefType, address: string) {
  if (type === 'local_router') {
    router.push({ path: address }).then(() => {})
  } else {
    window.open(address)
  }
}

/* 系统复制命令-clipboard api方式 */
export async function copyToClipboard(text: string): Promise<void> {
  await navigator.clipboard
    .writeText(text)
    .then(() => {
      message.success('成功复制到剪贴板！')
    })
    .catch(() => {
      message.error('无法复制到剪贴板！')
    })
}

/* 将对象转换为FormData */
export function toFormData(params: unknown): FormData {
  const formData = new FormData()
  Object.keys(params).forEach((key) => {
    formData.append(key, params[key])
  })
  return formData
}

/* 获取时间 */
export function getNowTimeOfFormData() {
  const dataTime = new Date().getTime()
  return toFormData({ time: dataTime })
}

/**
 * 这是一个睡眠方法
 * @param ms
 */
export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * VUE随机数范围
 * @param min
 * @param max
 */
export const random = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max + 1 - min))
}

/**
 * VUE去除html标签
 * @param str
 */
export const removeHtmltag = (str: string) => {
  return str.replace(/<[^>]+>/g, '')
}
/**
 * VUE获取url参数
 * @param name
 */
export const getQueryString = (name: string) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const search = window.location.search.split('?')[1] || ''
  const r = search.match(reg) || []
  return r[2]
}
/**
 * VUE动态引入js
 * @param src
 */
export const injectScript = (src: string) => {
  const s = document.createElement('script')
  s.type = 'text/javascript'
  s.async = true
  s.src = src
  const t = document.getElementsByTagName('script')[0]
  t.parentNode?.insertBefore(s, t)
}
/**
 * VUE根据url地址下载
 * @param url
 */
export const download = (url: string) => {
  const isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1
  const isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1
  if (isChrome || isSafari) {
    const link = document.createElement('a')
    link.href = url
    if (link.download !== undefined) {
      const fileName = url.substring(url.lastIndexOf('/') + 1, url.length)
      link.download = fileName
    }
    if (document.createEvent) {
      const e = document.createEvent('MouseEvents')
      e.initEvent('click', true, true)
      link.dispatchEvent(e)
      return true
    }
  }
  if (url.indexOf('?') === -1) {
    url += '?download'
  }
  window.open(url, '_self')
  return true
}
/**
 * VUE判断el是否包含某个class
 * @param el
 * @param className
 */
export const hasClass = (el: Element, className: string) => {
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
/**
 * VUE添加el某个class
 * @param el
 * @param className
 */
export const addClass = (el: Element, className: string) => {
  if (hasClass(el, className)) {
    return
  }
  const newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}
/**
 * VUE去除el某个class
 * @param el
 * @param className
 */
export const removeClass = (el: Element, className: string) => {
  if (!hasClass(el, className)) {
    return
  }
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')
  el.className = el.className.replace(reg, ' ')
}

/**
 * VUE滚动到顶部
 */
export const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, c - c / 8)
  }
}
/**
 * VUE判断el是否在视口范围内
 * @param el
 * @param partiallyVisible
 */
export const elementIsVisibleInViewport = (el: Element, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect()
  const { innerHeight, innerWidth } = window
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth
}
/**
 * VUE洗牌算法随机
 * @param arr
 */
export const shuffle = (arr: []) => {
  // eslint-disable-next-line prefer-const
  let result = []
  let random: number
  while (arr.length > 0) {
    random = Math.floor(Math.random() * arr.length)
    result.push(arr[random])
    arr.splice(random, 1)
  }
  return result
}
/**
 * VUE拦截粘贴板
 * @param value
 */
export const copyTextToClipboard = (value: string) => {
  const textArea = document.createElement('textarea')
  textArea.style.background = 'transparent'
  textArea.value = value
  document.body.appendChild(textArea)
  textArea.select()
  try {
    // const successful = document.execCommand('copy')
  } catch (err) {
    console.log('Oops, unable to copy')
  }
  document.body.removeChild(textArea)
}
/**
 * VUE严格的身份证校验
 * @param sId
 */
export const isCardID = (sId: string) => {
  if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
    console.log('你输入的身份证长度或格式错误')
    return false
  }
  //身份证城市
  const aCity: object = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
  }
  if (!aCity[parseInt(sId.substr(0, 2))]) {
    console.log('你的身份证地区非法')
    return false
  }

  // 出生日期验证
  const sBirthday = (sId.substr(6, 4) + '-' + Number(sId.substr(10, 2)) + '-' + Number(sId.substr(12, 2))).replace(
      /-/g,
      '/'
    ),
    d = new Date(sBirthday)
  if (sBirthday != d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate()) {
    console.log('身份证上的出生日期非法')
    return false
  }

  // 身份证号码校验
  let sum = 0
  const weights: number[] = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const codes = '10X98765432'
  const ids: string[] = sId.split('')
  for (let i = 0; i < ids.length - 1; i++) {
    sum += parseInt(ids[i]) * weights[i]
  }
  const last = codes[sum % 11] //计算出来的最后一位身份证号码
  if (sId[sId.length - 1] != last) {
    console.log('你输入的身份证号非法')
    return false
  }
  return true
}

/**
 * VUE将阿拉伯数字翻译成中文的大写数字
 * @param money
 */
export const numberToChinese = (money: number) => {
  const cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'] //汉字的数字
  const cnIntRadice = ['', '拾', '佰', '仟'] //基本单位
  const cnIntUnits = ['', '万', '亿', '兆'] //对应整数部分扩展单位
  const cnDecUnits = ['角', '分', '毫', '厘'] //对应小数部分单位
  let cnIntLast = '元' //整型完以后的单位
  // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
  const maxNum = 999999999999999.99 //最大处理的数字
  let IntegerNum: string = '' //金额整数部分
  let DecimalNum: string = '' //金额小数部分
  let ChineseStr = '' //输出的中文金额字符串
  let parts: string[] = ['', ''] //分离金额后用的数组，预定义
  let zeroCount, IntLen, n, p, q, m, decLen
  if (money == undefined) {
    return ''
  }
  if (money >= maxNum) {
    return '超出最大处理数字'
  }
  if (money == 0) {
    ChineseStr = cnNums[0] + cnIntLast
    return ChineseStr
  }
  if (money.toString().indexOf('.') == -1) {
    IntegerNum = money.toString()
    DecimalNum = ''
    cnIntLast = '元整'
  } else {
    parts = money.toString().split('.')
    IntegerNum = parts[0]
    DecimalNum = parts[1].substr(0, 2)
  }
  if (parseInt(IntegerNum, 10) > 0) {
    //获取整型部分转换
    zeroCount = 0
    IntLen = IntegerNum.length
    for (let i = 0; i < IntLen; i++) {
      n = IntegerNum.substr(i, 1)
      p = IntLen - i - 1
      q = p / 4
      m = p % 4
      if (n == '0') {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          ChineseStr += cnNums[0]
        }
        zeroCount = 0 //归零
        ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
      }
      if (m == 0 && zeroCount < 4) {
        ChineseStr += cnIntUnits[q]
      }
    }
    ChineseStr += cnIntLast
    //整型部分处理完毕
  }
  if (DecimalNum != '') {
    //小数部分
    decLen = DecimalNum.length
    for (let i = 0; i < decLen; i++) {
      n = DecimalNum.substr(i, 1)
      if (n != '0') {
        ChineseStr += cnNums[Number(n)] + cnDecUnits[i]
      }
    }
  }
  if (ChineseStr == '') {
    ChineseStr += cnNums[0] + cnIntLast
  }
  return ChineseStr
}
