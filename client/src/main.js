import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import {loadFonts} from "./plugins/webfontloader";

loadFonts();

const app = createApp(App);

app.config.globalProperties.$serverUrl = `http://${process.env.VUE_APP_SERVER_HOST}:${process.env.VUE_APP_SERVER_PORT}`;

app
    .use(router)
    .use(store)
    .use(vuetify)
    .mount("#app");
