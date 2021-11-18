import Vue from "vue";
import Vuex from "vuex";
import constants from "./common/constants";

Vue.use(Vuex);

const initialState = () => ({
  userText: "",
    styles: [
      {
        name: "Future Alien",
        map: constants.mapsNames.FUTUREALIEN,
        value: "",
        baseValue: "",
      },
      {
        name: "Squiggle 1",
        map: constants.mapsNames.SQUIGGLE,
        value: "",
        baseValue: "",
      },
      {
        name: "Squiggle 2",
        map: constants.mapsNames.SQUIGGLE2,
        value: "",
        baseValue: "",
      },
      {
        name: "Squiggle 3",
        map: constants.mapsNames.SQUIGGLE3,
        value: "",
        baseValue: "",
      },
      {
        name: "Squiggle 4",
        map: constants.mapsNames.SQUIGGLE4,
        value: "",
        baseValue: "",
      },
      {
        name: "Squiggle 5",
        map: constants.mapsNames.SQUIGGLE5,
        value: "",
        baseValue: "",
      },
      {
        name: "Squiggle 6",
        map: constants.mapsNames.SQUIGGLE6,
        value: "",
        baseValue: "",
      },
      {
        name: "Asian Style 1",
        map: constants.mapsNames.ASIANSTYLE,
        value: "",
        baseValue: "",
      },
      {
        name: "Asian Style 2",
        map: constants.mapsNames.ASIANSTYLE2,
        value: "",
        baseValue: "",
      },
      {
        name: "Squares",
        map: constants.mapsNames.SQUARES,
        value: "",
        baseValue: "",
      },
      {
        name: "Inverted Squares",
        map: constants.mapsNames.INVERTEDSQUARES,
        value: "",
        baseValue: "",
      },
      {
        name: "Monospace",
        map: constants.mapsNames.MONOSPACE,
        value: "",
        baseValue: "",
      },
      {
        name: "Bold",
        map: constants.mapsNames.BOLD,
        value: "",
        baseValue: "",
      },
      {
        name: "Bold & Italic",
        map: constants.mapsNames.BOLDITALIC,
        value: "",
        baseValue: "",
      },
      {
        name: "Bold Sans",
        map: constants.mapsNames.BOLDSANS,
        value: "",
        baseValue: "",
      },
      {
        name: "Currency",
        map: constants.mapsNames.CURRENCY,
        value: "",
        baseValue: "",
      },
      {
        name: "Symbols",
        map: constants.mapsNames.SYMBOLS,
        value: "",
        baseValue: "",
      },
      {
        name: "Greek",
        map: constants.mapsNames.GREEK,
        value: "",
        baseValue: "",
      },
      {
        name: "Ben Text",
        map: constants.mapsNames.BENTTEXT,
        value: "",
        baseValue: "",
      },
      {
        name: "Italic",
        map: constants.mapsNames.ITALIC,
        value: "",
        baseValue: "",
      },
      {
        name: "Upper Angles",
        map: constants.mapsNames.UPPERANGLES,
        value: "",
        baseValue: "",
      },
      {
        name: "Subscript",
        map: constants.mapsNames.SUBSCRIPT,
        value: "",
        baseValue: "",
      },
      {
        name: "Superscript",
        map: constants.mapsNames.SUPERSCRIPT,
        value: "",
        baseValue: "",
      },
      {
        name: "Double Struck",
        map: constants.mapsNames.DOUBLESTRUCK,
        value: "",
        baseValue: "",
      },
      {
        name: "Medieval",
        map: constants.mapsNames.MEDIEVAL,
        value: "",
        baseValue: "",
      },
      {
        name: "Cursive",
        map: constants.mapsNames.CURSIVE,
        value: "",
        baseValue: "",
      },
      {
        name: "Old English",
        map: constants.mapsNames.OLDENGLISH,
        value: "",
        baseValue: "",
      },
      {
        name: "Wide Text",
        map: constants.mapsNames.WIDETEXT,
        value: "",
        baseValue: "",
      },
    ],
})

export default new Vuex.Store({
  state: initialState(),
  getters: {
    getStyleByName: (state) => (name) => {
      return state.styles.find((style) => style.name === name);
    },
  },
  mutations: {
    setUserText(state, text) {
      state.userText = text;
    },
    setStyleValue(state, { name, value }) {
      const style = state.styles.find((style) => style.name === name);
      style.value = value;
    }

  }
});
