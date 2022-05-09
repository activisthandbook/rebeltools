import { Notify } from "quasar";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  limit,
} from "firebase/firestore";

// const db = getFirestore()

export default {
  namespaced: true,
  state: {
    dataLoaded: false,
    data: {},
    unsubscribe: null,
    error: null,
  },
  mutations: {
    update(state, actionData) {
      // Only update the fields that were changed
      state.data = Object.assign(state.data, actionData);
      state.dataLoaded = true;
    },
    storeError(state, error) {
      state.error = error;
      state.dataLoaded = true;
    },
    registerSubscription(state, subscription) {
      state.unsubscribe = subscription;
    },
    destroy(state) {
      state.dataLoaded = false;
      state.data = {};
      state.unsubscribe();
    },
  },
  actions: {
    subscribeToDatabase({ state, rootState, commit }, actionID) {
      const q = query(
        collection(getFirestore(), "actions"),
        where("userID", "==", rootState.auth.data.uid),
        where("actionID", "==", actionID),
        limit(1)
      );

      commit(
        "registerSubscription",
        onSnapshot(
          q,
          (querySnapshot) => {
            const actions = [];

            if (querySnapshot.docs[0]) {
              querySnapshot.forEach((doc) => {
                actions.push({
                  ...doc.data(),
                  id: doc.id,
                });
              });
              commit("update", actions[0]);
              commit("storeError", null);
            } else {
              commit("storeError", "action-not-found");
              // No need for error notification, this error is expected behaviour when the user has not signed up for this action yet.
            }
          },
          (error) => {
            // In case of error
            commit("storeError", error);
            Notify.create({
              message: error + " (currentAction.js)",
              icon: "mdi-alert",
            });
          }
        )
      );
    },
    async addToDatabase({ commit, rootState }, data) {
      await addDoc(collection(getFirestore(), "actions"), {
        actionType: data.actionType,
        actionID: data.actionID,
        movementID: data.movementID,
        userID: rootState.auth.data.uid,
        createdAt: serverTimestamp(),
      })
        .then(() => {
          this.loading = false;
          Notify.create({ message: "Signup succesful", icon: "mdi-check" });
          return true;
        })
        .catch((error) => {
          Notify.create({
            message: error + "(currentAction.js)",
            icon: "mdi-alert",
          });
          return true;
        });
    },
  },
};
