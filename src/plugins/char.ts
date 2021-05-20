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

export const createChart = (ctx: HTMLCanvasElement, labels: Array<String>, data: Array<any>) => {
    const config: any = {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "value",
                    data: data,
                    tension: 0.3,
                    borderColor: '#91c714'
                },
            ],
            options: {
                responsive: true,
                interaction: {
                    intersect: false,
                },
            },
        },
        options: {},
    }
    return new Chart(ctx, config);
}