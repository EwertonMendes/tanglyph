<template>
  <v-app>
    <Header></Header>
    <v-main>
      <v-flex ma-5>
        <!-- toast -->
        <vtoast ref="vtoast" />
        <FontSelectionPage></FontSelectionPage>
      </v-flex>
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/layout/AppHeader";
import FontSelectionPage from "./pages/FontSelectionPage";
import vtoast from "./components/ui/Snackbar";

export default {
  name: "App",

  components: {
    Header,
    FontSelectionPage,
    vtoast,
  },

  mounted() {
    this.$root.vtoast = this.$refs.vtoast;
  },
};
</script>
