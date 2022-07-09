<template>
  <div id="app">
    <v-wait for="loadcontent">
      <loading
        v-model:active="isLoading"
        :is-full-page="fullPageLoader"
        :color="loaderColor"
        :blur="''"
      ></loading>

      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <a class="navbar-brand" href="">{{ appName }}</a>
        </div>
      </nav>

      <section class="py-4">
        <div class="container py-3 h-100">
          <div
            class="row d-flex justify-content-center align-items-center h-100"
          >
            <div class="col-md-8 col-lg-6 col-xl-4">
              <h3 class="mb-4 pb-2 fw-normal">Check the weather forecast</h3>
              <form @submit.prevent="onSubmit">
                <div class="input-group rounded mb-3">
                  <input
                    type="search"
                    class="form-control rounded"
                    placeholder="City"
                    aria-label="Search"
                    aria-describedby="search-addon"
                    v-model="v$.form.cityname.$model"
                  />
                  <div class="px-2">
                    <button
                      v-on:click="onSubmit"
                      :disabled="v$.form.$invalid"
                      class="btn btn-dark px-2"
                      type="button"
                    >
                      Check!
                    </button>
                  </div>
                </div>
              </form>

              <div class="mb-4 pb-2">
                <div
                  v-for="(option, index) in tempUnitOptions"
                  :key="index"
                  class="form-check form-check-inline"
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    :id="option.value"
                    :value="option.id"
                    v-model="tempUnit"
                    name="temperature_unit"
                    v-on:change="checkWhether"
                  />
                  <label class="form-check-label" :for="option.value">{{
                    option.value
                  }}</label>
                </div>
              </div>

              <weather-card
                :selected-unit="tempUnit"
                :unit-options="tempUnitOptions"
              />
            </div>
          </div>
        </div>
      </section>
    </v-wait>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import configValues from "../../vue.config";
import { ref, onMounted, computed } from "vue";
import { useGeolocationStore } from "../stores/geolocation";
import { useWeatherStore } from "../stores/weather";
import WeatherCard from "./WetherCard.vue";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

export default {
  setup() {
    const geolocationInstance = useGeolocationStore();
    const weatherInstance = useWeatherStore();

    return { geolocationInstance, weatherInstance, v$: useVuelidate() };
  },
  components: {
    Loading,
    WeatherCard,
  },

  validations() {
    return {
      form: {
        cityname: {
          required,
        },
      },
    };
  },

  data: () => ({
    appName: configValues.VUE_APP_ENV,
    layout: null,
    defaultLayout: "default",
    fullPageLoader: true,
    isLoading: true,
    loaderColor: "#FD6481",
    tempUnitOptions: [
      {
        id: 1,
        value: "Celsius",
        unit: "metric",
        symbol: "C",
        speed: "metre/sec",
      },
      {
        id: 2,
        value: "Farenheit",
        unit: "imperial",
        symbol: "F",
        speed: "miles/hour",
      },
    ],
    tempUnit: 1,
    form: {
      cityname: "",
    },
  }),

  computed: {
    latitude() {
      return this.geolocationInstance.latitude;
    },

    longitude() {
      return this.geolocationInstance.longitude;
    },

    city() {
      return this.geolocationInstance.city;
    },

    countryCode() {
      return this.geolocationInstance.countryCode;
    },
    dt() {
      return this.weatherInstance.dt;
    },
    sunrise() {
      return this.weatherInstance.sunrise;
    },
    sunset() {
      return this.weatherInstance.sunset;
    },
    temp() {
      return this.weatherInstance.temp;
    },
    feels_like() {
      return this.weatherInstance.feels_like;
    },
    pressure() {
      return this.weatherInstance.pressure;
    },
    humidity() {
      return this.weatherInstance.humidity;
    },
    dew_point() {
      return this.weatherInstance.dew_point;
    },
    uvi() {
      return this.weatherInstance.uvi;
    },
    clouds() {
      return this.weatherInstance.clouds;
    },
    visibility() {
      return this.weatherInstance.visibility;
    },
    wind_speed() {
      return this.weatherInstance.wind_speed;
    },
    wind_deg() {
      return this.weatherInstance.wind_deg;
    },
    main() {
      return this.weatherInstance.main;
    },
    description() {
      return this.weatherInstance.description;
    },
    icon() {
      return this.weatherInstance.icon;
    },
  },

  metaInfo() {
    const appName = configValues.VUE_APP_ENV;

    return {
      title: appName,
      titleTemplate: `%s · ${appName}`,
    };
  },

  created() {},
  mounted() {
    this.$wait.start("loadcontent");
    this.showLoader();
    let x = Math.floor(Math.random() * 24000 + 1);
    this.geolocationInstance.fetchRandomGeolocation(x);
    let tempSelectedOption = this.tempUnitOptions.findIndex(
      (item) => item.id === this.tempUnit
    );
    this.weatherInstance.fetchWeather({
      lat: this.latitude,
      lon: this.longitude,
      unit: this.tempUnitOptions[tempSelectedOption].unit,
    });
    this.hideLoader();
    this.$wait.end("loadcontent");
  },

  methods: {
    async checkWhether() {
      this.showLoader();
      let tempSelectedOption = this.tempUnitOptions.findIndex(
        (item) => item.id === this.tempUnit
      );
      await this.weatherInstance.fetchWeather({
        lat: this.latitude,
        lon: this.longitude,
        unit: this.tempUnitOptions[tempSelectedOption].unit,
      });
      this.hideLoader();
    },

    async onSubmit() {
      this.showLoader();
      await this.geolocationInstance.fetchGeolocation(this.form.cityname);
      let tempSelectedOption = this.tempUnitOptions.findIndex(
        (item) => item.id === this.tempUnit
      );
      await this.weatherInstance.fetchWeather({
        lat: this.latitude,
        lon: this.longitude,
        unit: this.tempUnitOptions[tempSelectedOption].unit,
      });
      this.hideLoader();
    },

    showLoader() {
      if (!this.isLoading) {
        this.isLoading = true;
      }
    },

    hideLoader() {
      if (this.isLoading) {
        this.isLoading = false;
      }
    },
  },
};
</script>


