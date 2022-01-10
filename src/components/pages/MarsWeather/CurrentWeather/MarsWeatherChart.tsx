import React from "react";
import {Chart} from "react-charts";

const MarsWeatherChart = (props: State) => {
  console.log("props.Perseverance_Weather and Curiosity_Weather:", props.Perseverance_Weather, props.Curiosity_Weather);
  const data = React.useMemo(
    () => [
      {
        label: "Series 1",
        data: [
          {x: 1, y: 10},
          {x: 2, y: 10},
          {x: 3, y: 10},
        ],
      },
      {
        label: "Series 2",
        data: [
          {x: 1, y: 10},
          {x: 2, y: 10},
          {x: 3, y: 10},
        ],
      },
      {
        label: "Series 3",
        data: [
          {x: 1, y: 10},
          {x: 2, y: 10},
          {x: 3, y: 10},
        ],
      },
    ],
    []
  );

  const axes = React.useMemo(
    () => [
      {primary: true, type: "linear", position: "bottom"},
      {type: "linear", position: "left"},
    ],
    []
  );

  return (
    <div
      style={{
        width: "400px",
        height: "300px",
      }}
    >
      <div>Weather on Mars</div>
      <Chart data={data} axes={axes} />
    </div>
  );
};

export default MarsWeatherChart;
