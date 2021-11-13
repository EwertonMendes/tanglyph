<template>
  <cookie-law theme="dark-lime" buttonText="Got It!">
    <div slot="message">
      This website uses cookies to ensure you get the best experience on our
      website.
    </div>
  </cookie-law>
</template>

<script>
import CookieLaw from "vue-cookie-law";

export default {
  components: { CookieLaw },
};
</script>
