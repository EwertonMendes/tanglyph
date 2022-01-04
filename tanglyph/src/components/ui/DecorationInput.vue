<template>
  <div>
    <v-row>
      <v-col>
        <h3 class="pb-2">{{ glyphStyle.name }}</h3>
        <v-row v-if="showReplaceCheckButton">
          <v-switch
            class="pl-3"
            inset
            v-model="replaceDecoration"
            :label="$t('decoration-input.replace-decoration')"
          ></v-switch>
          <v-btn
            class="help-button"
            fab
            x-small
            text
            plain
            @click="handleReplaceDecorationHelp"
          >
            <v-icon>
              mdi-help-rhombus
            </v-icon>
          </v-btn>
        </v-row>

        <v-row v-if="showReplaceCheckButton" class="remove-space-between">
          <v-switch
            class="pl-3 pb-2"
            inset
            v-if="showReplaceCheckButton"
            v-model="replicateDecoration"
            :label="$t('decoration-input.replicate-decoration')"
          ></v-switch>
          <v-btn
            class="help-button"
            fab
            x-small
            text
            plain
            @click="handleReplicateDecorationHelp"
          >
            <v-icon>
              mdi-help-rhombus
            </v-icon>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>

    <v-divider class="pb-2"></v-divider>
    <v-text-field
      :value="fullTextValue"
      class="pt-3"
      readonly
      dense
      outlined
      :loading="isLoading"
    >
      <template v-slot:append>
        <v-btn
          class="button"
          plain
          fab
          small
          @click.stop="clearDecorations"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <decoration-modal
          v-model="showModal"
          :glyphName="glyphName"
          @decorate="applyDecoration"
        ></decoration-modal>
        <v-tooltip
          top
          v-if="showDecorationButton"
          :disabled="shouldShowTooltip"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="button"
              plain
              text
              fab
              small
              v-bind="attrs"
              v-on="on"
              @click.stop="showModal = true"
            >
              <v-icon color="orange">mdi-creation</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("decoration-input.decorate-text") }}</span>
        </v-tooltip>
        <v-tooltip top v-if="showCopyButton" :disabled="shouldShowTooltip">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="button"
              plain
              text
              fab
              small
              @click="copyText()"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon color="primary">mdi-content-copy</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("decoration-input.copy-to-clipboard") }}</span>
        </v-tooltip>
      </template>
    </v-text-field>
  </div>
</template>
<script>
import DecorationModal from "./DecorationModal";

export default {
  name: "decoration-input",

  components: {
    "decoration-modal": DecorationModal,
  },

  data() {
    return {
      showModal: false,
    };
  },

  props: {
    glyphName: {
      type: String,
      required: true,
    },
    showDecorationButton: {
      type: Boolean,
      default: true,
    },
    showCopyButton: {
      type: Boolean,
      default: true,
    },
    showReplaceCheckButton: {
      type: Boolean,
      default: true,
    },
  },

  mounted() {
    this.$store.state.currentGlyphName = this.glyphName;
  },

  beforeDestroy() {
    this.$store.state.currentGlyphName = null;
  },

  computed: {
    shouldShowTooltip() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    glyphStyle() {
      return this.$store.getters.getStyleByName(this.glyphName);
    },
    fullTextValue: {
      get() {
        return this.glyphStyle.value;
      },
    },
    isLoading() {
      return this.$store.state.isLoading;
    },

    // I had to put the replaceDecoration on vuex store because it didn't work as a data property
    replaceDecoration: {
      get() {
        return this.$store.state.replaceDecoration;
      },
      set(value) {
        this.$store.commit("setReplaceDecoration", value);
      },
    },
    replicateDecoration: {
      get() {
        return this.$store.state.replicateDecoration;
      },
      set(value) {
        this.$store.commit("setReplicateDecoration", value);
      },
    },
  },

  methods: {
    copyText() {
      this.showToast();
      if (!this.fullTextValue) return;
      navigator.clipboard.writeText(this.glyphStyle.value);
    },
    getToastMessage() {
      if (!this.fullTextValue)
        return this.$t("decoration-input.nothing-to-copy");

      return this.$t("decoration-input.copied", {
        msg:
          this.glyphStyle.value.length < 20
            ? this.glyphStyle.value
            : `${this.glyphStyle.value.slice(0, 20)}...`,
      });
    },
    getToastConfig() {
      return {
        message: this.getToastMessage(),
        color: this.fullTextValue ? "success" : "amber darken-2",
        icon: this.fullTextValue ? "mdi-check" : "mdi-close",
        timer: 3000,
      };
    },
    showToast() {
      this.$root.vtoast.show(this.getToastConfig());
    },
    applyDecoration: function(decorationObj) {
      if (this.replicateDecoration) {
        const allGlyphNames = this.$store.state.styles.map(
          (style) => style.name
        );

        allGlyphNames.forEach((glyphName) => {
          this.$store.dispatch("applyDecorationToStyleText", {
            decorationValueObj: decorationObj,
            glyphName: glyphName,
          });
        });

        return;
      }

      this.$store.dispatch("applyDecorationToStyleText", {
        decorationValueObj: decorationObj,
        glyphName: this.glyphName,
      });
    },
    clearDecorations: function(decorationObj) {
      if (this.replicateDecoration) {
        const allGlyphNames = this.$store.state.styles.map(
          (style) => style.name
        );

        allGlyphNames.forEach((glyphName) => {
          this.$store.dispatch("removeDecorationFromStyleText", {
            decorationValueObj: decorationObj,
            glyphName: glyphName,
          });
        });

        return;
      }

      this.$store.dispatch("removeDecorationFromStyleText", {
        decorationValueObj: decorationObj,
        glyphName: this.glyphName,
      });
    },
    handleReplaceDecorationHelp() {
      this.$root.$emit("open-help-modal", {
        title: this.$t("decoration-input.replace-decoration-help.title"),
        content: this.$t("decoration-input.replace-decoration-help.text"),
      });
    },
    handleReplicateDecorationHelp() {
      this.$root.$emit("open-help-modal", {
        title: this.$t("decoration-input.replicate-decoration-help.title"),
        content: this.$t("decoration-input.replicate-decoration-help.text"),
      });
    }
  },
};
</script>

<style scoped>
.button {
  margin-top: -8px;
}

.help-button {
  margin-top: 15px;
  position: fixed;
  margin-left: 250px;
}

.remove-space-between {
  margin-top: -20px;
}
</style>
