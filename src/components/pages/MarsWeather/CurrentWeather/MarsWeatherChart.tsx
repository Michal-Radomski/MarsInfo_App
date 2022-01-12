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

class MarsWeatherChart extends React.Component<{}, {}> {
  data: State;
  options: State;
  labels!: string[];
  options2: State;
  constructor(props: State) {
    super(props);
    console.log("props.Perseverance_Weather and Curiosity_Weather:", props.Perseverance_Weather, props.Curiosity_Weather);

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
    const PerseveranceTerrestrialDate: String[] = [];
    props.Perseverance_Weather.map((day: {terrestrial_date: string}) =>
      PerseveranceTerrestrialDate.push(new Date(day.terrestrial_date).toDateString())
    );
    // console.log("PerseveranceTerrestrialDate:", PerseveranceTerrestrialDate);
    const PerseveranceWeatherData = {
      temp_Max: PerseveranceTempMax,
      temp_Min: PerseveranceTempMin,
      pressure: PerseverancePressure,
      sol: PerseveranceSol,
      TerrestrialDate: PerseveranceTerrestrialDate,
    };
    console.log("PerseveranceWeatherData:", PerseveranceWeatherData);

    this.state = {
      CuriosityWeather: {},
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

    this.options2 = {
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
    };

    this.labels = ["January", "February", "March", "April", "May", "June"];

    this.data = {
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
    };
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
            <Line options={this.options} data={this.data} />
          </div>
          <div style={{width: "600px"}}>
            <button>Curiosity</button>
            <Bar options={this.options2} data={this.data} />
          </div>
        </Div>
      </>
    );
  }
}

export default MarsWeatherChart;
