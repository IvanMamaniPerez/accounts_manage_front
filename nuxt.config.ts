// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typeCheck: true,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/tailwindcss", "@nuxtjs/i18n", "nuxt-fortify"],
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
  nuxtFortify: {
    baseUrl: 'http://localhost:80',
    origin: 'http://localhost:3000',
    authMode: 'cookie',
    authHome: '/',
    cookieKey: 'XSRF-TOKEN',
    cookieHeader: 'X-XSRF-TOKEN',
    endpoints: {
      csrf: '/sanctum/csrf-cookie',
      user: '/api/user',
      login:'/api/login',
      // other endpoints...
    },
    features: {
        registration: true,
        resetPasswords: true,
        twoFactorAuthentication: true,
      // other features...
    }
    // other configurations...
  }
})

// SECTION[epic=configuration]: Code added for solution the issue exporting the function
// REVIEW: Review its added for fix the issue exporting the function
function defineNuxtConfig(configs: any) {
  return configs
}
//!SECTION