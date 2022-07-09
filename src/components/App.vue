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

                <div class="input-group rounded mb-3">
                  <input
                    type="search"
                    class="form-control rounded"
                    placeholder="City"
                    aria-label="Search"
                    aria-describedby="search-addon"
                  />
                  <a href="#!" type="button">
                    <span
                      class="input-group-text border-0 fw-bold"
                      id="search-addon"
                    >
                      Check!
                    </span>
                  </a>
                </div>

                <div class="mb-4 pb-2">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="option1"
                      checked
                    />
                    <label class="form-check-label" for="inlineRadio1"
                      >Celsius</label
                    >
                  </div>

                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value="option2"
                    />
                    <label class="form-check-label" for="inlineRadio2"
                      >Farenheit</label
                    >
                  </div>
                </div>

                <div class="card shadow-0 border">
                  <div class="card-body p-4">
                    <h4 class="mb-1 sfw-normal">New York, US</h4>
                    <p class="mb-2">
                      Current temperature: <strong>5.42°C</strong>
                    </p>
                    <p>Feels like: <strong>4.37°C</strong></p>
                    <p>
                      Max: <strong>6.11°C</strong>, Min: <strong>3.89°C</strong>
                    </p>

                    <div class="d-flex flex-row align-items-center">
                      <p class="mb-0 me-4">Scattered Clouds</p>
                    <img src="http://openweathermap.org/img/w/01n.png" height="80" width="100" alt="">
                      <!-- <i class="fas fa-cloud fa-3x" style="color: #eee"></i> -->
                    </div>
                  </div>
                </div>
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

export default {
  setup() {
    const geolocationInstance = useGeolocationStore();
    const weatherInstance = useWeatherStore();

    return { geolocationInstance, weatherInstance };
  },
  components: {
    Loading,
  },

  data: () => ({
    appName: configValues.VUE_APP_ENV,
    layout: null,
    defaultLayout: "default",
    fullPageLoader: true,
    isLoading: false,
    loaderColor: "#FD6481",
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
    console.log("lat", this.latitude);
    console.log("long", this.longitude);
    this.weatherInstance.fetchWeather({
      lat: this.latitude,
      lon: this.longitude,
    });
    this.hideLoader();
    this.$wait.end("loadcontent");
  },

  methods: {
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


