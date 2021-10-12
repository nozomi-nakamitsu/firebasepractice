<template>
  <div>
    <div class="base-comment-container">
      <div class="header">Chat!!!!!</div>
      <div class="main">
        <div
          v-for="(msg, index) in messages"
          :key="'index-' + index"
          class="message"
        >
          <BaseCommentItem
            :message="msg"
            :types="sentOrReceived(msg.uid)"
            @delete="DeleteMessage"
          />
        </div>
      </div>

      <form class="form" @submit.prevent="sendMessage">
        <input v-model="text" />
        <button :disabled="!text" type="submit" class="btn">
          <div class="common-button -comment">
            submit
          </div>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import {
  defineComponent,
  useStore,
  ref,
  onMounted,
  onBeforeUnmount,
  computed
} from "@nuxtjs/composition-api";

import { firestore } from "../plugins/firebase.js";
import firebase from "firebase";
import BaseCommentItem from "./BaseCommentItem.vue";
import { v4 as uuidv4 } from "uuid";

export default defineComponent({
  components: {
    BaseCommentItem
  },

  setup(props) {
    const text = ref("");
    const messages = ref([]);
    const loverMessages = ref([]);

    const store = useStore();
    let unsubscribe = null;
    const currentUser = store.getters.getCurrentUser;

    // ページ遷移後にsnapshotでの監視をstartする
    onMounted(() => {
      // unsubscribe = firestore
      //   .collection("messages")
      //   .orderBy("createdAt")
      //   .onSnapshot(snapshot => {
      //     messages.value = snapshot.docs.map(doc => doc.data());
      //   });
    });

    // メッセージを送信する
    const sendMessage = async () => {
      const id = uuidv4();
      const createdAt = firebase.firestore.Timestamp.fromDate(new Date());
      const messageInfo = {
        createdAt: createdAt,
        displayName: currentUser.displayName,
        uid: currentUser.uid,
        id: id,
        text: text.value
      };
      try {
        // await firebase
        //   .firestore()
        //   .collection("messages")
        //   .doc(id)
        //   .set(messageInfo);
        // text.value = "";
        // const element = document.querySelector(".main");
        // if (element) {
        //   element.scrollTop = element.scrollHeight;
        // }
      } catch (error) {
        alert("errorです", error);
      }
    };

    // コメント削除処理
    const DeleteMessage = async msg => {
      if (msg.uid !== currentUser.uid) {
        return;
      }
      // try {
      //   await firestore
      //     .collection("messages")
      //     .doc(msg.id)
      //     .delete();
      // } catch (error) {
      //   console.error(error);
      // }
    };

    // ページ遷移後にsnapshotでの監視をstopする
    onBeforeUnmount(() => {
      // unsubscribe();
    });
    const sentOrReceived = computed(() => uid =>
      uid === currentUser.uid ? "sent" : "received"
    );
    return {
      sendMessage,
      messages,
      text,
      sentOrReceived,
      DeleteMessage,
      loverMessages
    };
  }
});
</script>
