<script>
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {formatPhoneNumber, formatDate} from "@/utils/format";

export default {
  name: 'AppPatientInfo',
  data() {
    return {
      isEditing: false,
      editedPatient: {},
      isTemplatePresent: false,
    };
  },
  computed: {
    patient() {
      return this.$store.getters.getPatient;
    },
    template() {
      return this.$store.getters.getTemplate;
    }
  },
  watch: {
    template: {
      handler(newTemplate) {
        this.isTemplatePresent = !!newTemplate && !!newTemplate.id;
      }
    }
  },
  mounted() {
    this.$store.dispatch("fetchData", {
      serverUrl: this.$serverUrl,
      path: 'templates',
      action: 'setTemplate',
    })

    this.$store.dispatch("fetchData", {
      serverUrl: this.$serverUrl,
      path: 'patients/patient',
      query: {
        patientId: this.$store.getters.getPatientId,
      },
      action: 'setPatient',
    })
  },
  methods: {
    formatPhoneNumber,
    formatDate,

    toggleEditMode() {
      if (this.isEditing) {
        this.savePatientData();
      } else {
        this.editedPatient = {...this.patient};
      }
      this.isEditing = !this.isEditing;
    },

    savePatientData() {
      this.$store.commit('setPatient', this.editedPatient);
    },

    async downloadPdf() {
      if (this.isEditing) return
      const element = document.getElementById('patient-info-content');
      if (!element) {
        console.error('Елемент з ID "patient-info-content" не знайдено.');
        alert('Помилка: Не вдалося знайти вміст для PDF.');
        return;
      }

      element.classList.add('pdf-scale-up');
      await new Promise(resolve => setTimeout(resolve, 50));

      try {
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(`Консультативна довідка - ${this.patient.username}.pdf`);

      } catch (error) {
        console.error('Помилка при створенні PDF:', error);
        alert('Помилка при створенні PDF: ' + error.message);
      } finally {
        element.classList.remove('pdf-scale-up');
      }
    },
  }
}
</script>

<template>
    <v-col v-if="isTemplatePresent" class="w-100 d-flex align-center">
      <v-col class="text-end">
        <v-btn icon elevation="0" @click="toggleEditMode">
          <v-icon>{{ isEditing ? 'mdi-check' : 'mdi-pencil' }}</v-icon>
        </v-btn>
        <v-btn icon elevation="0" :disabled="isEditing">
          <v-icon @click="downloadPdf">mdi-file-download</v-icon>
        </v-btn>
      </v-col>
    </v-col>
    <v-col
        v-if="isTemplatePresent"
        class="text-center"
        :class="{ 'overflow-y-scroll overflow-x-hidden': isEditing }"
        id="patient-info-content"
        style="height: 85%">
      <v-col>
        <h2>Приватний кабінет</h2>
        <h2>«{{ template.templateName?.toUpperCase() }}»</h2>
      </v-col>
      <v-col class="text-h7">
        {{ template.templateStreet?.toUpperCase() }}
      </v-col>
      <v-col>
        <h3>Попередній запис</h3>
        <h4 v-for="(phone, index) in template.templatePhone" :key="index"> {{ formatPhoneNumber(phone) }} </h4>
      </v-col>
      <v-col>
        <h2>Консультативна довідка</h2>
      </v-col>
      <v-col class="d-flex flex-column ms-12 ga-2">
        <v-row v-for="(column, index) in template.templateColumns" :key="index" class="align-center ga-2">
          <h3>{{ column.label }}:</h3>
          <h3 v-if="!isEditing">
            <template v-if="column.field === 'birthDate' || column.field === 'reviewDate'">
              {{ formatDate(patient[column.field]) }}
            </template>
            <template v-else>
              {{ patient[column.field] }}
            </template>
          </h3>
          <v-text-field
              v-else
              v-model="editedPatient[column.field]"
              :type="column.field === 'birthDate' || column.field === 'reviewDate' ? 'date' : 'text'"
              variant="solo"
              density="compact"
              hide-details>
          </v-text-field>
        </v-row>
      </v-col>
    </v-col>
    <v-col v-else class="d-flex ga-12 flex-column align-center justify-center h-100 bg-light-blue-lighten-5">
      <h1>У вас ще нема створеного шаблону</h1>
      <v-btn @click="this.$store.commit('setPopup', {name: 'CreateTemplatePopup', isOpen: true})">Створити</v-btn>
    </v-col>
</template>

<style scoped>
</style>
