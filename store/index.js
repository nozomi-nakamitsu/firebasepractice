import firebase from "~/plugins/firebase";
export const state = () => ({
  currentUser: {
    uid: "",
    displayName: ""
  },
  isLogined: false
});

export const mutations = {
  setCurrentUser(state, data) {
    state.currentUser.uid = data.uid;
    state.currentUser.displayName = data.displayName;
  },
  setIsLogined(state, isLogined) {
    state.isLogined = isLogined;
  }
};

export const actions = {
  login({ commit }) {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        const user = result.user;
        console.log("success : " + user.uid + " : " + user.displayName);
        commit("setCurrentUser", user);
        commit("setIsLogined", true);
      })
      .catch(function(error) {
        var errorCode = error.code;
        console.log("error : " + errorCode);
      });
  },
  logout({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit("setCurrentUser", {});
        commit("setIsLogined", false);
      });
  },
  setPersistence() {
    return new Promise(resolve => {
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(result => {
          resolve(result);
        });
    });
  }
};

export const getters = {
  getCurrentUser(state) {
    return state.currentUser;
  },
  getIsLogined(state) {
    return state.isLogined;
  }
};
