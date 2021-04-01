<template>
  <canvas id="doughnut" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Chart from "chart.js";

export default defineComponent({
  name: "Doughnut",

  props: {
    options: {
      type: Object,
      default: {},
    },
    labels: {
      type: Array,
      default: [],
    },
    colors: {
      type: Array,
      default: [],
    },
    data: {
      type: Array,
      default: [],
    },
  },

  mounted() {
    this.createChart({
      datasets: [
        {
          data: this.data,
          backgroundColor: this.colors,
        },
      ],
      labels: this.labels,
    });
  },

  methods: {
    createChart(chartData: object) {
      const canvas = document.getElementById("doughnut") as HTMLCanvasElement;
      const options = {
        type: "doughnut",
        data: chartData,
        options: this.options,
      };
      new Chart(canvas, options);
    },
  },
});
</script>