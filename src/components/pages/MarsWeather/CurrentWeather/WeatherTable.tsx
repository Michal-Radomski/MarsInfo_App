import Table from "react-bootstrap/Table";

const WeatherTable = (props: {weatherLastRecord: Sol; location: string; URL_href: string}): JSX.Element => {
  // console.log("props.weatherLast:", props.weatherLast);
  const weatherCondition = props.weatherLastRecord;
  // console.log("weatherCondition:", weatherCondition);
  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th colSpan={2}>
              Latest Weather Conditions at <span style={{fontStyle: "italic", color: "maroon"}}>{props.location}</span> for
              <br />
              Terrestrial Date:{" "}
              <span style={{fontStyle: "italic", color: "maroon"}}>{weatherCondition.terrestrial_date ?? "No Data"}</span>
              <span style={{fontStyle: "italic", float: "right"}}>
                <a href={props.URL_href} target="_blank" rel="noreferrer">
                  Read more...
                </a>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <a
                href="https://en.wikipedia.org/wiki/Sol_(day_on_Mars)"
                target="_blank"
                rel="noreferrer"
                style={{fontStyle: "italic", fontWeight: "bold"}}
              >
                Sol
              </a>{" "}
              number
            </td>
            <td style={{fontWeight: "bold"}}>{weatherCondition.sol ?? "No Data"}</td>
          </tr>
          <tr>
            <td>Min temp</td>
            <td style={{fontWeight: "bold"}}>{weatherCondition.min_temp ?? "No Data"} °C</td>
          </tr>
          <tr>
            <td>Max temp</td>
            <td style={{fontWeight: "bold"}}>{weatherCondition.max_temp ?? "No Data"} °C</td>
          </tr>
          <tr>
            <td>Pressure</td>
            <td style={{fontWeight: "bold"}}>{weatherCondition.pressure ?? "No Data"} Pa</td>
          </tr>
          <tr>
            <td>Sunrise (Local Mean Solar Time)</td>
            <td style={{fontWeight: "bold"}}>{weatherCondition.sunrise ?? "No Data"}</td>
          </tr>
          <tr>
            <td>Sunset (Local Mean Solar Time)</td>
            <td style={{fontWeight: "bold"}}>{weatherCondition.sunset ?? "No Data"}</td>
          </tr>
          <tr>
            <td>Martian Season</td>
            <td style={{fontWeight: "bold", textTransform: "capitalize"}}>{weatherCondition.season ?? "No Data"}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default WeatherTable;
