import {
    Chart,
    LineElement,
    LineController,
    PointElement,
    LinearScale,
    CategoryScale,
    Legend,
    Tooltip
} from 'chart.js';

Chart.register(
    LineElement,
    LineController,
    PointElement,
    LinearScale,
    CategoryScale,
    Legend,
    Tooltip
);

export const createChart = (ctx: HTMLCanvasElement, labels: Array<String>, datas: Array<Number>, rates: Array<Number>) => {
    const config: any = {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "访问量",
                    data: datas,
                    tension: 0.3,
                    borderColor: '#91c714',
                    yAxisID: 'y',
                    pointStyle: 'rect',
                },
                {
                    label: "环比",
                    data: rates,
                    tension: 0.3,
                    yAxisID: 'y1',
                    pointStyle: 'triangle',
                },
            ],
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                    },
                },
            },
            responsive: true,
            interaction: {
                intersect: false,
                mode: 'index',
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    // grid line settings
                    grid: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                    },
                },
            }
        },
    }
    return new Chart(ctx, config);
}