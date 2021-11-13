<template>
  <v-app-bar app :color="$vuetify.theme.themes[theme].appBar" elevate-on-scroll class="mb-12">
    <div class="d-flex align-center">
      <v-img
        alt="Tanglyph Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />

      <h3>{{ title }}</h3>
      <v-divider vertical class="pl-3"></v-divider>
      <div class="pl-3">
        {{subTitle}}
      </div>
      
    </div>

    <v-spacer></v-spacer>
    <v-icon class="pa-3">
      {{ themeIcon }}
    </v-icon>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on" style="width:min-content;">
          <v-switch v-model="isDarkMode" color="primary" class="mt-5"></v-switch>
        </div>
      </template>
      <span>Change Theme</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
import glyphMaps from "../../common/glyphMaps";
import helpers from "../../common/helpers";
import Constants from "../../common/constants";

export default {
  name: "Header",

  data() {
    return {
      isDarkMode: this.$cookie.get("darkTheme") === 'true' ? true : false,
      title: "Tanglyph",
      subTitle: "The best and easiest text decorator",
      themeIcon: '',
    };
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  watch: {
    
    isDarkMode(value) {
      this.$cookie.set("darkTheme", value);
      this.$vuetify.theme.isDark = value;
      this.themeIcon = this.getThemeIcon();
    },
  },
  created() {
    this.themeIcon = this.getThemeIcon();
    this.$vuetify.theme.isDark = this.isDarkMode;
  },

  mounted() {
    this.changeFont();
  },

  methods: {
    generateRandom() {
      const mapsObjLength = glyphMaps.mapCount() - 1;
      var num = Math.floor(Math.random() * mapsObjLength);
      return num;
    },

    changeFont() {
      const index = this.generateRandom();
      const newTitle = helpers.convertTextToGlyph({
        baseText: this.title,
        mapName: Object.values(Constants.mapsNames)[index],
      });
      this.title = newTitle;
    },
    getThemeIcon() {
      return this.isDarkMode
        ? "mdi-white-balance-sunny"
        : "mdi-moon-waning-crescent";
    },
  },
};
</script>
