import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { i18n, langCode, langKey, langList } from '@/locales/index'

export function useLocale() {
  const { locale } = useI18n({ useScope: 'global' })
  function cutoverLang(lang: string) {
    // 如果切换的语言不在对应语言文件里则默认为简体中文
    if (!langCode.includes(lang)) {
      lang = 'zh_CN'
    }

    locale.value = lang
    localStorage.setItem(langKey, lang)
  }

  const getLocale = computed(() => {
    return i18n.global.getLocaleMessage(locale.value).langConfig
  })

  return {
    cutoverLang,
    getLocale,
    locale
  }
}

export { langList }
