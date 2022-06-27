import { createApp } from 'vue'
// i18n （PS：导入放到 APP.vue 导入之前，因为后面我们会在 app.vue 中使用国际化内容）
import i18n from '@/i18n'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 初始化样式表
import '@/styles/index.scss'
// 导入svgIcon
import installIcons from '@/icons'
// 导入路由鉴权
import './permission'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
installElementPlus(app)
installIcons(app)
app.use(store).use(router).use(i18n).mount('#app')
