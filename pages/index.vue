<template>
  <div>
    <the-header></the-header>
  </div>
</template>

<script lang="ts">
import { defineComponent, useStore } from "@nuxtjs/composition-api";
import TheHeader from "../components/TheHeader.vue";
export default defineComponent({
  components: { TheHeader },
  setup() {
    const store = useStore();

    return {
      store
    };
  }
});
</script>
