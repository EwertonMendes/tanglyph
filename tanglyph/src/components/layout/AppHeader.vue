<template>
  <div>
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
        <h1 class="d-none">{{ subTitle }}</h1>
        <h2>{{ title }}</h2>
        <v-divider vertical class="pl-3 hidden-xs-only"></v-divider>
        <div class="pl-3 hidden-xs-only font-weight-light">
          {{ subTitle }}
        </div>
      </div>

      <v-spacer></v-spacer>

      <v-tooltip bottom :disabled="shouldShowTooltip">
        <template v-slot:activator="{ on, attrs }">
          <div
            v-bind="attrs"
            v-on="on"
            style="width:min-content;"
            class="hidden-xs-only"
          >
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

      <v-icon class="pa-3 hidden-xs-only">
        {{ themeIcon }}
      </v-icon>
      <v-tooltip bottom :disabled="shouldShowTooltip">
        <template v-slot:activator="{ on, attrs }">
          <div
            v-bind="attrs"
            v-on="on"
            style="width:min-content;"
            class="hidden-xs-only"
          >
            <v-switch
              inset
              v-model="isDarkMode"
              color="primary"
              class="mt-5"
            ></v-switch>
          </div>
        </template>
        <span>{{ $t("header.change-theme") }}</span>
      </v-tooltip>
      <v-app-bar-nav-icon
        @click="drawer = true"
        class="hidden-sm-and-up"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary right>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h5">
            <v-icon>
              mdi-cog
            </v-icon>
            {{ $t("options") }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on" block>
              <span class="button-text">{{ $t("header.languages") }}</span>
              <v-divider class=" divider"></v-divider>
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

        <v-row no-gutters>
          <v-col class="mt-4">
            <span class="ml-2">{{ $t("header.change-theme") }}</span>
          </v-col>
          <v-col>
            <v-switch
              inset
              v-model="isDarkMode"
              color="primary"
              class="ml-16"
            ></v-switch>
          </v-col>
        </v-row>
      </v-list>
    </v-navigation-drawer>
  </div>
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
      title: "tanglyph",
      themeIcon: "",
      drawer: false,
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
        return this.langs.findIndex(
          (language) => language.code === this.$i18n.locale
        );
      },
      set(value) {
        this.$i18n.locale = this.langs[value].code;
        document.title = "Tanglyph - " + this.$t("sub-title");
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

<style scoped>
.button-text {
  margin-left: -7px;
}

.divider {
  visibility: hidden;
}
</style>
