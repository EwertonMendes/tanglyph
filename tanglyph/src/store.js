import Vue from "vue";
import Vuex from "vuex";
import constants from "./common/constants";
import i18n from './i18n'

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
      name: i18n.t("styles.future-alien"),
      translation: "styles.future-alien",
      map: constants.mapsNames.FUTUREALIEN,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: i18n.t("styles.squiggle1"),
      translation: "styles.squiggle1",
      map: constants.mapsNames.SQUIGGLE,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: i18n.t("styles.squiggle2"),
      translation: "styles.squiggle2",
      map: constants.mapsNames.SQUIGGLE2,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: i18n.t("styles.squiggle3"),
      translation: "styles.squiggle3",
      map: constants.mapsNames.SQUIGGLE3,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: i18n.t("styles.squiggle4"),
      translation: "styles.squiggle4",
      map: constants.mapsNames.SQUIGGLE4,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: i18n.t("styles.squiggle5"),
      translation: "styles.squiggle5",
      map: constants.mapsNames.SQUIGGLE5,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: i18n.t("styles.squiggle6"),
      translation: "styles.squiggle6",
      map: constants.mapsNames.SQUIGGLE6,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: i18n.t("styles.asian-style1"),
      translation: "styles.asian-style1",
      map: constants.mapsNames.ASIANSTYLE,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: i18n.t("styles.asian-style2"),
      translation: "styles.asian-style2",
      map: constants.mapsNames.ASIANSTYLE2,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: i18n.t("styles.squares"),
      translation: "styles.squares",
      map: constants.mapsNames.SQUARES,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: i18n.t("styles.inverted-squares"),
      translation: "styles.inverted-squares",
      map: constants.mapsNames.INVERTEDSQUARES,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: i18n.t("styles.monospace"),
      translation: "styles.monospace",
      map: constants.mapsNames.MONOSPACE,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: i18n.t("styles.bold"),
      translation: "styles.bold",
      map: constants.mapsNames.BOLD,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: i18n.t("styles.bold-and-italic"),
      translation: "styles.bold-and-italic",
      map: constants.mapsNames.BOLDITALIC,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: i18n.t("styles.bold-sans"),
      translation: "styles.bold-sans",
      map: constants.mapsNames.BOLDSANS,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: i18n.t("styles.currency"),
      translation: "styles.currency",
      map: constants.mapsNames.CURRENCY,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: i18n.t("styles.symbols"),
      translation: "styles.symbols",
      map: constants.mapsNames.SYMBOLS,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: i18n.t("styles.greek"),
      translation: "styles.greek",
      map: constants.mapsNames.GREEK,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: i18n.t("styles.ben-text"),
      translation: "styles.ben-text",
      map: constants.mapsNames.BENTTEXT,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: i18n.t("styles.italic"),
      translation: "styles.italic",
      map: constants.mapsNames.ITALIC,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: i18n.t("styles.upper-angles"),
      translation: "styles.upper-angles",
      map: constants.mapsNames.UPPERANGLES,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: i18n.t("styles.subscript"),
      translation: "styles.subscript",
      map: constants.mapsNames.SUBSCRIPT,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: i18n.t("styles.superscript"),
      translation: "styles.superscript",
      map: constants.mapsNames.SUPERSCRIPT,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: i18n.t("styles.double-struck"),
      translation: "styles.double-struck",
      map: constants.mapsNames.DOUBLESTRUCK,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: i18n.t("styles.medieval"),
      translation: "styles.medieval",
      map: constants.mapsNames.MEDIEVAL,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: i18n.t("styles.cursive"),
      translation: "styles.cursive",
      map: constants.mapsNames.CURSIVE,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: i18n.t("styles.old-english"),
      translation: "styles.old-english",
      map: constants.mapsNames.OLDENGLISH,
      value: "",
      baseValue: "",
      appliedDecorations: [],
    },
    {
      name: i18n.t("styles.wide-text"),
      translation: "styles.wide-text",
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
    refreshStylesName(state) {
      state.styles.forEach((style) => {
        style.name = i18n.t(style.translation);
      });
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

      let fullText = style.baseValue;

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

          fullText = `${decoration.first}${fullText}${decoration.second}`;
        });
      }

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
