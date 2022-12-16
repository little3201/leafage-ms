import {
    Chart,
    ArcElement,
    BarElement,
    LineElement,
    PointElement,
    BarController,
    DoughnutController,
    LineController,
    CategoryScale,
    LinearScale,
    Filler,
    Legend,
    Title,
    Tooltip,

    ChartConfiguration,
    ChartArea,
    ScriptableContext,
    ChartType
} from 'chart.js';

Chart.register(
    ArcElement,
    BarElement,
    LineElement,
    PointElement,
    BarController,
    DoughnutController,
    LineController,
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

const getGradient = (ctx: CanvasRenderingContext2D, chartArea: ChartArea, color: string) => {
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
    gradient.addColorStop(0, color.replace('cc', "1a"))
    gradient.addColorStop(0.5, color.replace('cc', "66"))
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
                x: {
                    display: false
                },
                y: {
                    display: false
                }
            }
        },
    }
    return new Chart(canvas, config);
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

export { createMiniChart, createBarChart, createLineChart, createPieChart }