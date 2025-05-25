<template>
  <AppHeader/>
  <v-col class="d-flex overflow-hidden" style="height: 90vh" fluid>
    <AppSchedule v-if="user?.role !== 1"/>
    <v-col class="border-md overflow-hidden mt-3 pa-0 rounded">
      <v-col
          v-if="user?.tabs.find(tab => tab.routeName === $route.name).isBought === false"
          class="d-flex ga-5 flex-column align-center justify-center h-100 bg-grey-lighten-2"
      >
        <h1>Ви ще не купили цей модуль</h1>
        <v-btn @click="buyModule">Купити</v-btn>
      </v-col>
      <router-view v-else></router-view>
    </v-col>
  </v-col>
</template>

<script>
import AppHeader from "@/components/headers/AppHeader.vue"
import AppSchedule from "@/components/headers/AppSchedule.vue";

export default {
  name: "AppMainPage",
  components: {AppHeader, AppSchedule},
  computed: {
    user: {
      get() {
        return this.$store.getters.getUser;
      }
    },
  },
  methods: {
    async buyModule() {
      this.$store.dispatch("buyModule", {
        serverUrl: this.$serverUrl,
        tabId: this.user?.tabs.find(tab => tab.routeName === this.$route.name).id,
        redirectUrl: `${this.$clientUrl}/main`
      });
    }
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
