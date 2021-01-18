<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-snackbar color="red" v-model="showError" timeout="5000" dismissable>
        {{ errorMsg }}
      </v-snackbar>
      <v-container>
        <v-row>
          <v-col cols="3">
            <v-sheet rounded="lg">
              <SavedAddressesList />
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" class="pa-12" rounded="lg">
              <AddressInput />

              <div v-if="currentAddress.formattedAddress">
                <v-row class="my-4">
                  <v-col cols="8">
                    <div class="text-h4">
                      {{ currentAddress.formattedAddress }}
                    </div></v-col
                  >
                  <v-col cols="4"
                    ><v-btn
                      rounded
                      color="primary"
                      @click="saveAddress(currentAddress)"
                      :disabled="addressAlreadySaved"
                    >
                      {{
                        addressAlreadySaved
                          ? "Address already saved"
                          : "Save Address"
                      }}
                    </v-btn></v-col
                  >
                </v-row>

                <v-tabs v-model="tab" align-with-title>
                  <v-tabs-slider color="yellow"></v-tabs-slider>

                  <v-tab key="todaysForecast"> Today's Forecast </v-tab>
                  <v-tab key="sevenDayForecast"> Seven Day Forecast </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                  <v-tab-item key="todaysForecast">
                    <v-card>
                      <ForecastToday />
                    </v-card>
                  </v-tab-item>
                  <v-tab-item key="sevenDayForecast">
                    <v-card>
                      <ForecastSevenDay />
                    </v-card>
                  </v-tab-item>
                </v-tabs-items>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AddressInput from "./components/AddressInput";
import ForecastSevenDay from "./components/ForecastSevenDay";
import ForecastToday from "./components/ForecastToday";
import SavedAddressesList from "./components/SavedAddressesList";
import { mapState, mapActions } from "vuex";
export default {
  name: "App",
  components: {
    AddressInput,
    ForecastSevenDay,
    ForecastToday,
    SavedAddressesList,
  },

  data: () => ({
    tab: null,
  }),
  computed: {
    ...mapState(["currentAddress", "showError", "errorMsg", "savedAddresses"]),
    addressAlreadySaved() {
      return !!this.savedAddresses.find(
        (address) => address.placeId == this.currentAddress.placeId
      );
    },
  },
  methods: {
    ...mapActions(["saveAddress"]),
  },
};
</script>
