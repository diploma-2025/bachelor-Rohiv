<template>
  <v-app-bar app elevation="0">
    <v-row class="d-flex align-center justify-space-around" no-gutters>
      <v-btn
          v-if="user?.role !== 1"
          color="black"
          class="font-weight-bold"
          size="large"
          style="margin-left: -28px;"
          elevation="3"
          @click="this.$store.commit('setPopup', {name: 'CreateAppointmentPopUp', isOpen: true})"
      >
        Записати
      </v-btn>
      <v-col v-if="user?.tabs?.length" cols="5" class="d-flex justify-center ga-5">
        <v-btn v-for="tab in user.tabs" :key="tab.id"
               :class="{ 'v-btn--active': activeTab.id === tab.id }"
               @click="activeTab = tab"
        >
          {{ tab.name }}
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props">
              <span>{{ user?.username }}</span>
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="() => {}">
              <v-list-item-title>Налаштування</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logOut">
              <v-list-item-title class="text-red">Вийти</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>

export default {
  name: 'AppHeader',
  computed: {
    user: {
      get() {
        return this.$store.getters.getUser
      }
    },
    activeTab: {
      get() {
        return this.$store.getters.getActiveTab
      },
      set(value) {
        this.$store.commit('setActiveTab', value)
      }
    }
  },
  methods: {
    logOut() {
      sessionStorage.removeItem('accessToken')
      this.$store.commit("clearStore")
      this.$router.push({name: 'Auth'})
    }
  }
}
</script>

<style scoped>
.v-btn--active {
  background-color: lightblue;
}
</style>
