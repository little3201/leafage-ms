import {
    Chart,
    LineElement,
    LineController,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip
} from 'chart.js';

Chart.register(
    LineElement,
    LineController,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip
);

export const createChart = (ctx: HTMLCanvasElement, config: any) => {
    return new Chart(ctx, config);
}