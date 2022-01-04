<template>
  <div>
    <v-dialog
      v-model="show"
      :fullscreen="$vuetify.breakpoint.mobile"
      persistent
      transition="dialog-bottom-transition"
      max-width="800"
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>
            {{ $t("decoration-modal.title") }}
            <v-row class="justify-end">
              <v-btn
                fab
                text
                @click="dialog.value = false"
                class="font-weight-black"
                >X</v-btn
              >
            </v-row>
          </v-toolbar>
          <v-container align-self-center="true">
            <v-card-text>
              <main-text></main-text>
            </v-card-text>
            <v-card-text>
              <decoration-input
                :showDecorationButton="false"
                :glyphName="glyphName"
              >
              </decoration-input>
            </v-card-text>
            <decoration-selector
              @decorate="applyDecoration"
            ></decoration-selector>
          </v-container>
          <v-card-actions class="justify-end">
            <v-btn text @click="dialog.value = false">{{
              $t("decoration-modal.close")
            }}</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    
  </div>
</template>

<script>
import DecorationSelector from "./DecorationSelector";
import MainText from "./MainText";


export default {
  name: "decoration-modal",

  components: {
    DecorationInput: () => import("./DecorationInput.vue"),
    "main-text": MainText,
    "decoration-selector": DecorationSelector,
  },

  props: {
    glyphName: {
      type: String,
      required: true,
    },
    value: Boolean,
  },
  data() {
    return {
      replaceDecoration: false,
      showHelpModal: false,
    };
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    applyDecoration(decorationObj) {
      this.$emit("decorate", decorationObj);
    },
  },
};
</script>
