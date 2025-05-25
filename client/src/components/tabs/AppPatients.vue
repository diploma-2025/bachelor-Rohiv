<script>
import AppSearchTable from "@/components/tables/AppSearchTable.vue";

export default {
  name: "AppPatients",
  components: {AppSearchTable},
  data() {
    return {
      canEdit: false,
    }
  },
  computed: {
    headers() {
      return [
        {title: "ПІБ", value: "username"},
        {title: "Номер Телефону", value: "formatedPhone"},
        ...(this.canEdit ? [{title: "Дії", key: "actions", align: "center", sortable: false}] : []),
      ];
    },
    user() {
      return this.$store.getters.getUser;
    },
    patients: {
      get() {
        return this.$store.getters.getPatients
      }
    },
  },
  mounted() {
    this.$store.dispatch("fetchData", {
      serverUrl: this.$serverUrl,
      path: 'patients',
      action: 'setPatients',
    })
  },
  watch: {
    user: {
      handler(user) {
        this.canEdit = user?.tabs[2]?.canEdit
      }
    }
  },
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
