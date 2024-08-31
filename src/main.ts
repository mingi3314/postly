import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();

app.use(router); // Use the router
app.use(pinia); // Register Pinia with the Vue app

app.mount("#app");
