<template>
  <div>
    <v-card elevation="5">
      <v-text-field
        v-model="userText"
        class="pa-5"
        :rules="rules"
        outlined
        clearable
        placeholder="Enter your text here and see the magic happens ✨✨"
      ></v-text-field
    ></v-card>

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
        <v-text-field :value="style.value" class="pt-3" outlined></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn text>
          Copy
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import glyphMaps from "../components/common/glyphMaps";
import Constants from "../components/common/constants";
export default {
  data: () => ({
    rules: [(value) => (value || "").length <= 35 || "Max 35 characters"],
    userText: "",
    modifiedText: "",
    styles: [
      { name: "Future Alien", map: Constants.mapsNames.FUTUREALIEN, value: "" },
      { name: "Squiggle 1", map: Constants.mapsNames.SQUIGGLE, value: "" },
      { name: "Squiggle 2", map: Constants.mapsNames.SQUIGGLE2, value: "" },
      { name: "Squiggle 3", map: Constants.mapsNames.SQUIGGLE3, value: "" },
      { name: "Squiggle 4", map: Constants.mapsNames.SQUIGGLE4, value: "" },
      { name: "Squiggle 5", map: Constants.mapsNames.SQUIGGLE5, value: "" },
      { name: "Squiggle 6", map: Constants.mapsNames.SQUIGGLE6, value: "" },
      { name: "Asian Style 1", map: Constants.mapsNames.ASIANSTYLE, value: "" },
      { name: "Asian Style 2", map: Constants.mapsNames.ASIANSTYLE2, value: "" },
      { name: "Squares", map: Constants.mapsNames.SQUARES, value: "" },
      { name: "Inverted Squares", map: Constants.mapsNames.INVERTEDSQUARES, value: "" },
      { name: "Monospace", map: Constants.mapsNames.MONOSPACE, value: "" },
      { name: "Bold", map: Constants.mapsNames.BOLD, value: "" },
      { name: "Bold & Italic", map: Constants.mapsNames.BOLDITALIC, value: "" },
      { name: "Bold Sans", map: Constants.mapsNames.BOLDSANS, value: "" },
      { name: "Currency", map: Constants.mapsNames.CURRENCY, value: "" },
      { name: "Symbols", map: Constants.mapsNames.SYMBOLS, value: "" },
      { name: "Greek", map: Constants.mapsNames.GREEK, value: "" },
      { name: "Ben Text", map: Constants.mapsNames.BENTTEXT, value: "" },
      { name: "Italic", map: Constants.mapsNames.ITALIC, value: "" },
      { name: "Upper Angles", map: Constants.mapsNames.UPPERANGLES, value: "" },
      { name: "Subscript", map: Constants.mapsNames.SUBSCRIPT, value: "" },
      { name: "Superscript", map: Constants.mapsNames.SUPERSCRIPT, value: "" },
      { name: "Double Struck", map: Constants.mapsNames.DOUBLESTRUCK, value: "" },
      { name: "Medieval", map: Constants.mapsNames.MEDIEVAL, value: "" },
      { name: "Cursive", map: Constants.mapsNames.CURSIVE, value: "" },
      { name: "Old English", map: Constants.mapsNames.OLDENGLISH, value: "" },
      { name: "Wide Text", map: Constants.mapsNames.WIDETEXT, value: "" },
    ],
  }),

  watch: {
    userText: function(value) {
      this.styles.forEach((style) => {
        style.value = this.convertTextToGlyph({
          baseText: value,
          mapName: style.map,
        });
      });
    },
  },

  mounted() {},

  methods: {
    convertTextToGlyph({ baseText, mapName }) {
      let newText = "";
      [...baseText].forEach((letter) => {
        if(!glyphMaps[mapName][letter.toLowerCase()]) {
          newText += letter;
        } else {
          newText += glyphMaps[mapName][letter.toLowerCase()];
        }
      });
      return newText;
    },
  },
};
</script>

<style></style>
