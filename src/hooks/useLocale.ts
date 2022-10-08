export const useLocale = () => {
  const i18n = useI18n()

  const currentLocale = computed(() => {
    return i18n.locale.value
  })

  const changeLocale = (val: string) => {
    i18n.locale.value = val
    localStorage.setItem('APP_LOCALE', val)
  }

  return {
    currentLocale,
    changeLocale
  }
}
