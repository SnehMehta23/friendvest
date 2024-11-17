export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'shadcn-nuxt',
    '@nuxtjs/supabase'
  ],
  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/dashboard',
      exclude: ['*'], // This tells Supabase to not handle any routes automatically
    }
  },
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