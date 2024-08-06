import { createI18n } from 'vue-i18n'
import en from '../lang/en.json'
import es from '../lang/es.json'


export default defineNuxtPlugin(({ vueApp } : any) => {
  const i18n = createI18n({
    legacy: true,
    globalInjection: true,
    locale: 'es',
    messages: {
      en,
      es
    }
  })

  vueApp.use(i18n)
})