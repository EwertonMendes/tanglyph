<template>
    <v-footer padless>
      <v-card
        flat
        tile
        width="100%"
        class="text-center"
      >
        <v-card-text>
          <v-btn
            class="mx-4"
            icon
            @click="toTop"
          >
            <v-icon size="24px">
              mdi-home
            </v-icon>
          </v-btn>
          <v-btn
            class="mx-4"
            icon
            @click="openGithub"
          >
            <v-icon size="24px">
              mdi-github
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text>
          {{$t('footer.made-with-love')}} <strong>Ewerton Mendes</strong>
        </v-card-text>
      </v-card>
    </v-footer>
</template>

<script>
  export default {
    methods: {
        openGithub() {
            window.open('https://github.com/EwertonMendes', '_blank').focus();
        },
        toTop() {
            this.$vuetify.goTo(0);
        }
    }
  }
</script>
