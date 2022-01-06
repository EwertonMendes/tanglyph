import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const locales = require.context("./locales", true, /[A-Za-z0-9-_,\s]+\.json$/i);

const userNavigatorLanguage = navigator.language.split("-")[0];

const isNavigatorLanguageValid = locales.keys().some((key) => {
  if(key.includes(userNavigatorLanguage)) {
   return true
  }
  return false
});


function loadLocaleMessages() {
  const messages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

export default new VueI18n({
  locale: isNavigatorLanguageValid ? userNavigatorLanguage : "en",
  fallbackLocale: isNavigatorLanguageValid ? userNavigatorLanguage : "en",
  messages: loadLocaleMessages(),
});
