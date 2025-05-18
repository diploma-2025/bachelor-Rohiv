<script>
import {fullNameValidator, phoneValidator} from "@/utils/format";

export default {
  name: "UpdatePatientPopUp",
  data() {
    return {
      title: "Редагування даних пацієнта",
      form: {
        username: this.username,
        phone: this.phone,
      },
      newPhone: "",
      errors: {
        usernameErrors: false,
        phoneErrors: false,
        newPhoneErrors: false,
      },
    }
  },
  props: {
    id: {
      type: Number,
      default: null
    },
    username: {
      type: String,
      default: null
    },
    phone: {
      type: String,
      required: true
    }
  },
  methods: {
    addPhone() {
      if (!phoneValidator(this.newPhone) && !this.form.phone.includes(this.newPhone)) {
        this.form.phone.push(this.newPhone);
        this.newPhone = "";
      } else {
        this.errors.newPhoneErrors = true;
      }
    },
    submitForm() {
      this.errors.usernameErrors = !this.form.username
          || fullNameValidator(this.form.username)

      this.errors.phoneErrors = !this.form.phone

      if (!this.errors.usernameErrors && !this.errors.phoneErrors)
        this.$store.dispatch('updateData', {
          serverUrl: this.$serverUrl,
          path: 'patients',
          body: {
            patientId: this.id,
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
          v-model="form.username"
          label="ПІБ"
          variant="outlined"
          type="text"
          class="w-75"
          :error-messages="errors.usernameErrors ? ['Вкажіть коректно ПІБ']: []"
          :error="errors.usernameErrors"
      />
    <v-select
        v-model="form.phone"
        :items="form.phone"
        label="Номер телефону"
        variant="outlined"
        multiple
        chips
        class="w-75"
        :error-messages="errors.phoneErrors ? ['Вкажіть коректно номер телефону']: []"
        :error="errors.phoneErrors"
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
    <v-btn
        color="primary"
        class="w-50 mt-4"
        type="submit"
    >
      Зберегти
    </v-btn>
  </v-form>
</template>
