<template>
  <div>
    <v-data-table disable-pagination :headers="tableHeaders" :items="tableItems" :hide-default-footer="true" :loading="loading"></v-data-table>
  </div>
</template>
<script>
import { getHourlyForecast } from '../services/noaa-weather';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ForecastToday',
  computed: {
    ...mapState(['currentAddress']),
  },
  data() {
    return {
      loading: false,
      tableHeaders: [
        {
          text: 'Time',
          align: 'start',
          sortable: true,
          value: 'time',
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
        getHourlyForecast(newAddress.gridId, newAddress.gridX, newAddress.gridY)
          .then((res) => {
            this.loading = false;
            // form table rows with response.
            // slicing to use only the next 24 hours
            this.tableItems = res.properties.periods.slice(0, 24).map((forecastItem) => {
              let date = new Date(forecastItem.startTime);
              let time = date.getHours();
              let month = date.getMonth() + 1;
              let day = date.getDate();
              let amOrPm = time >= 12 ? 'PM' : 'AM';
              time = time == 0 || time == 24 ? 12 : time % 12;
              return {
                time: `${month}/${day} ${time}${amOrPm}`,
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
