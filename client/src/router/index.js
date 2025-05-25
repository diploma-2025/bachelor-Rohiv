// router/index.js
import {createRouter, createWebHistory} from "vue-router";
import AppAuthPage from "@/pages/AppAuthPage.vue";
import AppMainPage from "@/pages/AppMainPage.vue";
import AppPatientInfo from "@/components/tabs/AppPatientInfo.vue";
import AppPatients from "@/components/tabs/AppPatients.vue";
import AppAppointment from "@/components/tabs/AppAppointment.vue";
import AppUsers from "@/components/tabs/AppUsers.vue";

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
        children: [
            {
                path: 'users',
                name: 'Users',
                component: AppUsers,
            },
            {
                path: 'appointments',
                name: 'Appointments',
                component: AppAppointment,
            },
            {
                path: 'patients',
                name: 'Patients',
                component: AppPatients,
            },
            {
                path: 'patient-info',
                name: 'PatientInfo',
                component: AppPatientInfo,
            },
        ],
        redirect: {name: 'Appointments'}
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
