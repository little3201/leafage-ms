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

const createBarChart = (canvas: HTMLCanvasElement, labels: Array<string>, viewed: Array<number>,
    likes: Array<number>, comments: Array<number>) => {
    const config: ChartConfiguration = {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "浏览量",
                    data: viewed,
                    backgroundColor: "#2563eb"
                },
                {
                    label: "评论数",
                    data: comments,
                    backgroundColor: "#ca8a04"
                },
                {
                    label: "点赞数",
                    data: likes,
                    backgroundColor: "#9333ea"
                }
            ],
        },
        options: {
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
                    text: '7日帖子访问统计数据'
                }
            }
        },
    }
    return new Chart(canvas, config);
}
</script>