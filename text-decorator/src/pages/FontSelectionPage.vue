<template>
  <div>
    <v-container class="scroll-y">
      <v-btn
        v-scroll="onScroll"
        v-show="showBackToTopButton"
        fab
        dark
        fixed
        bottom
        right
        color="primary"
        @click="toTop"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
      <v-text-field
        v-model="userText"
        class="pt-5"
        :rules="rules"
        :counter="maxLength"
        :maxlength="maxLength"
        rounded
        solo
        outlined
        clearable
        placeholder="Enter your text here and see the magic happens ✨✨"
      ></v-text-field>

      <v-card
        elevation="5"
        v-for="style in styles"
        :key="style.name"
        class="mt-5"
        outlined
        shaped
      >
        <v-card-text>
          <h3 class="pb-2">{{ style.name }}</h3>
          <v-divider class="pb-2"></v-divider>
          <v-text-field
            :value="style.value"
            class="pt-3"
            readonly
            dense
            outlined
          >
            <template v-slot:append>
              <v-row class="pt-2">
                <v-dialog
                  persistent
                  transition="dialog-bottom-transition"
                  max-width="800"
                >
                  <template
                    v-slot:activator="{ on: dialog, attrs: dialogAttrs }"
                  >
                    <v-tooltip top>
                      <template
                        v-slot:activator="{ on: tooltip, attrs: tootlipAttrs }"
                      >
                        <v-btn
                          color="primary lighten-2"
                          plain
                          text
                          v-bind="{ ...dialogAttrs, ...tootlipAttrs }"
                          v-on="{ ...dialog, ...tooltip }"
                        >
                          <v-icon color="orange">mdi-creation</v-icon>
                        </v-btn>
                      </template>
                      <span>Decorate Text</span>
                    </v-tooltip>
                  </template>
                  <template v-slot:default="dialog">
                    <v-card>
                      <v-toolbar color="primary" dark>Decorate Text</v-toolbar>
                      <v-container align-self-center="true">
                        <v-card-text>
                          <v-text-field
                            v-model="userText"
                            class="pt-5"
                            :rules="rules"
                            :counter="maxLength"
                            :maxlength="maxLength"
                            rounded
                            solo
                            outlined
                            clearable
                            placeholder="Enter your text here and see the magic happens ✨✨"
                          ></v-text-field>
                        </v-card-text>
                        <v-card-text>
                          <h3 class="pb-2">{{ style.name }}</h3>
                          <v-divider class="pb-2"></v-divider>
                          <v-text-field
                            :value="style.value"
                            class="pt-3"
                            readonly
                            dense
                            outlined
                          ></v-text-field>
                        </v-card-text>
                        <decoration-selector
                          @decorate="applyDecoration($event, style)"
                        ></decoration-selector>
                      </v-container>
                      <v-card-actions class="justify-end">
                        <v-btn text @click="dialog.value = false">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary lighten-2"
                      plain
                      text
                      @click="copyText(style.value)"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-content-copy</v-icon>
                    </v-btn>
                  </template>
                  <span>Copy to clipboard</span>
                </v-tooltip>
              </v-row>
            </template>
          </v-text-field>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import constants from "../components/common/constants";
import DecorationSelector from "../components/ui/DecorationSelector";
import helpers from "../components/common/helpers";
import esrever from "esrever";

