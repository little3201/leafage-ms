<template>
  <div class="absolute inset-4 top-10 opacity-50">
    <canvas
      id="barChartRef"
      ref="barChartRef"
      aria-label="bar-chart"
      role="img"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Chart from '@/composables/chart'
import { ChartConfiguration, ChartDataset, ChartOptions } from 'chart.js'

interface Props {
    labels: Array<string>,
    title: string,
    datasets: ChartDataset[],
    options: ChartOptions
}

const props = defineProps<Props>()

onMounted(() => {
    createBarChart(props.labels, props.title, props.datasets, props.options)
})

const barChartRef = ref()

const createBarChart = (labels: Array<string>, title: string, datasets: ChartDataset[], options: ChartOptions) => {
    if (!options || Object.keys(options).length == 0) {
        options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    color: 'black',
                    font: {
                        size: 20,
                        weight: '600'
                    },
                    display: true,
                    text: title
                }
            }
        }
    }
    const config: ChartConfiguration = {
        type: "bar",
        data: {
            labels: labels,
            datasets: datasets,
        },
        options: options
    }
    return new Chart(barChartRef.value, config);
}
</script>