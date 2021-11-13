<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <Header></Header>
    <v-main>
      <v-flex ma-5>
        <!-- toast -->
        <vtoast ref="vtoast" />
        <FontSelectionPage></FontSelectionPage>
      </v-flex>
    </v-main>
    <cookie-advisor></cookie-advisor>
  </v-app>
</template>

<script>
import Header from "./components/layout/AppHeader";
import CookieAdvisor from "./components/layout/CookieAdvisor";
import FontSelectionPage from "./pages/FontSelectionPage";
import vtoast from "./components/ui/Snackbar";

export default {
  name: "App",

  components: {
    Header,
    FontSelectionPage,
    vtoast,
    CookieAdvisor,
  },

  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },

  mounted() {
    this.$root.vtoast = this.$refs.vtoast;
  },
};
</script>
