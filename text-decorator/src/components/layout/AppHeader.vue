<template>
  <v-app-bar app color="primary" dark class="mb-12">
    <div class="d-flex align-center">
      <v-img
        alt="Text Decorator Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />

      <h3>{{ title }}</h3>
    </div>

    <v-spacer></v-spacer>
    <v-icon class="pa-3">
      mdi-white-balance-sunny
    </v-icon>
    <v-switch v-model="isDarkMode" color="orange" class="mt-5"></v-switch>
  </v-app-bar>
</template>

<script>
import glyphMaps from "../common/glyphMaps";
import Constants from "../common/constants";

export default {
  name: "Header",
  components: {},

  data() {
    return {
      isDarkMode: false,
      title: "Text Decorator",
    };
  },

  watch: {
    isDarkMode() {
      this.$vuetify.theme.isDark = this.isDarkMode;
    },
  },

  mounted() {
    this.changeFontFamily();
  },

  methods: {
    generateRandom() {
      const mapsObjLength = Object.keys(glyphMaps).length - 1;
      var num = Math.floor(Math.random() * mapsObjLength);
      return num;
    },

    changeFontFamily() {
      const index = this.generateRandom();
      const newTitle = this.convertTextToGlyph({
        baseText: this.title,
        mapName: Object.values(Constants.mapsNames)[index],
      });
      this.title = newTitle;
    },

    convertTextToGlyph({ baseText, mapName }) {
      let newText = "";
      [...baseText].forEach((letter) => {
        if (!glyphMaps[mapName][letter.toLowerCase()]) {
          return (newText += letter);
        }
        return (newText += glyphMaps[mapName][letter.toLowerCase()]);
      });
      return newText;
    },
  },
};
</script>
