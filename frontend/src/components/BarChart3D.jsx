import ReactECharts from "echarts-for-react";
import "echarts-gl";




const getChartOptions = (categoriesInfo) => {

    if (!categoriesInfo) return {};
    const categories = Object.keys(categoriesInfo);
    const values = Object.values(categoriesInfo);

    return {
        backgroundColor: "transparent",
        tooltip: {
            trigger: "item",
            formatter: (params) => `${params.name}: ${params.value}`,
        },
        xAxis3D: {
            type: "category",
            data: categories,
            axisLabel: {
                color: "#ffffff",
                
            },
        },
        yAxis3D: {
            type: "category",
            axisLabel: {
                color: "#ffffff",
                rotate : 90
            },
        },
        zAxis3D: {
            type: "value",
            axisLabel: {
                color: "#ffffff",
            }

        },
        grid3D: {
            viewControl: {
                projection: "orthographic",
            },
            boxHeight: 100,
        },
        series: [
            {
                type: "bar3D",
                data: categories.map((category, idx) => [category,"", values[idx]]),
                shading: "lambert",
                label: {
                    show: true,
                    position: "top",
                    formatter: "{c}",
                    color: "#ffff"
                },
                emphasis: {
                    itemStyle: {
                        color: "#FFD700",
                    },
                },
            },
        ],
    };
}


export const BarChart3D = ({ categoriesInfo }) => {
    return (
        <div>
            <ReactECharts option={getChartOptions(categoriesInfo)} style={{ height: "400px", width: "300px", background: "transparent" }} />
        </div>
    );
};


