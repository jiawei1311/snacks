module.exports = {
  /*
  ** Headers of the view
  */
  head: {
    title: 'snacks',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'http://at.alicdn.com/t/font_1427864_wuxfnnr5ajn.css' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  css: [
    // '~static/css/main.css',
  ],
  plugins: [
    /*'@/plugins/muse-ui',*/
    {
      src: '@/plugins/muse-ui',
    }, {
      src: '@/plugins/api',
    },
    { src: '@/plugins/vant', ssr: false },
    {
      src: '@/plugins/YDUI',
      ssr: false
    },
    {
      src: '@/plugins/theme',
      ssr: false
    },
    { src: '~/plugins/vuex-persist', ssr: false },
    { src: '@/plugins/vue-echarts', ssr: false },

  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    transpile: ['vue-echarts', 'resize-detector'],

    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }

  }

}

