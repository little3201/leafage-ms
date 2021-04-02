<template>
  <div>
    <canvas :id="type + 'Chart'" width="400" height="200" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { chart } from "../../plugins/chart";

export default defineComponent({
  name: "Chart",

  props: {
    name: {
      type: String,
      default: "",
      required: true,
    },
    type: {
      type: String,
      default: "line",
      required: true,
    },
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
          label: this.name,
          data: this.data,
        },
      ],
      labels: this.labels,
    });
  },

  methods: {
    createChart(chartData: object) {
      const ctx = document.getElementById(
        this.type + "Chart-" + this.name
      ) as HTMLCanvasElement;
      const config = {
        type: this.type,
        data: chartData,
        options: this.options,
      };
      chart(ctx, config);
    },
  },
});
</script>