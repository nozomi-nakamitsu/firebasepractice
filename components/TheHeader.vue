<template>
  <div>
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-navbar-brand>チャットアプリを作ってみよう！！！</b-navbar-brand>

      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-text v-if="store.getters.getIsLogined"
            >ログインユーザー名:{{
              store.getters.getCurrentUser.displayName
            }}</b-nav-text
          >
          <b-nav-text v-if="store.getters.getIsLogined"
            >UID:{{ store.getters.getCurrentUser.uid }}</b-nav-text
          >
          <b-button
            variant="danger"
            @click="logout"
            v-if="store.getters.getIsLogined"
            >ログアウト</b-button
          >
          <b-button variant="success" @click="login" v-else>ログイン</b-button>
          <b-nav-text></b-nav-text>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  watchEffect
} from "@nuxtjs/composition-api";
import firebase from "../plugins/firebase";

export default defineComponent({
  setup() {
    const store = useStore();
    // ログイン
    const login = async () => {
      await store.dispatch("setPersistence");

      await store.dispatch("login");
    };

    // ログアウト
    const logout = async () => {
      await store.dispatch("logout");
    };

    return {
      login,
      store,
      logout
    };
  }
});
</script>
