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
  labels!: string[];
  constructor(props: State) {
    super(props);
    // console.log("props.Perseverance_Weather and Curiosity_Weather:", props.Perseverance_Weather, props.Curiosity_Weather);

    //* Perseverance Weather Data Object
    const PerseveranceTempMax: number[] = [];
    props.Perseverance_Weather.map((day: {max_temp: number}) => PerseveranceTempMax.push(day.max_temp));
    // console.log("PerseveranceTempMax:", PerseveranceTempMax);
    const PerseveranceTempMin: number[] = [];
    props.Perseverance_Weather.map((day: {min_temp: number}) => PerseveranceTempMin.push(day.min_temp));
    // console.log("PerseveranceTempMin:", PerseveranceTempMin);
    const PerseverancePressure: number[] = [];
    props.Perseverance_Weather.map((day: {pressure: number}) => PerseverancePressure.push(day.pressure));
    // console.log("PerseverancePressure:", PerseverancePressure);
    const PerseveranceSol: number[] = [];
    props.Perseverance_Weather.map((day: {sol: string}) => PerseveranceSol.push(parseInt(day.sol)));
    // console.log("PerseveranceSol:", PerseveranceSol);
    const PerseveranceTerrestrialDate: string[] = [];
    props.Perseverance_Weather.map((day: {terrestrial_date: string}) =>
      PerseveranceTerrestrialDate.push(new Date(day.terrestrial_date).toDateString())
    );
    // console.log("PerseveranceTerrestrialDate:", PerseveranceTerrestrialDate);
    const PerseveranceWeatherData = {
      temp_Max: PerseveranceTempMax,
      temp_Min: PerseveranceTempMin,
      pressure: PerseverancePressure,
      sol: PerseveranceSol,
      terrestrialDate: PerseveranceTerrestrialDate,
      name: "Perseverance Mars Rover" as string,
    };
    console.log("PerseveranceWeatherData:", PerseveranceWeatherData);

    //* Curiosity Weather Data Object
    const CuriosityTempMax: number[] = [];
    props.Curiosity_Weather.map((day: {max_temp: string}) => CuriosityTempMax.push(parseFloat(day.max_temp)));
    // console.log("CuriosityTempMax:", CuriosityTempMax);
    const CuriosityTempMin: number[] = [];
    props.Curiosity_Weather.map((day: {min_temp: string}) => CuriosityTempMin.push(parseFloat(day.min_temp)));
    // console.log("CuriosityTempMin:", CuriosityTempMin);
    const CuriosityPressure: number[] = [];
    props.Curiosity_Weather.map((day: {pressure: string}) => CuriosityPressure.push(parseFloat(day.pressure)));
    // console.log("CuriosityPressure:", CuriosityPressure);
    const CuriositySol: number[] = [];
    props.Curiosity_Weather.map((day: {sol: string}) => CuriositySol.push(parseInt(day.sol)));
    // console.log("CuriositySol:", CuriositySol);
    const CuriosityTerrestrialDate: string[] = [];
    props.Curiosity_Weather.map((day: {terrestrial_date: string}) =>
      CuriosityTerrestrialDate.push(new Date(day.terrestrial_date).toDateString())
    );
    // console.log("CuriosityTerrestrialDate:", CuriosityTerrestrialDate);
    const CuriosityWeatherData = {
      temp_Max: CuriosityTempMax,
      temp_Min: CuriosityTempMin,
      pressure: CuriosityPressure,
      sol: CuriositySol,
      terrestrialDate: CuriosityTerrestrialDate,
      name: "Curiosity Mars Rover" as string,
    };
    console.log("CuriosityWeatherData:", CuriosityWeatherData);

    this.state = {
      lineChartData: [],
      barChartData: [],
    };
    // console.log("this.state:", this.state);

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

  // optionsTemp = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top" as const,
  //     },
  //     title: {
  //       display: true,
  //       text: "Chart.js Line Chart",
  //     },
  //   },
  // };

  // optionsPressure = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top" as const,
  //     },
  //     title: {
  //       display: true,
  //       text: "Chart.js Bar Chart",
  //     },
  //   },
  // };

  // labels = ["January", "February", "March", "April", "May", "June"];

  // dataTemp = {
  //   labels: this.labels,

  //   datasets: [
  //     {
  //       label: "Dataset 1",
  //       data: [12, 19, 3, 5, 2, 3],
  //       borderColor: "rgb(255, 99, 132)",
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //       fill: true,
  //     },
  //     {
  //       label: "Dataset 2",
  //       data: [1, 1, 13, 15, 12, 13],
  //       borderColor: "rgb(53, 162, 235)",
  //       backgroundColor: "rgba(53, 162, 235, 0.5)",
  //       fill: true,
  //     },
  //   ],
  // };
  // dataPressure = {
  //   labels: this.labels,

  //   datasets: [
  //     {
  //       label: "Dataset 1",
  //       data: [12, 19, 3, 5, 2, 3],
  //       borderColor: "rgb(255, 99, 132)",
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //       fill: true,
  //     },
  //     {
  //       label: "Dataset 2",
  //       data: [1, 1, 13, 15, 12, 13],
  //       borderColor: "rgb(53, 162, 235)",
  //       backgroundColor: "rgba(53, 162, 235, 0.5)",
  //       fill: true,
  //     },
  //   ],
  // };

  setPerseverance = () => {
    this.setState({
      lineChartData: {
        labels: ["January", "February", "March", "April", "May", "June"],

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
          labels: this.labels,

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
          labels: this.labels,

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

  componentDidMount() {
    this.setPerseverance();
  }

  render() {
    return (
      <>
        <div>
          <H2>Charts of Weather on Mars</H2>
        </div>
        <Div>
          <div style={{width: "600px"}}>
            <button>Perseverance</button>
            <Line options={this.state.lineChartData.optionsTemp} data={this.state.lineChartData.dataTemp} />
          </div>
          <div style={{width: "600px"}}>
            <button>Curiosity</button>
            <Bar options={this.state.barChartData.optionsPressure} data={this.state.barChartData.dataPressure} />
          </div>
        </Div>
      </>
    );
  }
}

export default MarsWeatherChart;
