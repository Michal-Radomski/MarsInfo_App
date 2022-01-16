import React from "react";
import styled from "styled-components";
import ChartDataLabels from "chartjs-plugin-datalabels";

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

const options: State = {weekday: "short", year: "numeric", month: "numeric", day: "numeric"};

//* An average Temp of the Day
const average = (tooltipItems: any[]): string => {
  let average: number = 0;
  tooltipItems.forEach(function (tooltipItem) {
    average += (tooltipItem.parsed.y / 2) as number;
  });
  return ("Average: " + average.toFixed(2) + " ℃") as string;
};

class MarsWeatherCharts extends React.Component<
  {},
  {lineChartData: State; barChartData: State; PerseveranceWeatherData: State; CuriosityWeatherData: State}
> {
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
      PerseveranceTerrestrialDate.push(new Date(day.terrestrial_date).toLocaleDateString(undefined, options))
    );
    // console.log("PerseveranceTerrestrialDate:", PerseveranceTerrestrialDate);
    const combinedDatePerseverance: string[] = [];
    for (let i = 0; i < PerseveranceSol.length && i < PerseveranceTerrestrialDate.length; i++) {
      combinedDatePerseverance.push(PerseveranceSol[i] + " / " + PerseveranceTerrestrialDate[i]);
    }
    // console.log("combinedDatePerseverance:", combinedDatePerseverance);

    const PerseveranceWeatherData = {
      temp_Max: PerseveranceTempMax,
      temp_Min: PerseveranceTempMin,
      pressure: PerseverancePressure,
      sol: PerseveranceSol,
      terrestrialDate: PerseveranceTerrestrialDate,
      name: "Perseverance Mars Rover" as string,
      combinedDatePerseverance: combinedDatePerseverance,
    };
    // console.log("PerseveranceWeatherData:", PerseveranceWeatherData);

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
    const combinedDateCuriosity: string[] = [];
    for (let i = 0; i < CuriositySol.length && i < CuriosityTerrestrialDate.length; i++) {
      combinedDateCuriosity.push(CuriositySol[i] + " / " + CuriosityTerrestrialDate[i]);
    }
    // console.log("combinedDateCuriosity:", combinedDateCuriosity);

    const CuriosityWeatherData = {
      temp_Max: CuriosityTempMax,
      temp_Min: CuriosityTempMin,
      pressure: CuriosityPressure,
      sol: CuriositySol,
      terrestrialDate: CuriosityTerrestrialDate,
      name: "Curiosity Mars Rover" as string,
      combinedDateCuriosity: combinedDateCuriosity,
    };
    // console.log("CuriosityWeatherData:", CuriosityWeatherData);

    //* Setting the Initial State
    this.state = {
      PerseveranceWeatherData: PerseveranceWeatherData,
      CuriosityWeatherData: CuriosityWeatherData,
      lineChartData: {},
      barChartData: {},
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
      Filler,
      ChartDataLabels
    );
  }

  setPerseverance = () => {
    this.setState({
      PerseveranceWeatherData: this.state.PerseveranceWeatherData,
      CuriosityWeatherData: this.state.CuriosityWeatherData,
      lineChartData: {
        optionsTemp: {
          scales: {
            x: {
              ticks: {
                color: "blue",
              },
              display: true,
              title: {
                display: true,
                text: "Sol Number / Terrestrial Date",
                color: "maroon",
                font: {
                  size: 14,
                  weight: "bold",
                },
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                color: "darkblue",
                callback: function (value: number) {
                  return `${value} ℃`;
                },
              },
              display: true,
              title: {
                display: true,
                text: "Min/ Max Temp [℃]",
                color: "maroon",
                font: {
                  size: 14,
                  weight: "bold",
                },
              },
            },
          },
          responsive: true,
          //* Only for multi datasets
          interaction: {
            intersect: false,
            mode: "index",
          },
          plugins: {
            legend: {
              position: "top" as const,
            },
            title: {
              display: true,
              text: `Charts of Min/ Max Temp for ${this.state.PerseveranceWeatherData.name}`,
            },
            datalabels: {
              display: true,
              color: "black",
              align: "end",
              anchor: "end",
              clamp: true,
              labels: {
                padding: {top: 2},
                title: {
                  font: {
                    weight: "bold",
                  },
                },
              },
              formatter: function (value: number) {
                return "\n" + value + "℃";
              },
            },
            tooltip: {
              callbacks: {
                footer: average,
              },
            },
          },
        },
        dataTemp: {
          labels: this.state.PerseveranceWeatherData.combinedDatePerseverance,
          datasets: [
            {
              label: "Max Temp [℃]",
              data: this.state.PerseveranceWeatherData.temp_Max,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              fill: true,
              tension: 0.5,
            },
            {
              label: "Min Temp [℃]",
              data: this.state.PerseveranceWeatherData.temp_Min,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
              fill: true,
              tension: 0.5,
            },
          ],
        },
      },

      barChartData: {
        optionsPressure: {
          scales: {
            x: {
              ticks: {
                color: "green",
              },
              display: true,
              title: {
                display: true,
                text: "Sol Number / Terrestrial Date",
                color: "maroon",
                font: {
                  size: 14,
                  weight: "bold",
                },
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                color: "darkblue",
                callback: function (value: number) {
                  return `${value} Pa`;
                },
              },
              display: true,
              title: {
                display: true,
                text: "Pressure [Pa]",
                color: "maroon",
                font: {
                  size: 14,
                  weight: "bold",
                },
              },
            },
          },
          responsive: true,
          plugins: {
            legend: {
              position: "top" as const,
            },
            title: {
              display: true,
              text: `Chart of Pressure for ${this.state.PerseveranceWeatherData.name}`,
            },
            datalabels: {
              display: true,
              color: "black",
              align: "end",
              anchor: "end",
              clamp: true,
              labels: {
                padding: {top: 2},
                title: {
                  font: {
                    weight: "bold",
                  },
                },
              },
              formatter: function (value: number) {
                return "\n" + value + " Pa";
              },
            },
          },
          elements: {
            bar: {
              borderWidth: 3,
            },
          },
        },
        dataPressure: {
          labels: this.state.PerseveranceWeatherData.combinedDatePerseverance,
          datasets: [
            {
              label: "Pressure [Pa]",
              data: this.state.PerseveranceWeatherData.pressure,
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgba(75, 192, 192, 0.5)",
            },
          ],
        },
      },
    });
  };

  setCuriosity = () => {
    this.setState({
      PerseveranceWeatherData: this.state.PerseveranceWeatherData,
      CuriosityWeatherData: this.state.CuriosityWeatherData,
      lineChartData: {
        optionsTemp: {
          scales: {
            x: {
              ticks: {
                color: "blue",
              },
              display: true,
              title: {
                display: true,
                text: "Sol Number / Terrestrial Date",
                color: "maroon",
                font: {
                  size: 14,
                  weight: "bold",
                },
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                color: "darkblue",
                callback: function (value: number) {
                  return `${value} ℃`;
                },
              },
              display: true,
              title: {
                display: true,
                text: "Min/ Max Temp [℃]",
                color: "maroon",
                font: {
                  size: 14,
                  weight: "bold",
                },
              },
            },
          },
          responsive: true,
          //* Only for multi datasets
          interaction: {
            intersect: false,
            mode: "index",
          },
          plugins: {
            legend: {
              position: "top" as const,
            },
            title: {
              display: true,
              text: `Charts of Min/ Max Temp for ${this.state.CuriosityWeatherData.name}`,
            },
            datalabels: {
              display: true,
              color: "black",
              align: "end",
              anchor: "end",
              clamp: true,
              labels: {
                padding: {top: 2},
                title: {
                  font: {
                    weight: "bold",
                  },
                },
              },
              formatter: function (value: number) {
                return "\n" + value + "℃";
              },
            },
            tooltip: {
              callbacks: {
                footer: average,
              },
            },
          },
        },
        dataTemp: {
          labels: this.state.CuriosityWeatherData.combinedDateCuriosity,
          datasets: [
            {
              label: "Max Temp [℃]",
              data: this.state.CuriosityWeatherData.temp_Max,
              borderColor: "rgb(255, 159, 64)",
              backgroundColor: "rgba(255, 159, 64, 0.5)",
              fill: true,
              tension: 0.5,
            },
            {
              label: "Min Temp [℃]",
              data: this.state.CuriosityWeatherData.temp_Min,
              borderColor: "rgb(153, 102, 255)",
              backgroundColor: "rgba(153, 102, 255, 0.5)",
              fill: true,
              tension: 0.5,
            },
          ],
        },
      },

      barChartData: {
        optionsPressure: {
          scales: {
            x: {
              ticks: {
                color: "green",
              },
              display: true,
              title: {
                display: true,
                text: "Sol Number / Terrestrial Date",
                color: "maroon",
                font: {
                  size: 14,
                  weight: "bold",
                },
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                color: "darkblue",
                callback: function (value: number) {
                  return `${value} Pa`;
                },
              },
              display: true,
              title: {
                display: true,
                text: "Pressure [Pa]",
                color: "maroon",
                font: {
                  size: 14,
                  weight: "bold",
                },
              },
            },
          },
          responsive: true,
          plugins: {
            legend: {
              position: "top" as const,
            },
            title: {
              display: true,
              text: `Chart of Pressure for ${this.state.CuriosityWeatherData.name}`,
            },
            datalabels: {
              display: true,
              color: "black",
              align: "end",
              anchor: "end",
              clamp: true,
              labels: {
                padding: {top: 2},
                title: {
                  font: {
                    weight: "bold",
                  },
                },
              },
              formatter: function (value: number) {
                return "\n" + value + " Pa";
              },
            },
          },
          elements: {
            bar: {
              borderWidth: 3,
            },
          },
        },
        dataPressure: {
          labels: this.state.CuriosityWeatherData.combinedDateCuriosity,
          datasets: [
            {
              label: "Pressure [Pa]",
              data: this.state.CuriosityWeatherData.pressure,
              borderColor: "rgb(255, 205, 86)",
              backgroundColor: "rgba(255, 205, 86, 0.5)",
            },
          ],
        },
      },
    });
  };

  componentDidMount() {
    const savedMarsWeatherCharts: State = JSON.parse(localStorage.getItem("MarsWeatherCharts") as string);
    // console.log("savedMarsWeatherCharts:", savedMarsWeatherCharts);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    savedMarsWeatherCharts !== null
      ? (this.setState(savedMarsWeatherCharts), console.log("setting the Mars Charts from the localStorage"))
      : (this.setPerseverance(), console.log("setPerseverance() was called"));
  }

  componentDidUpdate() {
    localStorage.setItem("MarsWeatherCharts", JSON.stringify(this.state));
    // console.log("MarsWeatherCharts was set to the localStorage");
  }

  render() {
    return (
      <>
        <div>
          <H2>Charts of Weather on Mars</H2>
        </div>
        <Div>
          <div style={{width: "740px"}}>
            <button onClick={this.setPerseverance}>Perseverance</button>
            {this.state.lineChartData.dataTemp === undefined ? (
              <div>Fetching Mars Weather Data...</div>
            ) : (
              <Line options={this.state.lineChartData.optionsTemp} data={this.state.lineChartData.dataTemp} />
            )}
          </div>

          <div style={{width: "740px"}}>
            <button onClick={this.setCuriosity}>Curiosity</button>
            {this.state.barChartData.dataPressure === undefined ? (
              <div>Fetching Mars Weather Data...</div>
            ) : (
              <Bar options={this.state.barChartData.optionsPressure} data={this.state.barChartData.dataPressure} />
            )}
          </div>
        </Div>
      </>
    );
  }
}

export default MarsWeatherCharts;
