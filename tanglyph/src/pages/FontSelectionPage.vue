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
      <main-text></main-text>
      <v-card
        elevation="5"
        v-for="style in styles"
        :key="style.name"
        class="mt-5"
      >
        <v-card-text>
          <decoration-input
            :glyphName="style.name"
            :showReplaceCheckButton="false"
          ></decoration-input>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
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
    copiedText: "",
    showNotification: false,
    timeout: 3500,
    showBackToTopButton: false,
  }),

  computed: {
    userText: {
      get: function() {
        return this.$store.state.userText;
      },
      set: function(value) {
        this.$store.commit("setUserText", value);
      },
    },
    styles: {
      get: function() {
        return this.$store.state.styles;
      },
    },
  },

  watch: {
    userText: function(value) {
      if (!value) {
        this.styles.forEach((style) => {
          style.value = "";
          style.baseValue = "";
        });
        return;
      }
      this.styles.forEach((style) => {
        style.value = helpers.convertTextToGlyph({
          baseText: value,
          mapName: style.map,
        });
        style.baseValue = style.value;
        
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
<style scoped>
.v-card {
  border-left: 5px solid var(--v-primary-base) !important;
}
</style>
