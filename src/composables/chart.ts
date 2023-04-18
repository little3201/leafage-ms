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
    Tooltip
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

export default Chart;