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
      <simple-modal v-model="showHelpModal" :title="helpModalConfig.title" :content="helpModalConfig.content"> </simple-modal>
    </v-container>
  </div>
</template>

<script>
import DecorationInput from "../components/ui/DecorationInput";
import MainText from "../components/ui/MainText";
import SimpleModal from "../components/common/SimpleModal";

export default {
  components: {
    DecorationInput,
    MainText,
    "simple-modal": SimpleModal,
  },

  data: () => ({
    copiedText: "",
    showNotification: false,
    timeout: 3500,
    showBackToTopButton: false,
    showHelpModal: false,
    helpModalConfig: {
      title: "",
      content: "",
    },
  }),

  mounted() {
    this.$root.$on('open-help-modal', this.openHelpModal)
  },

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
  
  methods: {
    updateUserText(value) {
      this.userText = value;
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.scrollY || e.target.scrollTop || 0;
      const limit =
        Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        ) - window.innerHeight;

      this.showBackToTopButton = top > 20 && top < limit - 100;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
    openHelpModal(config) {
      this.helpModalConfig = config;
      this.showHelpModal = true;
    },
  },
};
</script>
<style scoped>
.v-card {
  border-left: 5px solid var(--v-primary-base) !important;
  border-radius: 20px;
}
</style>
