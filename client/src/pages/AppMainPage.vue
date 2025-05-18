<template>
  <AppHeader/>
  <v-col class="d-flex overflow-hidden" style="height: 90vh" fluid>
    <AppSchedule v-if="user?.role !== 1"/>
    <v-col class="border-md overflow-hidden mt-3 pa-0 rounded">
      <AppUsers v-if="activeTab.id === 1"/>
      <AppAppointment v-if="activeTab.id === 2"/>
      <AppPatients v-if="activeTab.id === 3"/>
      <AppPatientInfo v-if="activeTab.id === 4"/>
    </v-col>
  </v-col>
</template>

<script>
import AppHeader from "@/components/headers/AppHeader.vue"
import AppSchedule from "@/components/headers/AppSchedule.vue";
import AppUsers from "@/components/tabs/AppUsers.vue";
import AppAppointment from "@/components/tabs/AppAppointment.vue";
import AppPatients from "@/components/tabs/AppPatients.vue";
import AppPatientInfo from "@/components/tabs/AppPatientInfo.vue";

export default {
  name: "AppMainPage",
  components: {AppHeader, AppSchedule, AppUsers, AppAppointment, AppPatients, AppPatientInfo},
  computed: {
    user: {
      get() {
        return this.$store.getters.getUser;
      }
    },
    activeTab() {
      return this.$store.getters.getActiveTab
    },
  },
  mounted() {
    this.$store.dispatch("fetchData", {
      serverUrl: this.$serverUrl,
      path: 'patients',
      action: 'setPatients',
    })
  }
}
</script>

<style scoped>
</style>
