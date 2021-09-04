import {
    Chart,
    ArcElement,
    LineElement,
    LineController,
    DoughnutController,
    PointElement,
    LinearScale,
    CategoryScale,
    Legend,
    Title,
    Tooltip
} from 'chart.js';

Chart.register(
    ArcElement,
    LineElement,
    LineController,
    DoughnutController,
    PointElement,
    LinearScale,
    CategoryScale,
    Legend,
    Title,
    Tooltip
);

export const createDoughnutChart = (ctx: HTMLCanvasElement, labels: Array<String>, datas: Array<Number>) => {
    const config: any = {
        type: "doughnut",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "帖子数",
                    data: datas,
                    backgroundColor: ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'white']
                }
            ],
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    font: {
                        size: 16
                    },
                    display: true,
                    text: 'Categories Posts Count'
                }
            }
        },
    }
    return new Chart(ctx, config);
}

export const createMiniChart = (ctx: HTMLCanvasElement, labels: Array<String>, datas: Array<Number>) => {
    const config: any = {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    backgroundColor: "rgba(101, 116, 205, 0.1)",
                    borderColor: "rgba(101, 116, 205, 0.8)",
                    borderWidth: 3,
                    tension: 0.4,
                    data: datas,
                    fill: true
                },
            ],
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            layout: {
                padding: 4
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
            responsive: true,
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
    return new Chart(ctx, config);
}