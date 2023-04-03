<template>
  <div class="relative shadow-sm rounded-md bg-white p-4">
    <canvas
      id="pieChartRef"
      ref="pieChartRef"
      aria-label="pie-chart"
      role="img"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Chart from '@/composables/chart'
import { ChartConfiguration, ChartOptions } from 'chart.js'

interface Props {
    labels: Array<string>,
    label: string,
    title: string,
    data: Array<number>,
    options: ChartOptions
}

const props = defineProps<Props>()

onMounted(() => {
    createPieChart(props.labels, props.label, props.title, props.data, props.options)
})

const colors = ['#dc2626', '#ea580c', '#d97706', '#ca8a04', '#65a30d', '#16a34a', '#059669', '#0d9488',
    '#0891b2', '#0284c7', '#2563eb', '#4f46e5', '#7c3aed', '#9333ea', '#c026d3', '#db2777', '#e11d48']

const pieChartRef = ref()

const createPieChart = (labels: Array<string>, label: string, title: string, data: Array<number>, options: ChartOptions) => {
    if (!options || Object.keys(options).length == 0) {
        options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
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
        type: "doughnut",
        data: {
            labels: labels,
            datasets: [
                {
                    label: label,
                    data: data,
                    backgroundColor: colors.slice(0, data.length)
                },
            ],
        },
        options: options,
    }
    return new Chart(pieChartRef.value, config);
}
</script>