import { createApp } from 'vue'
import App from './components/App.vue';
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { createPinia } from 'pinia';
import { createVueWait } from 'vue-wait'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)
const pinia = createPinia()
const VueWait = createVueWait()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(VueWait)
app.use(VueSweetalert2);

router.isReady().then(() => {
    app.mount("#app");
  });

// app.mount('#app')
