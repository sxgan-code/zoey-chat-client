import { createApp } from 'vue'

//含有loding样式的组件
import loadingOne from './index.vue'

//存储每个元素的loading状态
const map = new WeakMap()

const createAndShowLoadingAnimation = (container: HTMLElement) => {
  const loadingDivInstance = createApp(loadingOne)
  loadingDivInstance.mount(container)
  container.style.display = 'block'
}

const hideLoadingAnimation = (container: HTMLElement) => {
  container.style.display = 'none'
}

//自定义指令
export const vLoading = {
  mounted(el: HTMLElement, binding: unknown) {
    //创建一个div容器并添加到使用指令的元素中
    const loadingDivContainer = document.createElement('div')
    loadingDivContainer.className = 'loading-container'
    loadingDivContainer.style.display = 'none'
    loadingDivContainer.style.margin = '0 auto'
    loadingDivContainer.style.marginTop = '100px'
    el.appendChild(loadingDivContainer)

    //根据传入的值决定是否显示loading动画
    if (binding.value) {
      createAndShowLoadingAnimation(loadingDivContainer)
    }

    //将元素和loading状态存储到map中
    map.set(el, { loadingDivContainer, value: binding.value })
  },

  updated(el: HTMLElement, binding: unknown) {
    //获取元素的loading状态
    const { loadingDivContainer, value: oldValue } = map.get(el) || {}

    //如果传入的值和之前的值不一样，则更新loading状态
    if (binding.value !== oldValue) {
      if (binding.value) {
        createAndShowLoadingAnimation(loadingDivContainer)
      } else {
        hideLoadingAnimation(loadingDivContainer)
      }
      map.set(el, { loadingDivContainer, value: binding.value })
    }
  },

  unmounted(el: HTMLElement) {
    const { loadingDivContainer } = map.get(el) || {}
    if (loadingDivContainer) {
      hideLoadingAnimation(loadingDivContainer)
      map.delete(el)
    }
  }
}
