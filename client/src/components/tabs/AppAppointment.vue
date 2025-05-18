<script>
import {format} from "date-fns"
import {uk} from "date-fns/locale"
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

export default {
  name: "AppAppointment",
  components: {
    VueCal
  },
  methods: {
    format,
    changeDate(direction) {
      const currentDate = new Date(this.$store.getters.getScheduleDate)
      currentDate.setDate(currentDate.getDate() + (direction === 'left' ? -1 : 1))
      this.$store.commit('setDate', currentDate)
    },
    selectPatient(event, e) {
      e.stopPropagation()
      this.$store.commit("setPatientId", event?.patientId)
      this.$store.commit("setActiveTab", {id: 4});
    }
  },
  computed: {
    week() {
      const dayOfWeek = format(new Date(this.date), 'EEEE', {locale: uk})
      return dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)
    },
    uk() {
      return uk
    },
    date: {
      get() {
        return this.$store.getters.getScheduleDate
      }
    },
    appointment() {
      return this.$store.getters.getAppointments.map((appointment) => {
        const startDate = new Date(this.date)
        const [startHour, startMinute] = appointment.startTime.split(':').map(Number)
        startDate.setHours(startHour, startMinute);
        startDate.setSeconds(0)
        startDate.setMilliseconds(0)

        const endDate = new Date(this.date)
        const [endHour, endMinute] = appointment.endTime.split(':').map(Number)
        endDate.setHours(endHour, endMinute);
        endDate.setSeconds(0)
        endDate.setMilliseconds(0)

        const hour = parseInt(appointment.startTime.split(':')[0]);

        return {
          start: startDate,
          end: endDate,
          title: appointment.patient.username,
          patientId: appointment.patient.id,
          class: `time-${hour}`
        };
      })
    }
  },
  mounted() {
    this.$store.dispatch("fetchData", {
      serverUrl: this.$serverUrl,
      path: 'appointments',
      query: {
        date: this.$store.getters.getScheduleDate,
      },
      action: 'setAppointments'
    })
  },
}
</script>

<template>
  <v-col class="d-flex pa-2 align-center justify-center">
    <v-col cols="2" class="text-center">
      <h2>{{ week }}</h2>
    </v-col>
    <v-col cols="6" class="d-flex align-center justify-center ga-5">
      <v-btn @click="changeDate('left')" icon large elevation="0">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h2 class="text-center">{{ format(new Date(date), 'dd MMM', {locale: uk}) }}</h2>
      <v-btn @click="changeDate('right')" icon large elevation="0">
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="2">
      <h2>{{ format(new Date(date), 'yyyy', {locale: uk}) }}</h2>
    </v-col>
  </v-col>
  <vue-cal
      locale="uk"
      :hide-view-selector="true"
      :hide-title-bar="true"
      :selected-date="date"
      :timeFrom="9 * 60"
      :timeTo="17 * 60"
      :timeCellHeight="60"
      active-view="day"
      time-format="HH:mm"
      :events="appointment"
      :time-step="30"
      @event-dblclick="selectPatient"
  />
</template>

<style>
.vuecal__event {
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  cursor: pointer;
  user-select: none;
}

.vuecal__event.time-8 {
  background-color: #A4C19C !important;
}

.vuecal__event.time-9 {
  background-color: #E1B57E !important;
}

.vuecal__event.time-10 {
  background-color: #A2D9E2 !important;
}

.vuecal__event.time-11 {
  background-color: #F1A7A1 !important;
}

.vuecal__event.time-12 {
  background-color: #D0B1E0 !important;
}

.vuecal__event.time-13 {
  background-color: #E0E2B0 !important;
}

.vuecal__event.time-14 {
  background-color: #B5B69E !important;
}

.vuecal__event.time-15 {
  background-color: #9F92D1 !important;
}

.vuecal__event.time-16 {
  background-color: #D1B6A1 !important;
}

.vuecal__event.time-17 {
  background-color: #8F9AE1 !important;
}

.vuecal__event.time-default {
  background-color: #D0E4D5 !important;
}
</style>
