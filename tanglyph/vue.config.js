module.exports = {
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      title: 'Tanglyph',
    },
  },

  transpileDependencies: [
    'vuetify'
  ],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
      enableBridge: false
    }
  }
}
