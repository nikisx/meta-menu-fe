<template>
  <section style="text-align: center">
    <pie :chart-data="chartData" :chart-options="chartOptions"></pie>
  </section>
</template>

<script>
import { Pie } from "vue-chartjs";
import { get } from "../../request";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  ArcElement,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  data() {
    return {
      statistics: {},
    };
  },
  computed: {
    chartData() {
      return {
        labels: ["Morning", "Lunch", "Afternoon", "Evening"],
        datasets: [
          {
            data: [this.statistics.morning, this.statistics.lunch, this.statistics.afternoon, this.statistics.evening],
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
          },
        ],
      };
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
      };
    },
  },
  components: {
    Pie,
  },
  created() {
    this.getStatisticsData();
  },
  methods: {
    getStatisticsData() {
      get("/users/get-statistics").then((response) => {
        if (response.data.success) {
            this.statistics = response.data.data;
        }
      });
    },
  },
};
</script>

<style>
</style>