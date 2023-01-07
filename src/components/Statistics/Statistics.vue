<template>
  <section style="text-align: center">
    <p v-if="isLastWeek"> 
        <b v-if="calculatedPrecent > 0" style="color: green;"><font-awesome-icon icon="fa-solid fa-arrow-up" /> {{calculatedPrecent}} % Увеличение </b> 
        <b v-else style="color: red;"><font-awesome-icon icon="fa-solid fa-arrow-down" /> {{calculatedPrecent}} % Спад </b> 
    </p>
    <p v-else>
        Събират се данни за текущия месец
    </p>
    <h4>Брой поръчки за текущ/предходен месец</h4>
    <div id="chart" style="max-width: 500px; margin: 0 auto;">
      <apexchart
        type="bar"
        height="150"
        :options="chartOptionsBar"
        :series="seriesBar"
      ></apexchart>
      <p v-if="!isLastWeek" style="font-style: italic;">Данни относно увеличени/спад на брой поръчки ще се покажат през последната седмица на текущия месец</p>
    </div>
    <hr>
    <h4>Процентно разделение на поръчки</h4>
    <pie :chart-data="chartDataPie" :chart-options="chartOptionsPie"></pie>
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
    chartDataPie() {
      return {
        labels: ["Сутрин", "Обяд", "Следобед", "Вечер"],
        datasets: [
          {
            data: [
              this.statistics.morning,
              this.statistics.lunch,
              this.statistics.afternoon,
              this.statistics.evening,
            ],
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
          },
        ],
      };
    },
    chartOptionsPie() {
      return {
        responsive: true,
        maintainAspectRatio: false,
      };
    },
    chartOptionsBar() {
      return {
        chart: {
          type: "bar",
          height: 250,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [
            "Предходен месец",
            "Текущ месец",
          ],
        },
      };
    },
    seriesBar(){
        return [{
            data: [this.statistics.lastMonthOrdersCount, this.statistics.currentMonthOrdersCount]
          }];
    },
    isLastWeek() {
      let dt = new Date();
      let day = new Date(dt.getTime() + 86400000).getDate();
      return day >= 26 || day === 1;
    },
    calculatedPrecent(){
        if(this.isLastWeek){
            let temp = (this.statistics.currentMonthOrdersCount / this.statistics.lastMonthOrdersCount) * 100;
            temp -= 100;

            return (Math.round(temp)).toFixed(1);
        }
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