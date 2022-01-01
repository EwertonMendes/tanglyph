<template>
  <v-container>
    <v-window v-model="step" show-arrows>
      <v-window-item
        v-for="page in pagination"
        :key="page.pageNumber"
        :value="page.pageNumber"
        class="window"
      >
        <v-row v-for="decoration in page.contents" :key="decoration.name">
          <v-col align="center">
            <v-btn
              text
              block
              class="btn-text"
              @click="
                applyDecoration({
                  first: decoration.first,
                  second: decoration.second,
                })
              "
              >{{ decoration.first }}</v-btn
            >
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script>
import decorations from "../../assets/json/decorations.json";
export default {
  name: "decoration-selector",
  
  data: () => ({
    pageSize: 4,
    decorations: decorations,
    step: 0,
  }),
  computed: {
    pagination: function() {
      const finalObject = [];
      this.decorations.forEach((element, index) => {
        const pageNum = index + 1;
        const contents = this.decorations.slice(
          index * this.pageSize,
          pageNum * this.pageSize
        );
        if (!contents.length) return;
        finalObject.push({ pageNumber: pageNum, contents: contents });
      });
       console.log(finalObject);
      return finalObject;
    },
  },
  methods: {
    applyDecoration(decorationObj) {
      this.$emit("decorate", decorationObj);
    },
  },
};
</script>

<style scoped>
.window {
  height: 220px;
}
</style>
