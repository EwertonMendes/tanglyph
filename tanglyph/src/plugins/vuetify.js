import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        primary: "#44CF6C",
        secondary: "#A9FDAC",
        appBar: "#FFFFFF",
        background: "#f5f5f5",
      },
      dark: {
        primary: "#44CF6C",
        secondary: "#A9FDAC",
        appBar: "#272727",
        background: "#121212",
      },
    },
  },
});
