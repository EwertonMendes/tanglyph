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
  },

  watch: {
    textValue: _.debounce(function() {
      this.isTyping = false;
    }, 500),

    isTyping: function(value) {
      if (!value) {
        this.convertMainText();
      }
    },
  },

  data: () => ({
    rules: [(value) => (value || "").length <= 50 || "Max 50 characters"],
    maxLength: 50,
  }),

  methods: {
    convertMainText() {
      if (!this.textValue) {
        this.styles.forEach((style) => {
          style.value = "";
          style.baseValue = "";
        });
        return;
      }
      this.styles.forEach((style) => {
        style.value = helpers.convertTextToGlyph({
          baseText: this.textValue,
          mapName: style.map,
        });
        style.baseValue = style.value;
        
      });
    },
  },
};
</script>
