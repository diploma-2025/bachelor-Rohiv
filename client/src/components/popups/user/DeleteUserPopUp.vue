<script>
export default {
  name: "DeleteUserPopUp",
  data() {
    return {
      title: 'Видалення користувача',
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
    }
  },
  mounted() {
    this.$emit("updateTitle", this.title)
  }
}

</script>

<template>
  <v-col class="text-center d-flex flex-column ga-5">
    <h3 class="text-red-accent-3">{{ username }}</h3>
    <v-row justify="center" class="mt-4 ga-5">
      <v-btn color="grey" @click="$emit('closePopup')">
        Скасувати
      </v-btn>
      <v-btn color="red" @click="this.$store.dispatch('deleteData', {
        serverUrl: this.$serverUrl,
        path: 'users',
        action: 'setUsers',
        body: {id: id}
      })"
      >
        Видалити
      </v-btn>
    </v-row>
  </v-col>
</template>

<style scoped>

</style>