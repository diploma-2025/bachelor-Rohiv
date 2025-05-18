<script>
import AppSearchTable from "@/components/tables/AppSearchTable.vue";

export default {
  name: "AppPatients",
  components: {AppSearchTable},
  computed: {
    headers() {
      return [
        {title: "ПІБ", value: "username"},
        {title: "Номер Телефону", value: "formatedPhone"},
        ...(this.canEdit ? [{title: "Дії", key: "actions", align: "center", sortable: false}] : []),
      ];
    },
    patients: {
      get() {
        return this.$store.getters.getPatients
      }
    },
    canEdit: {
      get() {
        return this.$store.getters.getActiveTab.canEdit
      }
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

<template>
  <AppSearchTable
      :headers="headers"
      :data="patients"
      :plus-button="this.canEdit ? 'CreatePatientPopUp' : null"
      :edit-button="this.canEdit ? 'UpdatePatientPopUp' : null"
      :delete-button="this.canEdit ? 'DeletePatientPopUp' : null"
  />
</template>

<style scoped>

</style>
