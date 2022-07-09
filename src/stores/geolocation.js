// stores/geolocation.js
import { defineStore } from "pinia";
// Import axios to make HTTP requests
import axios from "axios";
import configValues from "../../vue.config";

export const useGeolocationStore = defineStore("geolocation", {
  persist: true,

  state: () => ({
    latitude: "",
    longitude: "",
    city: "",
    countryCode:'',
    state:''
  }),
  getters: {},
  actions: {
    async fetchGeolocation(payload) {
      try {
        let locationUrl =
          configValues.VUE_APP_GEO_API_URL +
          "?q=" +
          payload +
          "&limit=5&appid=" +
          configValues.API_KEY;
        const data = await axios.get(locationUrl);
        let payloadData = {
          latitude: data.data[0].lat,
          longitude: data.data[0].lon,
          city: data.data[0].name,
          countryCode:data.data[0].country,
        };
        this.updateGeLocation(payloadData);
      } catch (error) {
        console.log("error", error);
      }
    },
    updateGeLocation(payload) {
      this.latitude = payload.latitude;
      this.longitude = payload.longitude;
      this.city = payload.city;
      this.countryCode = payload.countryCode
    },
    async fetchRandomGeolocation(payload) {
      try {
        let locationUrl =
          configValues.VUE_APP_GEO_DB_API +
          "?limit=1&offset=" +
          payload +
          "&hateoasMode=off";
        const data = await axios.get(locationUrl);
        let payloadData = {
          latitude: data.data.data[0].latitude,
          longitude: data.data.data[0].longitude,
          city: data.data.data[0].city,
          countryCode:data.data.data[0].countryCode,
        };
        this.updateGeLocation(payloadData);
      } catch (error) {
        console.log("error", error);
      }
    },
  },
});
