import { createI18n } from 'vue-i18n'
import mZhLocale from './lang/zh'
import mEnLocale from './lang/en'

// 创建message数据源
const messages = {
  en: {
    msg: {
      ...mEnLocale
    }
  },
  zh: {
    msg: {
      ...mZhLocale
    }
  }
}

// 创建locale语言变量
const locale = 'en'

// 初始化i18n实例
const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale,
  messages
})

export default i18n
