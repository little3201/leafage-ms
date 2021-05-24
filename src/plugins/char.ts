import {
    Chart,
    LineElement,
    LineController,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip
} from 'chart.js';

Chart.register(
    LineElement,
    LineController,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip
);

export const createChart = (ctx: HTMLCanvasElement, labels: Array<String>, datas: Array<Number>, rates: Array<Number>) => {
    const config: any = {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "viewed",
                    data: datas,
                    tension: 0.3,
                    borderColor: '#91c714',
                    yAxisID: 'y',
                },
                {
                    label: "over viewed",
                    data: rates,
                    tension: 0.3,
                    yAxisID: 'y1',
                },
            ],
        },
        options: {
            responsive: true,
            interaction: {
                intersect: false,
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