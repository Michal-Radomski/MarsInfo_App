import Table from "react-bootstrap/Table";

const WeatherTable = (props: {weatherLast: Sol}) => {
  // console.log("props.weatherLast:", props.weatherLast);
  const weatherCondition = props.weatherLast;
  // console.log("weatherCondition:", weatherCondition);
  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th colSpan={2}>
              Latest Weather Conditions at Jezero Crater for
              <br />
              Terrestrial Date:{" "}
              <span style={{fontStyle: "italic", color: "maroon"}}>{weatherCondition.terrestrial_date}</span>
              <span style={{fontStyle: "italic", float: "right"}}>
                <a href="https://mars.nasa.gov/mars2020/weather/" target="_blank" rel="noreferrer">
                  Read more...
                </a>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sol number</td>
            <td style={{fontWeight: "bold"}}>{weatherCondition.sol}</td>
          </tr>
          <tr>
            <td>Min temp</td>
            <td style={{fontWeight: "bold"}}>{weatherCondition.min_temp} °C</td>
          </tr>
          <tr>
            <td>Max temp</td>
            <td style={{fontWeight: "bold"}}>{weatherCondition.max_temp} °C</td>
          </tr>
          <tr>
            <td>Pressure</td>
            <td style={{fontWeight: "bold"}}>{weatherCondition.pressure} Pa</td>
          </tr>
          <tr>
            <td>Sunrise (Local Mean Solar Time)</td>
            <td style={{fontWeight: "bold"}}>{weatherCondition.sunrise}</td>
          </tr>
          <tr>
            <td>Sunset (Local Mean Solar Time)</td>
            <td style={{fontWeight: "bold"}}>{weatherCondition.sunset}</td>
          </tr>
          <tr>
            <td>Martian Season</td>
            <td style={{fontWeight: "bold", textTransform: "capitalize"}}>{weatherCondition.season}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default WeatherTable;
