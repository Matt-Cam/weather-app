<template>
  <div class="pa-4" v-if="!savedAddresses || savedAddresses.length == 0">
    No Saved Saved Addresses
  </div>
  <div v-else>
    <div class="text-h6 text-center pa-4">
      Saved Addresses
    </div>
    <v-list color="transparent">
      <v-list-item
        v-for="address in savedAddresses"
        :key="address.placeId"
        link
        @click="setCurrentAddress(address)"
      >
        <v-list-item-content>
          <v-list-item-title>
            {{ address.formattedAddress }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action @click="removeSavedAddress(address)">
          <v-icon color="red">
            mdi-delete
          </v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "SavedAddressesList",
  computed: {
    ...mapState(["savedAddresses"]),
  },
  methods: {
    ...mapActions(["setCurrentAddress", "removeSavedAddress"]),
  },
};
</script>
