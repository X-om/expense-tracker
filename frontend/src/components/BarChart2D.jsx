import ReactECharts from "echarts-for-react";

const getBarChartOptions = (categoriesInfo) => {
    if (!categoriesInfo) return {};
    const categories = Object.keys(categoriesInfo);
    const values = Object.values(categoriesInfo);

    return {
        backgroundColor: "transparent",
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow", 
            },
        },
        xAxis: {
            type: "category",
            data: categories,
            axisLabel: {
                color: "#ffffff", 
                rotate: 90,
            },
            axisLine: {
                lineStyle: {
                    color: "#ffffff",

                },
            },
        },
        yAxis: {
            type: "value",
            axisLabel: {
                color: "#ffffff", 
            },
            axisLine: {
                lineStyle: {
                    color: "#ffffff", 
                },
            },
        },
        series: [
            {
                type: "bar",
                data: values,
                itemStyle: {
                    color: "#3498db", 
                },
                emphasis: {
                    itemStyle: {
                        color: "#FFD700", 
                    },
                },
                label: {
                    show: true,
                    position: "top",
                    formatter: "{c}",
                    color: "#ffffff", 
                },
            },
        ],
    };
};

export const BarChart2D = ({ categoriesInfo }) => {
    return (
        <div>
            <ReactECharts option={getBarChartOptions(categoriesInfo)} style={{ height: "400px", width: "300px", background: "transparent" }} />
        </div>
    );
};
