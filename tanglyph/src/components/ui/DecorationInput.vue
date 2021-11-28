<template>
  <div>
    <v-row>
      <v-col>
        <h3 class="pb-2">{{ glyphStyle.name }}</h3>
        <v-switch
          inset
          v-if="showReplaceCheckButton"
          v-model="replaceDecoration"
          :label="$t('decoration-input.replace-decoration')"
        ></v-switch>
      </v-col>
    </v-row>

    <v-divider class="pb-2"></v-divider>
    <v-text-field :value="fullTextValue" class="pt-3" readonly dense outlined>
      <template v-slot:append>
        <v-row class="pt-2">
          <decoration-modal
            v-model="showModal"
            :glyphName="glyphName"
            @decorate="applyDecoration"
          ></decoration-modal>
          <v-tooltip top v-if="showDecorationButton">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary lighten-2"
                plain
                text
                v-bind="attrs"
                v-on="on"
                @click.stop="showModal = true"
              >
                <v-icon color="orange">mdi-creation</v-icon>
              </v-btn>
            </template>
            <span>{{$t('decoration-input.decorate-text')}}</span>
          </v-tooltip>
          <v-tooltip top v-if="showCopyButton">
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
            <span>{{$t('decoration-input.copy-to-clipboard')}}</span>
          </v-tooltip>
        </v-row>
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

  computed: {
    glyphStyle() {
      return this.$store.getters.getStyleByName(this.glyphName);
    },
    fullTextValue: {
      get() {
        return this.glyphStyle.value;
      }
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
  },
  methods: {
    copyText() {
      navigator.clipboard.writeText(this.glyphStyle.value);
      this.showToast();
    },
    showToast() {
      this.$root.vtoast.show({
        message: this.$t('decoration-input.copied', { msg: this.glyphStyle.value }),
        color: "success",
        icon: "mdi-check",
        timer: 3000,
      });
    },
    applyDecoration: function(decorationObj) {
      
      this.$store.dispatch('applyDecorationToStyleText', { decorationValueObj: decorationObj, glyphName: this.glyphName });    
      
    },
  },
};
</script>
