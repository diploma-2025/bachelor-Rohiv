<template>
  <v-dialog
      v-model="popup.isOpen"
      max-width="400px"
  >
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        <h4 class="text-center">{{ title }}</h4>
        <v-btn icon @click="closePopup" elevation="0">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <component
            :is="popup.name"
            v-if="popup.name"
            v-bind="popup.extra || {}"
            @updateTitle="updateTitle"
            @closePopup="closePopup"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import CreateAppointmentPopUp from "@/components/popups/appointment/CreateAppointmentPopUp.vue";
import CreateUserPopUp from "@/components/popups/user/CreateUserPopUp.vue";
import CreatePatientPopUp from "@/components/popups/patients/CreatePatientPopUp.vue";
import UpdateUserPopUp from "@/components/popups/user/UpdateUserPopUp.vue";
import UpdatePatientPopUp from "@/components/popups/patients/UpdatePatientPopUp.vue";
import DeleteUserPopUp from "@/components/popups/user/DeleteUserPopUp.vue";
import DeletePatientPopUp from "@/components/popups/patients/DeletePatientPopUp.vue";

export default {
  name: "AppMainPopup",
  components: {
    CreateAppointmentPopUp,
    CreateUserPopUp,
    CreatePatientPopUp,
    UpdateUserPopUp,
    UpdatePatientPopUp,
    DeleteUserPopUp,
    DeletePatientPopUp
  },
  data() {
    return {
      title: "Заголовок"
    }
  },
  computed: {
    popup() {
      return this.$store.getters.getPopup
    },
  },
  methods: {
    closePopup() {
      this.$store.commit("clearPopup")
    },
    updateTitle(newTitle) {
      this.title = newTitle
    }
  },
};
</script>
