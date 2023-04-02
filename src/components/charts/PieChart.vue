<template>
  <div class="absolute inset-4 top-10 opacity-50">
    <canvas
      id="lineChartRef"
      ref="lineChartRef"
      aria-label="over-viewed"
      role="img"
    />
  </div>
</template>

<script setup lang="ts">
import Chart from '@/composables/chart'
import { ChartConfiguration } from 'chart.js'

const createPieChart = (canvas: HTMLCanvasElement, labels: Array<string>, datas: Array<number>, colors: Array<string>) => {
    const config: ChartConfiguration = {
        type: "doughnut",
        data: {
            labels: labels,
            datasets: [
                {
                    label: '分类',
                    data: datas,
                    backgroundColor: colors
                },
            ],
        },
        options: {
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
                    text: '帖子分类'
                }
            }
        },
    }
    return new Chart(canvas, config);
}
</script>