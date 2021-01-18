import { getFuzzyAddressInfo } from "./google-api";
import { getForecastEndpoints } from "./noaa-weather";

/**
 * Helper method that combines noaa and google api's to return a fully formatted address along with its gridX and gridY properties
 * @param  {String} address user typed address. uses fuzzy matching with help from google api. can be zip or full address
 * @return {Object}
 * {
 *  gridX: Number,
 *  gridY: Number,
 *  gridId: Number
 *  lat: Number,
 *  lng: Number,
 *  formattedAddress: String
 * }
 */
export const getAddress = async (address) => {
  let googleAddress = await getFuzzyAddressInfo(address);
  let latitude = googleAddress.geometry.location.lat;
  let longitude = googleAddress.geometry.location.lng;
  let forecastEndpoints = await getForecastEndpoints(latitude, longitude);
  return {
    formattedAddress: googleAddress.formatted_address,
    lat: googleAddress.geometry.location.lat,
    lng: googleAddress.geometry.location.lng,
    placeId: googleAddress.place_id,
    ...forecastEndpoints,
  };
};
