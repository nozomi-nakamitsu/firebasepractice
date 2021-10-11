<template>
  <div>
    <the-header></the-header>
    <div class="flex">
      <base-comment></base-comment>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useStore } from "@nuxtjs/composition-api";
import BaseComment from "../components/BaseComment.vue";
import TheHeader from "../components/TheHeader.vue";
export default defineComponent({
  components: { TheHeader, BaseComment },
  setup() {
    const store = useStore();
    return {
      store
    };
  }
});
</script>
