<template>
  <canvas
    id="lineChartRef"
    ref="lineChartRef"
    aria-label="line-chart"
    role="img"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Chart from '@/composables/chart'
import { ChartConfiguration, ChartOptions, ChartArea, ChartType, ScriptableContext } from 'chart.js'

interface Props {
    labels: Array<string>,
    label: string,
    title: string,
    data: Array<number>,
    color: string,
    options: ChartOptions
}

const props = defineProps<Props>()

onMounted(() => {
    createLineChart(props.labels, props.label, props.title, props.data, props.color, props.options)
})

const lineChartRef = ref()

const getGradient = (ctx: CanvasRenderingContext2D, chartArea: ChartArea, color: string) => {
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
    gradient.addColorStop(0, color.replace('cc', "1a"))
    gradient.addColorStop(0.5, color.replace('cc', "66"))
    gradient.addColorStop(1, color)
    return gradient
}

const createLineChart = (labels: Array<string>, label: string, title: string, data: Array<number>, color: string, options: ChartOptions) => {
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
            },
            elements: {
                point: {
                    radius: 0,
                    hoverRadius: 2
                }
            },
            interaction: {
                intersect: false,
            }
        }
    }
    const config: ChartConfiguration = {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: label,
                    data: data,
                    backgroundColor: (context: ScriptableContext<ChartType>) => {
                        const chart = context.chart;
                        const { ctx, chartArea } = chart;

                        if (!chartArea) {
                            return;
                        }
                        return getGradient(ctx, chartArea, color);
                    },
                    pointBorderColor: 'transparent',
                    borderColor: color,
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }
            ],
        },
        options: options
    }
    return new Chart(lineChartRef.value, config);
}
</script>