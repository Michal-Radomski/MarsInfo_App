import React from "react";
import styled from "styled-components";

import {Line, Bar} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  BarController,
  Filler,
} from "chart.js";

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  margin-left: auto;
  margin-right: auto;
  wrap: wrap;
  gap: 10px;
  @media (max-width: 1280px) {
    flex-direction: column;
    margin-left: auto;
    justify-content: center;
    align-content: center;
    margin-right: auto;
  }
`;

const H2 = styled.h2`
  text-align: center;
`;

class MarsWeatherChart extends React.Component<{}, {lineChartData: any; barChartData: any}> {
  constructor(props: State) {
    super(props);
    // console.log("props.Perseverance_Weather and Curiosity_Weather:", props.Perseverance_Weather, props.Curiosity_Weather);

    //-  -------------------------------------
    this.state = {
      lineChartData: {
        optionsTemp: {
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
        },

        dataTemp: {
          labels: ["January", "February", "March", "April", "May", "June"],

          datasets: [
            {
              label: "Dataset 1",
              data: [12, 19, 3, 5, 2, 3],
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              fill: true,
            },
            {
              label: "Dataset 2",
              data: [1, 1, 13, 15, 12, 13],
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
              fill: true,
            },
          ],
        },
      },
      barChartData: {
        optionsPressure: {
          responsive: true,
          plugins: {
            legend: {
              position: "top" as const,
            },
            title: {
              display: true,
              text: "Chart.js Bar Chart",
            },
          },
        },

        dataPressure: {
          labels: ["January", "February", "March", "April", "May", "June"],

          datasets: [
            {
              label: "Dataset 1",
              data: [12, 19, 3, 5, 2, 3],
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              fill: true,
            },
            {
              label: "Dataset 2",
              data: [1, 1, 13, 15, 12, 13],
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
              fill: true,
            },
          ],
        },
      },
    };

    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend,
      BarElement,
      BarController,
      Filler
    );
  }

  setPerseverance = () => {
    this.setState({
      lineChartData: {
        optionsTemp: {
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
        },

        dataTemp: {
          labels: ["January", "February", "March", "April", "May", "June"],

          datasets: [
            {
              label: "Dataset 1",
              data: [12, 19, 3, 5, 2, 3],
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              fill: true,
            },
            {
              label: "Dataset 2",
              data: [1, 1, 13, 15, 12, 13],
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
              fill: true,
            },
          ],
        },
      },
      barChartData: {
        optionsPressure: {
          responsive: true,
          plugins: {
            legend: {
              position: "top" as const,
            },
            title: {
              display: true,
              text: "Chart.js Bar Chart",
            },
          },
        },

        dataPressure: {
          labels: ["January", "February", "March", "April", "May", "June"],

          datasets: [
            {
              label: "Dataset 1",
              data: [12, 19, 3, 5, 2, 3],
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              fill: true,
            },
            {
              label: "Dataset 2",
              data: [1, 1, 13, 15, 12, 13],
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
              fill: true,
            },
          ],
        },
      },
    });
  };

  setCuriosity = () => {
    this.setState({
      lineChartData: {
        optionsTemp: {
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
        },

        dataTemp: {
          labels: ["1", "2", "3", "4", "5", "6"],

          datasets: [
            {
              label: "Dataset 1",
              data: [121, 191, 31, 51, 21, 31],
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              fill: true,
            },
            {
              label: "Dataset 2",
              data: [1, 1, 13, 15, 12, 13],
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
              fill: true,
            },
          ],
        },
      },
      barChartData: {
        optionsPressure: {
          responsive: true,
          plugins: {
            legend: {
              position: "top" as const,
            },
            title: {
              display: true,
              text: "Chart.js Bar Chart",
            },
          },
        },

        dataPressure: {
          labels: ["1", "2", "3", "4", "5", "6"],

          datasets: [
            {
              label: "Dataset 1",
              data: [121, 191, 31, 51, 21, 31],
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              fill: true,
            },
            {
              label: "Dataset 2",
              data: [1, 1, 13, 15, 12, 13],
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
              fill: true,
            },
          ],
        },
      },
    });
  };

  render() {
    return (
      <>
        <div>
          <H2>Charts of Weather on Mars</H2>
        </div>
        <Div>
          <div style={{width: "600px"}}>
            <button onClick={this.setPerseverance}>Perseverance</button>

            <Line options={this.state.lineChartData.optionsTemp} data={this.state.lineChartData.dataTemp} />
          </div>
          <div style={{width: "600px"}}>
            <button onClick={this.setCuriosity}>Curiosity</button>

            <Bar options={this.state.barChartData.optionsPressure} data={this.state.barChartData.dataPressure} />
          </div>
        </Div>
      </>
    );
  }
}

export default MarsWeatherChart;
