<template>
  <div>
    <h3 class="pb-2">{{ glyphStyle.name }}</h3>
    <v-divider class="pb-2"></v-divider>
    <v-text-field :value="fullTextValue" class="pt-3" readonly dense outlined>
      <template v-slot:append>
        <v-row class="pt-2">
          <v-dialog
            persistent
            transition="dialog-bottom-transition"
            max-width="800"
          >
            <template v-slot:activator="{ on: dialog, attrs: dialogAttrs }">
              <v-tooltip top>
                <template
                  v-slot:activator="{ on: tooltip, attrs: tootlipAttrs }"
                >
                  <v-btn
                    color="primary lighten-2"
                    plain
                    text
                    v-bind="{ ...dialogAttrs, ...tootlipAttrs }"
                    v-on="{ ...dialog, ...tooltip }"
                  >
                    <v-icon color="orange">mdi-creation</v-icon>
                  </v-btn>
                </template>
                <span>Decorate Text</span>
              </v-tooltip>
            </template>
            <template v-slot:default="dialog">
              <v-card>
                <v-toolbar color="primary" dark>Decorate Text</v-toolbar>
                <v-container align-self-center="true">
                  <v-card-text>
                    <main-text></main-text>
                  </v-card-text>
                  <v-card-text>
                    <v-row>
                      <v-col>
                        <h3 class="pb-2">{{ glyphStyle.name }}</h3>
                        <v-checkbox
                          v-model="replaceDecoration"
                          label="Replace Decoration"
                        ></v-checkbox>
                      </v-col>
                    </v-row>

                    <v-divider class="pb-2"></v-divider>
                    <v-text-field
                      :value="fullTextValue"
                      class="pt-3"
                      readonly
                      dense
                      outlined
                    ></v-text-field>
                  </v-card-text>
                  <decoration-selector
                    @decorate="applyDecoration"
                  ></decoration-selector>
                </v-container>
                <v-card-actions class="justify-end">
                  <v-btn text @click="dialog.value = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary lighten-2"
                plain
                text
                @click="copyText()"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-content-copy</v-icon>
              </v-btn>
            </template>
            <span>Copy to clipboard</span>
          </v-tooltip>
        </v-row>
      </template>
    </v-text-field>
  </div>
</template>
<script>
import esrever from "esrever";
import DecorationSelector from "./DecorationSelector";
import MainText from "./MainText";

export default {
  name: "DecorationInput",

  components: {
    DecorationSelector,
    MainText,
  },

  props: {
    glyphName: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      replaceDecoration: false,
    };
  },

  computed: {
    glyphStyle() {
      return this.$store.getters.getStyleByName(this.glyphName);
    },
    fullTextValue: {
      get() {
        return this.glyphStyle.value;
      },
      set(value) {
        this.$store.commit("setStyleValue", {
          name: this.glyphName,
          value: value,
        });
      },
    },
  },
  methods: {
    copyText() {
      navigator.clipboard.writeText(this.glyphStyle.value);
      this.showToast();
    },
    showToast() {
      this.$root.vtoast.show({
        message: `Copied ${this.glyphStyle.value} to the clipboard`,
        color: "success",
        icon: "mdi-check",
        timer: 3000,
      });
    },
    applyDecoration(decorationObj) {
      const secondDecoration = decorationObj.canReverse
        ? esrever.reverse(decorationObj.text)
        : decorationObj.text;

      if (this.replaceDecoration) {
        this.fullTextValue = `${decorationObj.text}${this.glyphStyle.baseValue}${secondDecoration}`;
        return;
      }
      
      this.fullTextValue = `${decorationObj.text}${this.glyphStyle.value}${secondDecoration}`;
    },
  },
};
</script>
