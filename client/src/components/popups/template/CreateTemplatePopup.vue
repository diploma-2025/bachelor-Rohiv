<script>
import {fullNameValidator, phoneValidator} from "@/utils/format";

export default {
  name: 'CreateTemplatePopup',
  data() {
    return {
      title: 'Створити шаблон',
      form: {
        templateName: null,
        templateStreet: null,
        templatePhone: [],
      },
      newPhone: "",
      errors: {
        templateNameError: false,
        templateStreetError: false,
        templatePhoneError: false,
        newPhoneErrors: false,
      },
    }
  },
  methods: {
    addPhone() {
      if (!phoneValidator(this.newPhone) && !this.form.templatePhone.includes(this.newPhone)) {
        this.form.templatePhone.push(this.newPhone);
        this.newPhone = "";
      } else {
        this.errors.newPhoneErrors = true;
      }
    },
    submitForm() {
      this.errors.templateNameError = !this.form.templateName
      this.errors.templateStreetError = !this.form.templateStreet
      this.errors.templatePhoneError = !this.form.templatePhone

      if (!this.errors.usernameErrors && !this.errors.templateStreetError && !this.errors.templatePhoneError)
        this.$store.dispatch('createData', {
          serverUrl: this.$serverUrl,
          path: 'templates',
          body: {
            templateName: this.form.templateName,
            templateStreet: this.form.templateStreet,
            templatePhone: this.form.templatePhone,
          },
          action: 'setTemplate',
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
        label="Назва Закладу"
        variant="outlined"
        type="text"
        class="w-75"
        v-model="form.templateName"
        :error-messages="errors.templateNameError ? ['Назва шаблону неможе бути пустою']: []"
        :error="errors.templateNameError"
    />
    <v-text-field
        label="Адреса  Закладу"
        variant="outlined"
        type="text"
        class="w-75"
        v-model="form.templateStreet"
        :error-messages="errors.templateStreetError ? ['Вулиця неможе бути пустою']: []"
        :error="errors.templateStreetError"
    />
    <v-select
        v-model="form.templatePhone"
        :items="form.templatePhone"
        label="Номер телефону"
        variant="outlined"
        multiple
        chips
        class="w-75"
        :error-messages="errors.templatePhoneError? ['Вкажіть коректно номер телефону']: []"
        :error="errors.templatePhoneError"
    >
      <template v-slot:append-item>
        <v-text-field
            v-model="newPhone"
            label="Додати номер"
            @keydown.enter="addPhone"
            clearable
            :error-messages="errors.newPhoneErrors ? ['Вкажіть коректно номер телефону']: []"
            :error="errors.newPhoneErrors"
        />
      </template>
    </v-select>
    <v-btn type="submit" color="primary" class="mt-4 w-50">
      Зберегти
    </v-btn>
  </v-form>
</template>

<style scoped>

</style>
