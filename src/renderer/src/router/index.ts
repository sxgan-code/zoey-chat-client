import mainRouters from '@/router/main-routers.ts'
import { createRouter, createWebHashHistory, Router } from 'vue-router'

const router: Router = createRouter({
  // Electron中路由方式必须使用Hash方式
  history: createWebHashHistory(),
  routes: [...mainRouters]
})
export default router
