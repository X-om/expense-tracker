import ReactECharts from "echarts-for-react";

const getChartOptions = (categoriesInfo) => {
    if (!categoriesInfo) return {};
    const categories = Object.keys(categoriesInfo);
    const values = Object.values(categoriesInfo);

    return {
      backgroundColor: "transparent", 
      title: {
        text: "Expenses by Category (Pie)",
        left: "center",
        textStyle: {
          color: "#fff", 
        },
      },
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)",
      },
      series: [
        {
          type: "pie",
          radius: ["0%", "50%"], 
          label: {
            show: true,
            formatter: "{b}: {d}%",
            color: "#fff", 
          },
          data: categories.map((category, index) => ({
            name: category,
            value: values[index],
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 20,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          itemStyle: {
            Radius: 0, 
            Color: "#fff",
            Width: 2,
          },
        },
      ],
    };
  };

export const PieChart = ({categoriesInfo}) => {
    return (
        <>
            <ReactECharts
                        option={getChartOptions(categoriesInfo)}
                        style={{ height: "400px", width: "300px", background: "transparent" }}
            />
        </>
    )
}