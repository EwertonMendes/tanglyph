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
    placeholder="Enter your text here and see the magic happens ✨✨"
  ></v-text-field>
</template>
<script>
export default {
  computed: {
    textValue: {
      get() {
        return this.$store.state.userText;
      },
      set(value) {
         this.$store.commit("setUserText", value);
      },
    },
  },

  data: () => ({
    rules: [(value) => (value || "").length <= 50 || "Max 50 characters"],
    maxLength: 50,
  }),
};
</script>
