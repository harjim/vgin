import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

const messages = {
  en,
  zh
}
const language = (navigator.language || 'en').toLocaleLowerCase()

const i18n = createI18n({
  locale:
    localStorage.getItem('APP_LOCALE') || import.meta.env.APP_LOCALE || language.split('-')[0],
  fallbackLocale: 'zh',
  messages
})

export default i18n
