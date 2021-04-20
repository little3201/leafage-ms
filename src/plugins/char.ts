import {
    Chart,
    LineElement,
    LineController,
    PointElement,
    LinearScale,
    Title
} from 'chart.js';

Chart.register(
    LineElement,
    LineController,
    PointElement,
    LinearScale,
    Title
);

export const createChart = (ctx: HTMLCanvasElement, config: any) => {
    return new Chart(ctx, config);
}