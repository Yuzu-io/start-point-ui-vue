import { createApp } from 'vue'

import App from './App.vue'
import router from './plugins/router'
import pinia from './plugins/stores/index'
import i18n from './locales/index'

/**
 * 工具
 */

/**
 * 样式
 */
import './styles/reset.css' // 初始化
import './styles/global.scss' // 全局样式
import 'nprogress/nprogress.css' // 进度条

/**
 * 核心
 */
import './permission'

const app = createApp(App)

app.use(pinia)
app.use(i18n)
app.use(router)
app.mount('#app')

export default app
