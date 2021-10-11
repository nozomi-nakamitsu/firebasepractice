import firebase, { firestore } from "../plugins/firebase";
export default function({ route, store, redirect }) {
  return new Promise(resolve => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        store.commit("setCurrentUser", user);
        store.commit("setIsLogined", true);
      } else {
        store.commit("setIsLogined", false);
      }

      resolve();
    });
  });
}
