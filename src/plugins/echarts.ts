import * as echarts from 'echarts/core';
import {
    BarChart,
    LineChart,
} from 'echarts/charts';
import {
    DatasetComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent
} from 'echarts/components';
import {
    CanvasRenderer
} from 'echarts/renderers';

// 注册必须的组件
echarts.use(
    [
        DatasetComponent,
        TooltipComponent,
        GridComponent,
        LegendComponent,
        BarChart,
        LineChart,
        CanvasRenderer
    ]
);

export default echarts;