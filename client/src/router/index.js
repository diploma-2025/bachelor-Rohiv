import {createRouter, createWebHistory} from "vue-router";
import AppAuthPage from "@/pages/AppAuthPage.vue";
import AppMainPage from "@/pages/AppMainPage.vue";

const routes = [
    {
        path: "/",
        name: "Auth",
        component: AppAuthPage,
    },
    {
        path: "/main",
        name: "Main",
        component: AppMainPage,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
