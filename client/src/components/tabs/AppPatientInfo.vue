<script>
export default {
  name: 'AppPatientInfo',
  computed: {
    patient() {
      return this.$store.getters.getPatient;
    },
    activeTab() {
      return this.$store.getters.getActiveTab;
    }
  },
  mounted() {
    this.$store.dispatch("fetchData", {
      serverUrl: this.$serverUrl,
      path: '/patients/patient',
      query: {
        patientId: this.$store.getters.getPatientId,
      },
      action: 'setPatient',
    })
  },
}
</script>

<template>
  <div>{{ patient }}</div>
</template>

<style scoped>

</style>
