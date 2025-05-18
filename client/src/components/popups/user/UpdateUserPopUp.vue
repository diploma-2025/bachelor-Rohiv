<script>
import {fullNameValidator} from "@/utils/format";

export default {
  name: "UpdateUserPopUp",
  data() {
    return {
      title: "Редагування користувача",
      localRole: this.role,
      initialRole: this.role,
      form: {
        username: this.username,
      },
      errors: {
        usernameErrors: false
      }
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
    role: {
      type: String,
      required: true
    }
  },
  methods: {
    submitForm() {
      this.errors.usernameErrors = !this.form.username || fullNameValidator(this.form.username);
      if (!this.errors.usernameErrors) {
        this.$store.dispatch('updateData', {
          serverUrl: this.$serverUrl,
          path: 'users',
          body: {
            userId: this.id,
            username: this.form.username,
            role: this.localRole
          },
          action: 'setUsers'
        })
      }
    }
  },
  computed: {
    roles() {
      return this.$store.getters.getRoles;
    },
  },
  mounted() {
    this.$emit("updateTitle", this.title)
    this.$store.dispatch('fetchData', {serverUrl: this.$serverUrl, path: 'roles', action: 'setRoles'});
  },
  watch: {
    localRole(newRole) {
      this.$emit('update:role', newRole);
    }
  }
}
</script>

<template>
  <v-form class="text-center d-flex flex-column align-center ga-5" @submit.prevent="submitForm">
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
        :items="roles"
        item-title="name"
        item-value="id"
        variant="outlined"
        label="Роль"
        class="w-75"
        v-model="localRole"
    />
    <v-btn
        color="primary"
        class="w-50 mt-4"
        type="submit"
    >
      Зберегти
    </v-btn>
  </v-form>
</template>
