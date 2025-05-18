<style scoped>
</style>

<template>
  <v-app>
    <v-main>
      <v-progress-circular
          v-if="loading"
          indeterminate
          color="primary"
          size="64"
          class="ma-auto">
      </v-progress-circular>
      <router-view/>
      <AppMainPopup/>
    </v-main>
  </v-app>
</template>

<script>
import AppMainPopup from "@/components/popups/AppMainPopup.vue";

export default {
  name: "App",
  components: {AppMainPopup},
  watch: {
    '$route': function (to, from) {
      if (to.name !== 'Auth') {
        this.$store.dispatch("fetchData", {
          serverUrl: this.$serverUrl,
          router: this.$router,
          path: 'users/user',
          action: 'setUser',
        })
      }
    },
    '$store.state.date': function (newDate, oldDate) {
      if (newDate !== oldDate) {
        this.$store.dispatch("fetchData", {
          serverUrl: this.$serverUrl,
          path: 'appointments',
          query: {
            date: newDate,
          },
          action: 'setAppointments'
        })
      }
    },
    '$store.state.activeTab.id': function (newId, oldId) {
      if (oldId === 4) {
        this.$store.commit("clearPatient")
      }
    }
  }
};
</script>
