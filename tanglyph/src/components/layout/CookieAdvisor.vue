<template>
  <cookie-law theme="dark-lime" :buttonText="agreeMessage">
    <div slot="message">
      {{ $t('cookie.message') }}
    </div>
  </cookie-law>
</template>

<script>
import CookieLaw from "vue-cookie-law";

export default {
  components: { CookieLaw },
  computed: {
    agreeMessage() {
      return this.$t("cookie.accept");
    }
  }
};
</script>
