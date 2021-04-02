import {
  Chart, LineController, LineElement, PointElement, LinearScale, Title
} from 'chart.js';

Chart.register(
  LineController, LineElement, PointElement, LinearScale, Title
);

export const chart = (ctx: HTMLCanvasElement, config: any) => { return new Chart(ctx, config) };