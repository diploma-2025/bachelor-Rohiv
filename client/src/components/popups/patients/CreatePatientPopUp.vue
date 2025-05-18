<script>
import {fullNameValidator, phoneValidator} from "@/utils/format";

export default {
  name: "CreatePatientPopUp",
  data() {
    return {
      title: 'Створити пацієнта',
      form: {
        username: null,
        phone: null,
      },
      errors: {
        usernameErrors: false,
        phoneErrors: false,
      },
    }
  },
  methods: {
    submitForm() {
      this.errors.usernameErrors = !this.form.username
          || fullNameValidator(this.form.username)

      this.errors.phoneErrors = !this.form.phone || phoneValidator(this.form.phone)

      if (!this.errors.usernameErrors && !this.errors.phoneErrors)
        this.$store.dispatch('createData', {
          serverUrl: this.$serverUrl,
          path: 'patients',
          body: {
            username: this.form.username,
            phone: this.form.phone,
          },
          action: 'setPatients',
        })
    },
  },
  mounted() {
    this.$emit("updateTitle", this.title)
  },
}

</script>

<template>
  <v-form class="d-flex flex-column align-center ga-5" @submit.prevent="submitForm">
    <v-text-field
        label="ПІБ"
        variant="outlined"
        type="text"
        class="w-75"
        v-model="form.username"
        :error-messages="errors.usernameErrors ? ['Вкажіть коректно ПІБ']: []"
        :error="errors.usernameErrors"
    />
    <v-text-field
        label="Номер телефону"
        variant="outlined"
        type="text"
        class="w-75"
        v-model="form.phone"
        :error-messages="errors.phoneErrors ? ['Вкажіть коректно номер телефону']: []"
        :error="errors.phoneErrors"
    />
    <v-btn type="submit" color="primary" class="mt-4 w-50">
      Зберегти
    </v-btn>
  </v-form>
</template>

<style scoped>

</style>