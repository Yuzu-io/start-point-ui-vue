import type { LangList, Recordable } from '@/types/lang'
import { computed } from 'vue'
import { createI18n } from 'vue-i18n'

// 导入语言文件
const langModules = import.meta.glob('./lang/*/index.ts', { eager: true })

const langModuleMap = new Map<string, Object>()

export const langCode: Array<string> = []

export const langKey: string = 'start-point-lang'

// 生成语言模块列表
const generateLangModuleMap = () => {
  const fullPaths = Object.keys(langModules)
  fullPaths.forEach((fullPath: string) => {
    const k = fullPath.replace('./lang', '')
    const startIndex = 1
    const lastIndex = k.lastIndexOf('/')
    const code = k.substring(startIndex, lastIndex)
    langCode.push(code)
    langModuleMap.set(code, langModules[fullPath]!)
  })
}

// 导出 Message
const importMessages = computed(() => {
  generateLangModuleMap()

  const message: Recordable = {}
  langModuleMap.forEach((value: any, key) => {
    message[key] = value.default
  })
  return message
})

export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem(langKey) || 'zh_CN',
  fallbackLocale: 'zh_CN',
  messages: importMessages.value,
  globalInjection: true
})

// 语言列表
export const langList = computed(() => {
  if (langModuleMap.size === 0) generateLangModuleMap()

  const list: LangList[] = []
  langModuleMap.forEach((value: any, key) => {
    list.push({
      content: value.default.lang,
      value: key
    })
  })

  return list
})

export const { t } = i18n.global

export default i18n
