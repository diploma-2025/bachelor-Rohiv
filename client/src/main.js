import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import {loadFonts} from "./plugins/webfontloader";

loadFonts();

const app = createApp(App);

app.config.globalProperties.$serverUrl = process.env.VUE_APP_SERVER_URL
app.config.globalProperties.$clientUrl = process.env.VUE_APP_CLIENT_URL
app.config.globalProperties.$monoUrl = process.env.VUE_APP_MONO_URL;
app.config.globalProperties.$monoXsign = process.env.VUE_APP_MONO_XSIGN
app
    .use(router)
    .use(store)
    .use(vuetify)
    .mount("#app");
