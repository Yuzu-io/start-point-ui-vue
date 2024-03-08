import { createApp } from 'vue'

import App from './App.vue'
import router from './plugins/router'
import pinia from './plugins/stores/index'
import i18n from './locales/index'

/**
 * 工具
 */

import MDIcon, { config as MDIconConfig } from './plugins/md-icon/index' // @mdi/font mdi-vue/v3 @mdi/js

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

app.use(MDIcon, { icons: MDIconConfig })

app.use(pinia)
app.use(i18n)
app.use(router)
app.mount('#app')
