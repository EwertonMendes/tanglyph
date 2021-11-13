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
      <main-text v-model="userText"></main-text>
      <v-card
        elevation="5"
        v-for="style in styles"
        :key="style.name"
        class="mt-5"
        outlined
        shaped
      >
        <v-card-text>
          <decoration-input
            v-bind:glyphStyle="style"
            :userText="userText"
            @input="updateUserText"
          ></decoration-input>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import constants from "../common/constants";
import DecorationInput from "../components/ui/DecorationInput";
import MainText from "../components/ui/MainText";
import helpers from "../common/helpers";

export default {
  components: {
    DecorationInput,
    MainText,
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
    updateUserText(value) {
      this.userText = value;
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
