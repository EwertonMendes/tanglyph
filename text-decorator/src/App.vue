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
import Header from './components/layout/AppHeader';
import FontSelectionPage from './pages/FontSelectionPage.vue';

export default {
  name: 'App',

  components: {
    Header,
    FontSelectionPage,
  },

  mounted() {
  },

  data: () => ({
    //
  }),
};
</script>

<style>
@font-face {
  font-family: "Retro";
  src: local("fonts"),
   url(./fonts/Retro-Stereo-Wide.ttf) format("truetype");
}
@font-face {
  font-family: "Creepy";
  src: local("fonts"),
   url(./fonts/HanaleiFill-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "Comic";
  src: local("fonts"),
   url(./fonts/KOMIKAGL.ttf) format("truetype");
}

</style>
