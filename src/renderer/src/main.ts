import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from '@/router/index.ts'

import 'element-plus/dist/index.css'
import '@/assets/css/common.scss'
import 'virtual:svg-icons-register'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)

app.mount('#app')
