import Vue from "vue";
import Vuex from "vuex";
import constants from "./common/constants";
import helpers from "./common/helpers";

Vue.use(Vuex);

const initialState = () => ({
  userText: "",
  replaceDecoration: true,
  replicateDecoration: false,
  isTyping: false,
  isLoading: false,
  currentGlyphName: null,
  styles: [
    {
      name: "Future Alien",
      map: constants.mapsNames.FUTUREALIEN,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: "Squiggle 1",
      map: constants.mapsNames.SQUIGGLE,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: "Squiggle 2",
      map: constants.mapsNames.SQUIGGLE2,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: "Squiggle 3",
      map: constants.mapsNames.SQUIGGLE3,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: "Squiggle 4",
      map: constants.mapsNames.SQUIGGLE4,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: "Squiggle 5",
      map: constants.mapsNames.SQUIGGLE5,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: "Squiggle 6",
      map: constants.mapsNames.SQUIGGLE6,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: "Asian Style 1",
      map: constants.mapsNames.ASIANSTYLE,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: "Asian Style 2",
      map: constants.mapsNames.ASIANSTYLE2,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: "Squares",
      map: constants.mapsNames.SQUARES,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: "Inverted Squares",
      map: constants.mapsNames.INVERTEDSQUARES,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: "Monospace",
      map: constants.mapsNames.MONOSPACE,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: "Bold",
      map: constants.mapsNames.BOLD,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: "Bold & Italic",
      map: constants.mapsNames.BOLDITALIC,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: "Bold Sans",
      map: constants.mapsNames.BOLDSANS,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: "Currency",
      map: constants.mapsNames.CURRENCY,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: "Symbols",
      map: constants.mapsNames.SYMBOLS,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: "Greek",
      map: constants.mapsNames.GREEK,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: "Ben Text",
      map: constants.mapsNames.BENTTEXT,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: "Italic",
      map: constants.mapsNames.ITALIC,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: "Upper Angles",
      map: constants.mapsNames.UPPERANGLES,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: "Subscript",
      map: constants.mapsNames.SUBSCRIPT,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: "Superscript",
      map: constants.mapsNames.SUPERSCRIPT,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: "Double Struck",
      map: constants.mapsNames.DOUBLESTRUCK,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: "Medieval",
      map: constants.mapsNames.MEDIEVAL,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: "Cursive",
      map: constants.mapsNames.CURSIVE,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: "Old English",
      map: constants.mapsNames.OLDENGLISH,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: "Wide Text",
      map: constants.mapsNames.WIDETEXT,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
  ],
});

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
    setStyleValue(state, { style, value }) {
      style.value = value;
    },
    setIsTyping(state, value) {
      state.isTyping = value;
    },
    setIsLoading(state, value) {
      state.isLoading = value;
    },
    setReplaceDecoration(state, value) {
      state.replaceDecoration = value;
    },
    setReplicateDecoration(state, value) {
      state.replicateDecoration = value;
    },
    setAppliedDecorations(state, { decorationValueObj, style }) {
      if (state.replaceDecoration) {
        style.appliedDecorations.splice(0, style.appliedDecorations.length);
      }
      style.appliedDecorations.push(decorationValueObj);
    },
    clearDecorations(state, { style }) {
      style.appliedDecorations = [];
    },
  },
  actions: {
    applyDecorationToStyleText(
      { commit, getters, state },
      { decorationValueObj, glyphName }
    ) {
      const style = getters.getStyleByName(glyphName);

      const fullText = `${decorationValueObj.first}${
        state.replaceDecoration ? style.baseValue : style.value
      }${decorationValueObj.second}`;

      commit("setAppliedDecorations", { decorationValueObj, style });
      commit("setStyleValue", { style, value: fullText });
    },

    reApplyDecorationsToStyleText({ commit, getters }, { glyphName }) {
      const style = getters.getStyleByName(glyphName);
      let allDecorationsText = "";

      if (style.appliedDecorations.length > 0) {
        const decorationList = [...style.appliedDecorations];

        commit("clearDecorations", { style });

        decorationList.forEach((decoration) => {
          commit("setAppliedDecorations", {
            decorationValueObj: {
              first: decoration.first,
              second: decoration.second,
            },
            style,
          });

          allDecorationsText = `${decoration.first}${allDecorationsText}${decoration.second}`;
        });
      }

      const textMiddleIndex = helpers.getMiddleOfString(allDecorationsText) + 1;

      const fullText = allDecorationsText.splice(textMiddleIndex, style.baseValue);

      commit("setStyleValue", { style, value: fullText });
    },

    removeDecorationFromStyleText({ commit, getters }, { glyphName }) {
      const style = getters.getStyleByName(glyphName);

      const fullText = style.baseValue;

      commit("clearDecorations", { style });

      commit("setStyleValue", { style, value: fullText });
    },
  },
});
