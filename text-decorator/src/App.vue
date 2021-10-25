<template>
  <v-app>
    <Header></Header>
    <v-main>
      <v-flex ma-5>
        <FontSelectionPage></FontSelectionPage>
      </v-flex>
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/layout/AppHeader";
import FontSelectionPage from "./pages/FontSelectionPage.vue";

export default {
  name: "App",

  components: {
    Header,
    FontSelectionPage,
  },

  data: () => ({
    //
  }),
};
</script>
