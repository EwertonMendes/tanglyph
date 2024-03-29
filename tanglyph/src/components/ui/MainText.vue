<template>
  <v-text-field
    v-model="textValue"
    :rules="rules"
    :counter="maxLength"
    :maxlength="maxLength"
    rounded
    solo
    outlined
    clearable
    :placeholder="placeholder"
    @input="isTyping = true"
  >
  </v-text-field>
</template>
<script>
import _ from "lodash";
import helpers from "../../common/helpers";

export default {
  name: "main-text",
  computed: {
    textValue: {
      get() {
        return this.$store.state.userText;
      },
      set(value) {
        this.$store.commit("setUserText", value);
      },
    },
    placeholder() {
      return this.$vuetify.breakpoint.smAndDown
        ? this.$t("text-placeholder-mobile")
        : this.$t("text-placeholder");
    },
    styles: {
      get: function() {
        return this.$store.state.styles;
      },
    },
    isTyping: {
      get() {
        return this.$store.state.isTyping;
      },
      set(value) {
        this.$store.commit("setIsTyping", value);
      },
    },
    isLoading: {
      get() {
        return this.$store.state.isLoading;
      },
      set(value) {
        this.$store.commit("setIsLoading", value);
      },
    },
  },

  watch: {
    textValue: _.debounce(function() {
      this.isTyping = false;
    }, 500),

    isTyping: function(value) {
      this.isLoading = true;
      if (!value) {
        this.convertMainText();
      }
    },
  },

  data: () => ({
    maxLength: 100,
    rules: [(value) => (value || "").length <= 100 || "Max 100 characters"],
  }),

  methods: {
    convertMainText() {
      if (!this.textValue) {
        this.styles.forEach((style) => {
          if (style.appliedDecorations.length > 0) {
            this.$store.commit("clearDecorations", { style });
          }
          style.value = "";
          style.baseValue = "";
        });
        this.isLoading = false;
        return;
      }
      this.styles.forEach((style) => {
        const baseText = helpers.convertTextToGlyph({
          baseText: this.textValue,
          mapName: style.map,
        });

        style.baseValue = baseText;
        style.value = baseText;
        this.applyDecoration();
      });

      this.isLoading = false;
    },

    applyDecoration: function() {
      const allStylesWithDecorations = this.$store.state.styles.filter(
        (style) => style.name && style.appliedDecorations.length > 0
      );

      allStylesWithDecorations.forEach((glyph) => {
        this.$store.dispatch("reApplyDecorationsToStyleText", {
          glyphName: glyph.name,
        });
      });
    },
  },
};
</script>
