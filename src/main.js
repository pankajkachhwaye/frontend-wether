import { createApp } from 'vue'
import App from './components/App.vue';
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { createPinia } from 'pinia';
import { createVueWait } from 'vue-wait'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()
const VueWait = createVueWait()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(VueWait)

router.isReady().then(() => {
    app.mount("#app");
  });

// app.mount('#app')