export default {
  components: {
    DecorationSelector,
  },

  data: () => ({
    rules: [(value) => (value || "").length <= 50 || "Max 50 characters"],
    maxLength: 50,
    userText: "",
    copiedText: "",
    showNotification: false,
    timeout: 3500,
    showBackToTopButton: false,
    styles: [
      {
        name: "Future Alien",
        map: constants.mapsNames.FUTUREALIEN,
        value: "",
      },
      {
        name: "Squiggle 1",
        map: constants.mapsNames.SQUIGGLE,
        value: "",
      },
      {
        name: "Squiggle 2",
        map: constants.mapsNames.SQUIGGLE2,
        value: "",
      },
      {
        name: "Squiggle 3",
        map: constants.mapsNames.SQUIGGLE3,
        value: "",
      },
      {
        name: "Squiggle 4",
        map: constants.mapsNames.SQUIGGLE4,
        value: "",
      },
      {
        name: "Squiggle 5",
        map: constants.mapsNames.SQUIGGLE5,
        value: "",
      },
      {
        name: "Squiggle 6",
        map: constants.mapsNames.SQUIGGLE6,
        value: "",
      },
      {
        name: "Asian Style 1",
        map: constants.mapsNames.ASIANSTYLE,
        value: "",
      },
      {
        name: "Asian Style 2",
        map: constants.mapsNames.ASIANSTYLE2,
        value: "",
      },
      {
        name: "Squares",
        map: constants.mapsNames.SQUARES,
        value: "",
      },
      {
        name: "Inverted Squares",
        map: constants.mapsNames.INVERTEDSQUARES,
        value: "",
      },
      {
        name: "Monospace",
        map: constants.mapsNames.MONOSPACE,
        value: "",
      },
      {
        name: "Bold",
        map: constants.mapsNames.BOLD,
        value: "",
      },
      {
        name: "Bold & Italic",
        map: constants.mapsNames.BOLDITALIC,
        value: "",
      },
      {
        name: "Bold Sans",
        map: constants.mapsNames.BOLDSANS,
        value: "",
      },
      {
        name: "Currency",
        map: constants.mapsNames.CURRENCY,
        value: "",
      },
      {
        name: "Symbols",
        map: constants.mapsNames.SYMBOLS,
        value: "",
      },
      {
        name: "Greek",
        map: constants.mapsNames.GREEK,
        value: "",
      },
      {
        name: "Ben Text",
        map: constants.mapsNames.BENTTEXT,
        value: "",
      },
      {
        name: "Italic",
        map: constants.mapsNames.ITALIC,
        value: "",
      },
      {
        name: "Upper Angles",
        map: constants.mapsNames.UPPERANGLES,
        value: "",
      },
      {
        name: "Subscript",
        map: constants.mapsNames.SUBSCRIPT,
        value: "",
      },
      {
        name: "Superscript",
        map: constants.mapsNames.SUPERSCRIPT,
        value: "",
      },
      {
        name: "Double Struck",
        map: constants.mapsNames.DOUBLESTRUCK,
        value: "",
      },
      {
        name: "Medieval",
        map: constants.mapsNames.MEDIEVAL,
        value: "",
      },
      {
        name: "Cursive",
        map: constants.mapsNames.CURSIVE,
        value: "",
      },
      {
        name: "Old English",
        map: constants.mapsNames.OLDENGLISH,
        value: "",
      },
      {
        name: "Wide Text",
        map: constants.mapsNames.WIDETEXT,
        value: "",
      },
    ],
  }),

  watch: {
    userText: function(value) {
      if (!value) {
        this.styles.forEach((style) => {
          style.value = "";
        });
        return;
      }
      this.styles.forEach((style) => {
        style.value = helpers.convertTextToGlyph({
          baseText: value,
          mapName: style.map,
        });
      });
    },
  },

  methods: {
    copyText(text) {
      navigator.clipboard.writeText(text);
      this.copiedText = text;
      this.showToast();
    },
    showToast() {
      this.$root.vtoast.show({
        message: `Copied ${this.copiedText} to the clipboard`,
        color: "success",
        icon: "mdi-check",
        timer: 3000,
      });
    },
    applyDecoration(decorationObj, textStyle) {
      textStyle.value = `${decorationObj.text}${textStyle.value}${
        decorationObj.canReverse
          ? esrever.reverse(decorationObj.text)
          : decorationObj.text
      }`;
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.showBackToTopButton = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
};
</script>
