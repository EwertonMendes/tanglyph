<template>
  <v-container>
    <v-row>
      <v-col v-for="page in pagination" :key="page.pageNumber">
        <div
          v-for="decoration in page.contents"
          :key="decoration.name"
        >
          <v-btn text @click="applyDecoration(decoration.template)">{{
            decoration.template
          }}</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import decorations from '../../assets/json/decorations.json';
export default {
  data: () => ({
    pageSize: 2,
    decorations: decorations
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
        finalObject.push({ pageNumber: pageNum, contents: contents });
      });
      return finalObject;
    },
  },
  methods: {
    applyDecoration(decorationText) {
      this.$emit('decorate', decorationText)
    },
  },
};
</script>
