// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', 'nuxt-lucide-icons', '@nuxt/image', '@nuxtjs/seo'],
  css: [
    '~/assets/css/style.css'
  ],
  build: { 
    transpile: ["shiki"],
  },
  plugins: [
    "~/plugins/mfm.js",
    "~/plugins/daysjs.js",
  ],
    alias: {
        'bi': 'bootstrap-icons/icons',
    },
  routeRules: {
    '/admin/**': { ssr: false },
    '/': { ssr: true, prerender: true },
    '/tags/**': { isr: 300 },
    '/blog/**': { isr: 300 },
  },

  compatibilityDate: '2024-09-24',

  app: {
    head: {
      bodyAttrs: {
        class: 'bg-gray-100'
      },
      htmlAttrs: {
        lang: 'ja',
        prefix: 'og: http://ogp.me/ns#'
      },
      titleTemplate: '%s - ' + 'ここあのひとりごと',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'プロフィールが載ってたりブログを書いてたりする場所' || '' },
        { hid: 'keywords', name: 'keywords', content: 'blog,AmaseCocoa,ここあのひとりごと,甘瀬ここあ' },
  
        { hid: 'og:site_name', property: 'og:site_name', content: 'ここあのひとりごと' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:url', property: 'og:url', content: 'https://amase.xyz' },
        { hid: 'og:title', property: 'og:title', content: 'UNKNOWN' },
        { hid: 'og:description', property: 'og:description', content: 'この表示はウェブサイトが正しく構成されていない場合のみ表示されます :3' },
  
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },  
      ],
    }
  },
  content: {
    highlight: {
      theme: 'tokyo-night',
      preload: ['diff', 'ts', 'js', 'css', 'python', 'yaml', 'json', 'bash', 'vue', 'vue-html'],
    }
  },
})