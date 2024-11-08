export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'shadcn-nuxt'
  ],
  shadcn: {
    prefix: 'Ui',
    componentDir: './components/ui'
  },
  css: ['~/assets/css/global.css'],
  colorMode: {
    classSuffix: ''
  },
  tailwindcss: {
    config: {
      darkMode: 'class',
    }
  }
})