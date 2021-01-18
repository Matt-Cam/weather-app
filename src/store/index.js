import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentAddress: {},
    loadingAddress: false,
    showError: false,
    errorMsg: "",
    //To persist state, savedAddresses will be initialized to whatever is stored in savedAddresses in localstorage.
    savedAddresses: JSON.parse(localStorage.getItem("savedAddresses")) || [],
  },
  mutations: {
    setCurrentAddress(state, address) {
      state.currentAddress = address;
    },
    setLoadingAddress(state, val) {
      state.loadingForecasts = !!val;
    },
    showError(state, msg) {
      state.showError = true;
      state.errorMsg = msg;
    },
    saveAddress(state, address) {
      // Update both vuex store and localstorage. This is because we use localstorage to persist state
      state.savedAddresses.push(address);
      localStorage.setItem(
        "savedAddresses",
        JSON.stringify(state.savedAddresses)
      );
    },
    removeSavedAddress(state, address) {
      // Update both vuex store and localstorage. This is because we use localstorage to persist state
      state.savedAddresses = state.savedAddresses.filter(
        (a) => a.placeId != address.placeId
      );

      localStorage.setItem(
        "savedAddresses",
        JSON.stringify(state.savedAddresses)
      );
    },
  },
  actions: {
    setCurrentAddress({ commit }, address) {
      commit("setCurrentAddress", address);
    },
    setLoadingAddress({ commit }, val) {
      commit("setLoadingForecasts", val);
    },
    showError({ commit }, msg) {
      commit("showError", msg);
    },
    saveAddress({ commit }, address) {
      commit("saveAddress", address);
    },
    removeSavedAddress({ commit }, address) {
      commit("removeSavedAddress", address);
    },
  },
});
