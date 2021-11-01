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
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-dialog
            persistent
            transition="dialog-bottom-transition"
            max-width="800"
          >
            <template v-slot:activator="{ on: dialog, attrs: dialogAttrs }">
              <v-tooltip top>
                <template
                  v-slot:activator="{ on: tooltip, attrs: tootlipAttrs }"
                >
                  <v-btn
                    color="primary lighten-2"
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
                  <div class="column_wrapper" v-for="decoration in decorations" :key="decoration.name">
                    <v-btn text @click="applyDecoration(decoration.template, style)">{{decoration.template}}</v-btn>
                  </div>
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
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Constants from "../components/common/constants";
import helpers from "../components/common/helpers";
import esrever from 'esrever';

export default {
  data: () => ({
    rules: [(value) => (value || "").length <= 35 || "Max 35 characters"],
    maxLength: 35,
    userText: "",
    copiedText: "",
    showNotification: false,
    timeout: 3500,
    showBackToTopButton: false,
    styles: [
      {
        name: "Future Alien",
        map: Constants.mapsNames.FUTUREALIEN,
        value: "",
      },
      {
        name: "Squiggle 1",
        map: Constants.mapsNames.SQUIGGLE,
        value: "",
      },
      {
        name: "Squiggle 2",
        map: Constants.mapsNames.SQUIGGLE2,
        value: "",
      },
      {
        name: "Squiggle 3",
        map: Constants.mapsNames.SQUIGGLE3,
        value: "",
      },
      {
        name: "Squiggle 4",
        map: Constants.mapsNames.SQUIGGLE4,
        value: "",
      },
      {
        name: "Squiggle 5",
        map: Constants.mapsNames.SQUIGGLE5,
        value: "",
      },
      {
        name: "Squiggle 6",
        map: Constants.mapsNames.SQUIGGLE6,
        value: "",
      },
      {
        name: "Asian Style 1",
        map: Constants.mapsNames.ASIANSTYLE,
        value: "",
      },
      {
        name: "Asian Style 2",
        map: Constants.mapsNames.ASIANSTYLE2,
        value: "",
      },
      {
        name: "Squares",
        map: Constants.mapsNames.SQUARES,
        value: "",
      },
      {
        name: "Inverted Squares",
        map: Constants.mapsNames.INVERTEDSQUARES,
        value: "",
      },
      {
        name: "Monospace",
        map: Constants.mapsNames.MONOSPACE,
        value: "",
      },
      {
        name: "Bold",
        map: Constants.mapsNames.BOLD,
        value: "",
      },
      {
        name: "Bold & Italic",
        map: Constants.mapsNames.BOLDITALIC,
        value: "",
      },
      {
        name: "Bold Sans",
        map: Constants.mapsNames.BOLDSANS,
        value: "",
      },
      {
        name: "Currency",
        map: Constants.mapsNames.CURRENCY,
        value: "",
      },
      {
        name: "Symbols",
        map: Constants.mapsNames.SYMBOLS,
        value: "",
      },
      {
        name: "Greek",
        map: Constants.mapsNames.GREEK,
        value: "",
      },
      {
        name: "Ben Text",
        map: Constants.mapsNames.BENTTEXT,
        value: "",
      },
      {
        name: "Italic",
        map: Constants.mapsNames.ITALIC,
        value: "",
      },
      {
        name: "Upper Angles",
        map: Constants.mapsNames.UPPERANGLES,
        value: "",
      },
      {
        name: "Subscript",
        map: Constants.mapsNames.SUBSCRIPT,
        value: "",
      },
      {
        name: "Superscript",
        map: Constants.mapsNames.SUPERSCRIPT,
        value: "",
      },
      {
        name: "Double Struck",
        map: Constants.mapsNames.DOUBLESTRUCK,
        value: "",
      },
      {
        name: "Medieval",
        map: Constants.mapsNames.MEDIEVAL,
        value: "",
      },
      {
        name: "Cursive",
        map: Constants.mapsNames.CURSIVE,
        value: "",
      },
      {
        name: "Old English",
        map: Constants.mapsNames.OLDENGLISH,
        value: "",
      },
      {
        name: "Wide Text",
        map: Constants.mapsNames.WIDETEXT,
        value: "",
      },
    ],
    decorations: [
      {
        name: 'hearts',
        template: '❤️💖💘💝💕💞'
      },
      {
        name: 'foods',
        template: '🍉🍇🍓🍌'
      },
      {
        name: 'balh',
        template: '🍉🍇🍓🍌'
      },
      {
        name: 'asd',
        template: '🍉🍇🍓🍌'
      },
      {
        name: 'qwe',
        template: '🍉🍇🍓🍌'
      },
      {
        name: 'tye',
        template: '🍉🍇🍓🍌'
      },
      {
        name: 'foosdfsdds',
        template: '🍉🍇🍓🍌'
      },
      {
        name: 'sdfcxv',
        template: '🍉🍇🍓🍌'
      },
      {
        name: 'jjytuytr',
        template: '🍉🍇🍓🍌'
      }
    ]
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
    applyDecoration(decorationText, textStyle) {
      textStyle.value = `${decorationText}${textStyle.value}${esrever.reverse(decorationText)}`;
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

<style>
.column-wrapper {
  column-count: 2;
}
</style>
