<template>
  <v-form @submit.prevent="submitForm" ref="form" class="d-flex flex-column ga-5 align-center">
    <v-text-field
        class="w-75"
        label="Дата"
        variant="outlined"
        v-model="form.date"
        type="date"
        required
        :min="minDate"
        :error-messages="dateError ? ['Виберіть дату'] : []"
    />
    <v-select
        class="w-75"
        label="Час початку"
        variant="outlined"
        :items="filteredStartTimes"
        v-model="form.startTime"
        required
        :error-messages="startTimeError ? ['Виберіть час початку'] : []"
        :min="minTime"
    />
    <v-select
        class="w-75"
        label="Час завершення*"
        variant="outlined"
        v-model="form.endTime"
        :items="filteredEndTimes"
        :error-messages="endTimeError ? ['Кінцева година менша ніж початкова'] : []"
        :error="endTimeError"
        :min="form.startTime"
    />
    <v-autocomplete
        class="w-75"
        label="Пацієнт"
        variant="outlined"
        :items="patients"
        item-title="username"
        item-value="id"
        v-model="form.patient"
        :error-messages="patientError ? ['Виберіть пацієнта,або створіть нового'] : []"
        :error="patientError"
    />
    <v-btn type="submit" color="primary" class="mt-4 w-50">
      Зберегти
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: "AppointmentForm",
  mounted() {
    this.$emit("updateTitle", this.title);
  },
  data() {
    return {
      title: "Записати на прийом",
      form: {
        date: new Date().toISOString().split("T")[0],
        startTime: null,
        endTime: null,
        patient: null
      },
      timeOptions: [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
        "15:00", "15:30", "16:00"
      ],
      minDate: new Date().toISOString().split("T")[0],
      minTime: new Date().toLocaleTimeString('uk-UK').slice(0, 5),
      dateError: false,
      startTimeError: false,
      endTimeError: false,
      patientError: false,
    };
  },
  computed: {
    filteredStartTimes() {
      const currentDate = new Date(this.form.date);
      const currentTime = new Date();
      const isToday = currentDate.toDateString() === currentTime.toDateString();

      if (isToday) {
        return this.timeOptions.filter(time => time >= this.minTime);
      }
      return this.timeOptions;
    },
    filteredEndTimes() {
      if (this.form.startTime) {
        const startIndex = this.timeOptions.indexOf(this.form.startTime);
        return this.timeOptions.slice(startIndex + 1);
      }
      return this.timeOptions;
    },
    patients: {
      get() {
        return this.$store.getters.getPatients
      }
    }
  },
  methods: {
    submitForm() {
      this.dateError = !this.form.date;
      this.startTimeError = !this.form.startTime;
      this.endTimeError = this.form.startTime !== null ? this.form.endTime <= this.form.startTime : false;
      this.patientError = !this.form.patient;

      if (!this.dateError && !this.startTimeError && !this.endTimeError && !this.patientError)
        this.$store.dispatch('createData', {
          serverUrl: this.$serverUrl,
          path: 'appointments',
          body: {
            date: this.form.date,
            startTime: this.form.startTime,
            endTime: this.form.endTime ||
                `${(parseInt(this.form.startTime.split(":")[0]) + 1) % 24}`.padStart(2, "0") + ":" + this.form.startTime.split(":")[1],
            patientId: this.form.patient,
          },
          query: {
            date: this.$store.getters.getScheduleDate
          },
          action: 'setAppointments',
        })
    },
  }
};
</script>

<style scoped>
</style>
