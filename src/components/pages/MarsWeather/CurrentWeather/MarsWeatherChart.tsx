import React from "react";
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from "chart.js";
import {Line} from "react-chartjs-2";

class MarsWeatherChart extends React.Component<{}, {}> {
  data: any;
  options: any;
  labels!: string[];
  constructor(props: any) {
    super(props);
    this.state = {};
    console.log("props.Perseverance_Weather and Curiosity_Weather:", props.Perseverance_Weather, props.Curiosity_Weather);
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    this.options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        title: {
          display: true,
          text: "Chart.js Line Chart",
        },
      },
    };

    this.labels = ["January", "February", "March", "April", "May", "June", "July"];

    this.data = {
      labels: this.labels,
      datasets: [
        {
          label: "Dataset 1",
          data: [12, 19, 3, 5, 2, 3],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Dataset 2",
          data: [1, 1, 13, 15, 12, 13],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
  }

  render() {
    return (
      <div>
        MarsWeatherChart
        <Line options={this.options} data={this.data} />
      </div>
    );
  }
}

export default MarsWeatherChart;
