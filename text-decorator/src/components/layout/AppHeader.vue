<template>
  <v-app-bar app color="primary" dark class="mb-12">
    <div class="d-flex align-center">
      <v-img
        alt="Text Decorator Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />

      <h3 ref="titleText">Text Decorator</h3>
    </div>

    <v-spacer></v-spacer>
    <v-icon class="pa-3">
      mdi-white-balance-sunny
    </v-icon>
    <v-switch v-model="isDarkMode" color="orange" class="mt-5"></v-switch>
  </v-app-bar>
</template>

<script>
export default {
  name: "Test",
  components: {},

  data() {
    return {
      fontFamilies: ["Creepy", "Retro", "Helvetica", "Comic"],
      lastIndex: 0,
      isDarkMode: false,
    };
  },

  watch: {
    isDarkMode() {
      this.$vuetify.theme.isDark = this.isDarkMode;
    },
  },

  mounted() {
    this.changeFontFamily();
  },

  methods: {
    generateRandom() {
      var num = Math.floor(Math.random() * (this.fontFamilies.length - 1));
      if (num === this.lastIndex) {
        return this.generateRandom();
      }
      this.lastIndex = num;
      return num;
    },
    changeFontFamily() {
      setInterval(() => {
        const index = this.generateRandom();
        this.$refs.titleText.style.fontFamily = this.fontFamilies[index];
      }, 3000);
    },
  },
};
</script>
