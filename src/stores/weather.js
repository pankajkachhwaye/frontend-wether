// stores/weather.js
import { defineStore } from "pinia";
// Import axios to make HTTP requests
import axios from "axios";
import configValues from "../../vue.config";

export const useWeatherStore = defineStore("weather", {
  persist: true,

  state: () => ({
    dt: "",
    sunrise: "",
    sunset: "",
    temp: "",
    feels_like: "",
    pressure: "",
    humidity: "",
    dew_point: "",
    uvi: "",
    clouds: "",
    visibility: "",
    wind_speed: "",
    wind_deg: "",
      main: "",
      description: "",
      icon: "",
    
  }),
  getters: {},
  actions: {
    async fetchWeather(payload) {
      try {
        let locationUrl = `${configValues.VUE_APP_WEATHER_API_URL}?lat=${payload.lat}&lon=${payload.lon}&exclude=hourly,daily,minutely,&appid=${configValues.API_KEY}`;
        const data = await axios.get(locationUrl);
        this.updateWether(data.data.current)
      } catch (error) {
        console.log("error", error);
      }
    },
    updateWether(data){
        this.dt = data.dt
        this.sunrise = data.sunrise,
        this.sunset = data.sunset,
        this.temp = data.temp,
        this.feels_like = data.feels_like,
        this.pressure = data.pressure,
        this.humidity = data.humidity,
        this.dew_point = data.dew_point,
        this.uvi = data.uvi,
        this.clouds = data.clouds,
        this.visibility = data.visibility,
        this.wind_speed = data.wind_speed,
        this.wind_deg = data.wind_deg,
        this.main = data.weather[0].main
        this.description = data.weather[0].description
        this.icon = data.weather[0].icon
    }
  },
});
