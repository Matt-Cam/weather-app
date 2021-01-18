<template>
  <div>
    <v-data-table disable-pagination :headers="tableHeaders" :items="tableItems" :hide-default-footer="true" :loading="loading"></v-data-table>
  </div>
</template>
<script>
import { getSevenDayForecast } from '../services/noaa-weather';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'ForecastSevenDay',
  computed: {
    ...mapState(['currentAddress']),
  },
  data() {
    return {
      loading: false,
      tableHeaders: [
        {
          text: 'Date',
          align: 'start',
          sortable: true,
          value: 'date',
        },
        {
          text: 'Overview',
          value: 'overview',
        },
        { text: 'Temperature', value: 'temperature' },
        { text: 'Temperature Unit', value: 'temperatureUnit' },
      ],
      tableItems: [],
    };
  },
  methods: {
    ...mapActions(['showError']),
  },
  watch: {
    currentAddress: {
      handler: function(newAddress) {
        this.loading = true;
        getSevenDayForecast(newAddress.gridId, newAddress.gridX, newAddress.gridY)
          .then((res) => {
            this.loading = false;
            // form table rows with response.
            this.tableItems = res.properties.periods.map((forecastItem) => {
              let date = new Date(forecastItem.startTime);
              let time = date.getHours();
              let month = date.getMonth() + 1;
              let day = date.getDate();
              let amOrPm = time >= 12 ? 'PM' : 'AM';
              time = time == 0 || time == 24 ? 12 : time % 12;
              return {
                date: `${month}/${day} ${time}${amOrPm}`,
                overview: forecastItem.shortForecast,
                temperature: forecastItem.temperature,
                temperatureUnit: forecastItem.temperatureUnit,
              };
            });
          })
          .catch(() => {
            this.showError('Error fetching Seven Day Forecast');
          });
      },
      immediate: true,
    },
  },
};
</script>
