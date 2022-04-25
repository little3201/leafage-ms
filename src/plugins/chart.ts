import {
    Chart,
    BarElement,
    LineElement,
    PointElement,
    LineController,
    BarController,
    CategoryScale,
    LinearScale,
    Filler,
    Legend,
    Title,
    Tooltip
} from 'chart.js';

import {
    ChartConfiguration
} from 'chart.js/types/index.esm'

Chart.register(
    BarElement,
    LineElement,
    PointElement,
    LineController,
    BarController,
    CategoryScale,
    LinearScale,
    Filler,
    Legend,
    Title,
    Tooltip
);

const createBarChart = (canvas: HTMLCanvasElement, labels: Array<string>, viewed: Array<number>,
    likes: Array<number>, comments: Array<number>) => {
    const config: ChartConfiguration = {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "访问量",
                    data: viewed,
                    backgroundColor: "rgba(37, 99, 235, 0.8)"
                },
                {
                    label: "点赞数",
                    data: likes,
                    backgroundColor: "rgba(124, 58, 237, 0.8)"
                },
                {
                    label: "评论数",
                    data: comments,
                    backgroundColor: "rgba(217, 119, 6, 0.8)"
                }
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '最近7日统计数据'
                }
            }
        },
    }
    return new Chart(canvas, config);
}

const getGradient = (ctx: CanvasRenderingContext2D, chartArea: any, color: string) => {
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
    gradient.addColorStop(0, color.replace('0.8', "0.1"))
    gradient.addColorStop(0.5, color.replace('0.8', "0.4"))
    gradient.addColorStop(1, color)
    return gradient
}

const createMiniChart = (canvas: HTMLCanvasElement, labels: Array<string>, datas: Array<number>, color: string) => {
    const config: ChartConfiguration = {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: '增长率',
                    data: datas,
                    backgroundColor: (context: any) => {
                        const chart = context.chart;
                        const { ctx, chartArea } = chart;

                        if (!chartArea) {
                            // This case happens on initial chart load
                            return;
                        }
                        return getGradient(ctx, chartArea, color);
                    },
                    pointBorderColor: 'transparent',
                    borderColor: color,
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
                filler: {
                    propagate: false,
                },
            },
            elements: {
                point: {
                    radius: 0,
                    hoverRadius: 2
                }
            },
            interaction: {
                intersect: false,
            },
            scales: {
                xAxis: {
                    display: false
                },
                yAxis: {
                    display: false
                }
            }
        },
    }
    return new Chart(canvas, config);
}

export {createMiniChart, createBarChart}