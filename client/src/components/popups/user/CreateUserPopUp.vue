<script>
import {fullNameValidator} from "@/utils/format";

export default {
  name: "CreateUserPopUp",
  data() {
    return {
      title: 'Створити користувача',
      form: {
        email: null,
        username: null,
        role: null,
      },
      errors: {
        emailErrors: false,
        usernameErrors: false,
        roleErrors: false,
      },
    }
  },
  methods: {
    submitForm() {
      console.log(this.user)
      this.errors.emailErrors = !this.form.email
      this.errors.usernameErrors = !this.form.username
          || fullNameValidator(this.form.username)
      this.errors.roleErrors = !this.form.role

      if (!this.errors.emailErrors && !this.errors.usernameErrors && !this.errors.roleErrors)
        this.$store.dispatch('createData', {
          serverUrl: this.$serverUrl,
          path: this.user.role === 1 ? 'users' : 'users/nurse',
          body: {
            email: this.form.email,
            username: this.form.username,
            roleId: this.form.role,
          },
          action: 'setUsers'
        })
    },
  },
  computed: {
    roles: {
      get() {
        return this.$store.getters.getRoles
      }
    },
    user() {
      return this.$store.getters.getUser
    }
  },
  mounted() {
    this.$emit("updateTitle", this.title)
    this.$store.dispatch('fetchData', {serverUrl: this.$serverUrl, path: 'roles', action: 'setRoles'})
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
    />
    <v-text-field
        label="Пошта"
        variant="outlined"
        type="email"
        class="w-75"
        v-model="form.email"
        :error-messages="errors.emailErrors ? ['Вкажіть пошту'] : []"
    />
    <v-select
        :items="roles"
        item-title="name"
        item-value="id"
        variant="outlined"
        label="Роль"
        class="w-75"
        v-model="form.role"
        :error-messages="errors.roleErrors ? ['Вкажіть роль'] : []"
    />
    <v-btn type="submit" color="primary" class="mt-4 w-50">
      Зберегти
    </v-btn>
  </v-form>
</template>

<style scoped>

</style>
