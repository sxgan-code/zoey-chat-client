import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index.ts'
import tips from '@/components/tips/tooltip.ts'
// import loading from '@/components/loading/loading.ts'
import 'element-plus/dist/index.css'
import '@/assets/css/common.scss'
import 'virtual:svg-icons-register'
import '@/components/message/style.scss'

const app = createApp(App)
app.use(router)
app.use(tips)
// app.use(loading)
app.mount('#app')
