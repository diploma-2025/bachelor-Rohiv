<script>
export default {
  name: "AppSearchTable",
  props: {
    headers: Array,
    data: {
      type: Array,
      default: () => [],
    },
    plusButton: String,
    editButton: String,
    infoButton: String,
    deleteButton: String
  },
  methods: {
    selectPatient(patientId) {
      this.$store.commit("setPatientId", patientId)
      this.$store.commit("setActiveTab", {id: 4});
    }
  },
  data() {
    return {
      search: null,
    };
  },
  computed: {
    activeTab: {
      get() {
        return this.$store.getters.getActiveTab;
      }
    },
    filteredData() {
      if (!this.search) return this.data
      const searchLower = this.search.toLowerCase()

      return this.data.filter((item) => {
        return this.headers.some((header) => {
          const field = header.value
          if (field && item[field]) return item[field].toString().toLowerCase().includes(searchLower)
          return false
        })
      })
    }
  },
};
</script>

<template>
  <v-row>
    <v-col>
      <v-text-field
          variant="solo"
          flat
          v-model="search"
          label="Шукати"
          hide-details
          prepend-inner-icon="mdi-magnify"
      />
    </v-col>
    <v-col v-if="plusButton" class="mt-1 text-end mr-3" cols="1">
      <v-btn
          icon
          @click="$store.commit('setPopup', { isOpen: true, name: this.plusButton })"
          color="primary"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-col>
  </v-row>
  <v-data-table-virtual
      :items="filteredData"
      :headers="headers"
      class="h-100"
      :fixed-header="true"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <v-col>
        <v-btn
            v-if="activeTab?.id === 3"
            icon
            elevation="0"
            @click="selectPatient(item.id)"
        >
          <v-icon>mdi-account-box</v-icon>
        </v-btn>
        <v-btn icon elevation="0"
               @click="this.$store.commit('setPopup', {
                 isOpen: true,
                 name: editButton,
                 extra: {id: item.id, username: item.username, role: item.role, phone: item.phone}
               })">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon elevation="0"
               @click="this.$store.commit('setPopup', {
                 isOpen: true,
                 name: deleteButton,
                 extra: {id: item.id, username: item.username}
               })">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-col>
    </template>
  </v-data-table-virtual>
</template>
