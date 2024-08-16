// https://nuxt.com/docs/api/configuration/nuxt-config
import type { FetchContext } from 'ofetch'
import type { ConsolaInstance } from 'consola'
import type { NuxtApp } from '#app'

export default defineNuxtConfig({
  typeCheck: true,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "nuxt-auth-sanctum",
    "nuxt-typed-router"
  ],
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            primaryGray: '#0A0C0D', // Principal oscuro
            lightGray: '#D9D9D9', // Gris claro
            mediumGray: '#BFBFBF',
            darkGray: '#737373',
            hardGray: '#262626',   // Gris muy oscuro
          }
        }
      },
      content: [
        './src/**/**.{vue,js,ts,jsx,tsx}',
      ]
    }
  },
  sanctum: {
    baseUrl: 'http://localhost:80', // Laravel API
    mode: 'token',
    redirectIfAuthenticated: true,
    endpoints: {
      login: "/api/login",
      logout: '/api/logout',
    },
    redirect: {
      onLogin: '/',
      onAuthOnly: '/auth/login',
    },
    globalMiddleware: {
      enabled: true,
      allow404WithoutAuth: false,
    },
  },
})

// SECTION[epic=configuration]: Code added for solution the issue exporting the function
// REVIEW: Review its added for fix the issue exporting the function
function defineNuxtConfig(configs: any) {
  return configs
}
//!SECTION