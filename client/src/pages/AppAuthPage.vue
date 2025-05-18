<template>
  <v-container class="auth-container fill-height" fluid>
    <v-row class="fill-height" align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="auth-card">
          <v-card-title>Авторизація</v-card-title>
          <v-form ref="form" v-model="valid" class="auth-form">
            <v-text-field
                v-model="email.value"
                label="Емейл"
                prepend-icon="mdi-email"
                :rules="[email.rules.required, email.rules.valid]"
                required
                ref="emailField"
                :error-messages="email.errors"
                @input="clearEmailErrors"
            />
            <v-text-field
                v-model="password.value"
                label="Пароль"
                type="password"
                prepend-icon="mdi-lock"
                :rules="[password.rules.required]"
                required
                ref="passwordField"
                :error-messages="password.errors"
                @input="clearPasswordErrors"
            />
            <v-btn :disabled="!valid" color="primary" block @click="handleLogin">
              Увійти
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AppAuthPage",
  data() {
    return {
      valid: false,
      email: {
        value: "",
        errors: [],
        rules: {
          required: (value) => !!value || "Емейл обов'язковий",
          valid: (value) => /.+@.+\..+/.test(value) || "Введіть правильний емейл",
        },
      },
      password: {
        value: "",
        errors: [],
        rules: {
          required: (value) => !!value || "Пароль обов'язковий",
        },
      },
    };
  },
  methods: {
    handleLogin() {
      fetch(`${this.$serverUrl}/users/authorization`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.email.value,
          password: this.password.value,
        })
      }).then(res => {
        if (!res.ok) {
          return res.json().then(errorData => {
            if (Array.isArray(errorData.errors)) {
              errorData.errors.forEach(error => {
                if (error.path === 'email') {
                  this.email.errors.push(error.msg)
                } else if (error.path === 'password') {
                  this.password.errors.push(error.msg)
                }
              })
              throw new Error("Погано вказані дані")
            } else {
              throw new Error(errorData.error || 'Щось пішло не так')
            }
          })
        }
        return res.json()
      }).then(data => {
        this.clearEmailErrors()
        this.clearPasswordErrors()
        sessionStorage.setItem('accessToken', data.accessToken)
        this.$router.push({name: 'Main'})
      }).catch(err => {
        alert(err)
      })
    },
    clearEmailErrors() {
      this.email.errors = []
    },
    clearPasswordErrors() {
      this.password.errors = []
    },
  },
}
</script>

<style scoped>
.auth-container {
  background: lightskyblue;
}

.auth-card {
  padding: 30px;
  border-radius: 8px;
}

.auth-form {
  margin-top: 2vw;

  > * {
    margin-bottom: 1.2vw;
  }
}
</style>
