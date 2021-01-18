<template>
  <div>
    <v-text-field
      label="Enter Address or Zip"
      v-model="userInput"
      @keyup.enter.native="submit"
    ></v-text-field>
    <v-btn
      rounded
      color="primary"
      @click="submit"
      :disabled="!userInput"
      :loading="loading"
    >
      Search
    </v-btn>
  </div>
</template>
<script>
import { getAddress } from "../services";
import { mapActions, mapState } from "vuex";

export default {
  name: "AddressInput",
  data() {
    return {
      userInput: "",
      loading: false,
    };
  },
  computed: {
    ...mapState(["currentAddress"]),
  },
  methods: {
    ...mapActions(["setCurrentAddress", "showError"]),
    submit() {
      if (this.userInput != "") {
        this.loading = true;
        getAddress(this.userInput)
          .then((address) => {
            this.setCurrentAddress(address);
          })
          .catch(() => {
            this.showError(
              "Error fetching this address. Try typing something more specific"
            );
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
  watch: {
    currentAddress(newAddress) {
      this.userInput = newAddress.formattedAddress;
    },
  },
};
</script>
<style scoped></style>
