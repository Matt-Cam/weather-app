import axios from "axios";
const GOOGLE_API_KEY = "AIzaSyBg_W3POXpjxxIsEKQUr7ca2-rb2pS8y1U";

/**
 * Returns an formal address object from google api, with fuzzy matching, based on user typed text
 * @param  {String} address user inputted text representing a zip code or some address.
 * Works with fuzzy matching. The more detailed the text (ie city, town, streetaddress), the more accurate the response.
 * @return {Object}      A single address object
 */
export const getFuzzyAddressInfo = (address) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`;
  // this fuzzy get can return multiple matches, here we simply return the first result
  return axios.get(url).then((res) => res.data.results[0]);
};
