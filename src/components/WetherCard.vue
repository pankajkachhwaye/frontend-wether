<template>
  <div class="card shadow-0 border">
    <div class="card-body p-4">
      <h4 class="mb-1 sfw-normal">{{ this.city }}, {{ this.country }}</h4>
      <p class="mb-2">
        Current temperature: <strong>{{ this.temp }}°{{ unitSymbol }}</strong>
      </p>
      <p>
        Feels like: <strong>{{ this.feels_like }}°{{ unitSymbol }}</strong>
      </p>
      <p>
        Humidity: <strong>{{ humidity }}%</strong>,
        <br />
        Wind Speed:<strong>{{ wind_speed }}°{{ speedUnit }}</strong>
      </p>

      <div class="d-flex flex-row align-items-center">
        <p class="mb-0 me-4">{{ description }}</p>
        <img :src="weatherIcon" height="80" width="80" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { useGeolocationStore } from "../stores/geolocation";
import { useWeatherStore } from "../stores/weather";

// https://github.com/nuxt/nuxt.js/blob/master/lib/app/components/nuxt-loading.vue
export default {
  setup() {
    const geolocationInstance = useGeolocationStore();
    const weatherInstance = useWeatherStore();

    return { geolocationInstance, weatherInstance };
  },
  data: () => ({}),

  props: {
    selectedUnit: Number,
    unitOptions: Object,
  },

  computed: {
    weatherIcon() {
      return `http://openweathermap.org/img/w/${this.icon}.png`;
    },
    unitSymbol() {
      let tempSelectedOption = this.unitOptions.findIndex(
        (item) => item.id === this.selectedUnit
      );
      return this.unitOptions[tempSelectedOption].symbol;
    },
    speedUnit() {
      let tempSelectedOption = this.unitOptions.findIndex(
        (item) => item.id === this.selectedUnit
      );
      return this.unitOptions[tempSelectedOption].speed;
    },
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
    country() {
      var isFirefox = typeof InstallTrigger !== "undefined";

      // Safari 3.0+ "[object HTMLElementConstructor]"
      var isSafari =
        /constructor/i.test(window.HTMLElement) ||
        (function (p) {
          return p.toString() === "[object SafariRemoteNotification]";
        })(
          !window["safari"] ||
            (typeof safari !== "undefined" && window["safari"].pushNotification)
        );
      if (isFirefox || isSafari) {
        return this.countryCode;
      } else {
        let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
        return regionNames.of(this.countryCode);
      }
    },
  },

  methods: {},
};
</script>
