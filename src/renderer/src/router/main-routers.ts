import { RouteRecordRaw } from 'vue-router'

const mainRouters: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    redirect: '/signin'
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('@/views/AuthPage.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/MainPage.vue')
  }
]
export default mainRouters
