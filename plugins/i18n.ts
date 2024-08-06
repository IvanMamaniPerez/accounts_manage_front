import { createI18n } from 'vue-i18n'

export default defineNuxtPlugin(({ vueApp } : any) => {
  const i18n = createI18n({
    legacy: true,
    globalInjection: true,
    locale: 'es',
    messages: {
      en: {
        hello: 'Hello asdfadsf, {name}!'
      },
      es: {
        hello: '¡Hola werwe, {name}!'
      }
    }
  })

  vueApp.use(i18n)
})