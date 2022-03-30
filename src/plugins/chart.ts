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

export const createBarChart = (hctx: HTMLCanvasElement, labels: Array<string>, viewed: Array<Object>, likes: Array<Object>, comments: Array<Object>) => {
    const config: any = {
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
    return new Chart(hctx, config);
}

const getGradient = (ctx: CanvasRenderingContext2D, chartArea: any, color: string) => {
    var gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
    gradient.addColorStop(0, color.replace('0.8', "0.1"))
    gradient.addColorStop(0.5, color.replace('0.8', "0.4"))
    gradient.addColorStop(1, color)
    return gradient
}

export const createMiniChart = (hctx: HTMLCanvasElement, labels: Array<string>, datas: Array<Object>, color: string) => {
    const config: any = {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: '增长率',
                    data: datas,
                    backgroundColor: function (context) {
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
    return new Chart(hctx, config);
}