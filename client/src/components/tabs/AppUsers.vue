<script>
import AppSearchTable from "@/components/tables/AppSearchTable.vue";

export default {
  name: "AppUsers",
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
        {title: "Пошта", value: "email"},
        {title: "Роль", value: "role"},
        ...(this.canEdit ? [{title: "Дії", key: "actions", align: "center", sortable: false}] : []),
      ];
    },
    user() {
      return this.$store.getters.getUser;
    },
    users: {
      get() {
        return this.$store.getters.getUsers;
      }
    },
  },
  watch: {
    user: {
      handler(user) {
        this.canEdit = user.tabs[0].canEdit
      }
    }
  },
  mounted() {
    this.$store.dispatch("fetchData", {
      serverUrl: this.$serverUrl,
      path: this.user?.role === 1 ? 'users' : "users/nurse",
      action: 'setUsers',
    })
  },
};
</script>

<template>
  <AppSearchTable
      :headers="headers"
      :data="users"
      :plus-button="this.canEdit ? 'CreateUserPopUp' : null"
      :edit-button="this.canEdit ? 'UpdateUserPopUp' : null"
      :delete-button="this.canEdit ? 'DeleteUserPopUp' : null"
  />
</template>
