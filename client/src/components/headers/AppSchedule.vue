<script>
import {DatePicker} from 'v-calendar'
import 'v-calendar/style.css'

export default {
  name: 'AppSchedule',
  components: {DatePicker},
  computed: {
    date: {
      get() {
        return this.$store.getters.getScheduleDate;
      },
      set(newDate) {
        this.$store.commit('setDate', newDate);
      }
    },
    appointments() {
      return this.$store.getters.getAppointments;
    }
  },
  data() {
    return {
      dateKey: 0,
      lastMonth: null,
    };
  },
}
</script>

<template>
  <v-col cols="2" class="bg-white d-flex flex-column align-center ga-5">
    <DatePicker v-model="date" locale="uk" :is-required="true" :key="dateKey" style="width: 100%; max-width: 300px;"/>
    <v-col v-if="appointments.length" class="d-flex flex-column align-center ga-5 overflow-y-scroll">
      <h3>Прийоми</h3>
      <v-col
          v-for="(app, index) in appointments"
          :key="index"
          class="border-md rounded d-flex flex-column
          align-center justify-space-evenly text-center cursor-pointer"
          style="max-height: max-content; width: 100%"
      >
        <h4>{{ app.patient.username }}</h4>
        <h5>{{ app.startTime }} - {{ app.endTime }}</h5>
      </v-col>
    </v-col>
    <v-col v-else class="text-center">
      <h3>Нема запланованих прийомів</h3>
    </v-col>
  </v-col>
</template>

<style scoped>
</style>
