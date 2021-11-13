import {
    Chart,
    BarElement,
    LineElement,
    PointElement,
    LineController,
    BarController,
    CategoryScale,
    LinearScale,
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
    Tooltip
);

export const createBarChart = (ctx: HTMLCanvasElement, labels: Array<String>, datas: Array<Number>) => {
    const config: any = {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "访问量",
                    data: datas,
                    backgroundColor: "rgba(37, 99, 235, 0.8)",
                    borderColor: "rgba(37, 99, 235, 0.5)",
                }
            ],
        },
        options: {
        },
    }
    return new Chart(ctx, config);
}

export const createMiniChart = (ctx: HTMLCanvasElement, labels: Array<String>, datas: Array<Number>, color: String) => {
    const config: any = {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: '环比',
                    data: datas,
                    backgroundColor: color,
                    borderColor: color,
                    borderWidth: 3,
                    tension: 0.4
                },
            ],
        },
        options: {
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
    return new Chart(ctx, config);
}