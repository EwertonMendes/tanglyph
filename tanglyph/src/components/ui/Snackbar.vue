<template>
  <v-snackbar transition="slide-x-transition" :color="color" :timeout="timer" v-model="showSnackbar" bottom>
    <v-icon left>{{ icon }}</v-icon
    >{{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn :color="closeButtonColor" text v-bind="attrs" @click="showSnackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "vtoast",
  data() {
    return {
      showSnackbar: false,
      message: "",
      color: "success",
      closeButtonColor: "white",
      icon: "mdi-check",
      timer: 3000,
    };
  },
  methods: {
    show({ message, color, timer, icon, closeButtonColor }) {
      this.showSnackbar = true;
      this.message = message ?? 'missing "message".';
      this.color = color ?? "success";
      this.timer = timer ?? 3000;
      this.icon = icon ?? "mdi-check";
      this.closeButtonColor = closeButtonColor ?? "white"
    },
  },
};
</script>
