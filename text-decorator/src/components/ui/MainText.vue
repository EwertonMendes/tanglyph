<template>
    <v-text-field
        v-model="inputVal"
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
  props: {
      value: {
          type: String,
          default: ''
      },
  },

  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },

  data: () => ({
    rules: [(value) => (value || "").length <= 50 || "Max 50 characters"],
    maxLength: 50,
  }),
};
</script>
