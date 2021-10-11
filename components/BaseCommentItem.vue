<template>
  <div
    class="base-comment-item-container"
    :class="[{ '-sent': types === 'sent' }]"
  >
    <div v-if="types == 'received'" class="image">
      <p class="name">{{ message.displayName }}</p>
      <img
        src="../assets/images/icon.png"
        :alt="message.nickName"
        class="img"
      />
    </div>
    <div class="message">
      <p
        class="text"
        :class="[{ '-sent': types === 'sent' }]"
        @click="$emit('delete', message)"
      >
        {{ message.text }}
      </p>
      <p class="date" style="text-align: end">
        {{ formatDateToSlashWithTime(message.createdAt) }}
      </p>
    </div>

  </div>
</template>
<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import dayjs from "dayjs";

export default defineComponent({
  props: {
    message: {
      type: Object,
      required: true
    },
    types: {
      type: String,
      required: true
    }
  },
  setup() {
    const formatDateToSlashWithTime = date => {
      return dayjs(date).format("YYYY/MM/DD　HH:mm");
    };
    return {
      formatDateToSlashWithTime
    };
  }
});
</script>
