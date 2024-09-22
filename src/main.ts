import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import Lara from "./presets/lara";

const app = createApp(App);
const pinia = createPinia();

app.use(router); // Use the router
app.use(pinia); // Register Pinia with the Vue app
app.use(PrimeVue, {
  unstyled: true,
  pt: Lara,
});
app.mount("#app");
