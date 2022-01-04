<template>
  <v-app-bar
    app
    :color="$vuetify.theme.themes[theme].appBar"
    elevate-on-scroll
    class="mb-12"
  >
    <div class="d-flex align-center">
      <v-img
        alt="Tanglyph Logo"
        class="shrink mr-2"
        contain
        src="../../assets/logo.png"
        transition="scale-transition"
        width="60"
      />

      <h3>{{ title }}</h3>
      <v-divider vertical class="pl-3 hidden-xs-only"></v-divider>
      <div class="pl-3 hidden-xs-only font-weight-light">
        {{ subTitle }}
      </div>
    </div>

    <v-spacer></v-spacer>

    <v-tooltip bottom :disabled="shouldShowTooltip">
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on" style="width:min-content;">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn fab text v-on="on">
                <v-icon>mdi-translate</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-subheader>{{ $t("header.languages") }}</v-subheader>
              <v-list-item-group
                v-model="languageIndex"
                mandatory
                color="primary"
              >
                <v-list-item v-for="lang in langs" :key="lang.code">
                  <v-list-item-avatar>
                    <v-img :src="lang.flagPath" :eager="true"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-text="lang.name"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </div>
      </template>
      <span>{{ $t("header.languages") }}</span>
    </v-tooltip>

    <v-icon class="pa-3">
      {{ themeIcon }}
    </v-icon>
    <v-tooltip bottom :disabled="shouldShowTooltip">
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on" style="width:min-content;">
          <v-switch
            inset
            v-model="isDarkMode"
            color="primary"
            class="mt-5"
          ></v-switch>
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
      isDarkMode: this.$cookie.get("darkTheme") === "true" ? true : false,
      title: "Tanglyph",
      themeIcon: "",
      langs: [
        {
          name: "English",
          code: "en",
          flagPath: require("../../assets/flags/us.svg"),
        },
        {
          name: "Português",
          code: "pt",
          flagPath: require("../../assets/flags/br.svg"),
        },
      ],
      selectedItem: 0,
    };
  },
  computed: {
    shouldShowTooltip() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    subTitle() {
      return this.$t("sub-title");
    },
    languageIndex: {
      get() {
        return this.selectedItem;
      },
      set(value) {
        this.selectedItem = value;
        this.$i18n.locale = this.langs[value].code;
      },
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
        ? "mdi-moon-waning-crescent"
        : "mdi-white-balance-sunny";
    },
  },
};
</script>
