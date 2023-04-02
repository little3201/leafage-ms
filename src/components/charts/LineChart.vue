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
import { ChartConfiguration, ChartArea, ChartType, ScriptableContext } from 'chart.js'

const getGradient = (ctx: CanvasRenderingContext2D, chartArea: ChartArea, color: string) => {
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
    gradient.addColorStop(0, color.replace('cc', "1a"))
    gradient.addColorStop(0.5, color.replace('cc', "66"))
    gradient.addColorStop(1, color)
    return gradient
}

const createLineChart = (canvas: HTMLCanvasElement, labels: Array<string>, datas: Array<number>, color: string) => {
    const config: ChartConfiguration = {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: '访问量',
                    data: datas,
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
                    text: '本月每日访问量'
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
        },
    }
    return new Chart(canvas, config);
}
</script>