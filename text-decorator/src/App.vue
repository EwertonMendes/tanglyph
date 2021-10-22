<template>
  <v-app>
    <Header></Header>
    <v-main>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/layout/AppHeader';

export default {
  name: 'App',

  components: {
    Header,
  },

  mounted() {
    console.log(this)
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
