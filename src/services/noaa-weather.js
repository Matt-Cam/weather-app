import axios from "axios";
/**
 * Get NOAA forecasts for a latitude/longitude coordinate.
 * @param  {Number} latitude
 * @param  {Number} longitude
 * @return {Object} {gridX, gridY, gridId}, an object of properties used in NOAA forecast api
 */
export const getForecastEndpoints = (latitude, longitude) => {
  const url = `https://api.weather.gov/points/${latitude},${longitude}`;
  return axios.get(url).then((res) => ({
    gridX: res.data.properties.gridX,
    gridY: res.data.properties.gridY,
    gridId: res.data.properties.gridId,
  }));
};

/**
 * Get hourly forecast for today
 * @param  {Number} gridId id of the grid
 * @param  {Number} gridX x location for grid point
 * @param  {Number} gridY y location for grid point
 * @return {Object}
 */
export const getHourlyForecast = (gridId, gridX, gridY) => {
  const url = `https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/forecast/hourly`;
  return axios.get(url).then((res) => {
    return res.data;
  });
};
/**
 * Get seven day forecast
 * @param  {Number} gridId id of the grid
 * @param  {Number} gridX x location for grid point
 * @param  {Number} gridY y location for grid point
 * @return {Object}
 */
export const getSevenDayForecast = (gridId, gridX, gridY) => {
  const url = `https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/forecast`;
  return axios.get(url).then((res) => {
    return res.data;
  });
};
