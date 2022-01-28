import {Table} from "react-bootstrap";

const td_Style: State = {
  fontWeight: "bold",
  float: "right",
  fontStyle: "italic",
  color: "whiteSmoke",
};

const VehicleInfo = ({info, name}: {info: State; name: string}): JSX.Element => {
  // console.log("{info}:", info);

  return (
    <Table striped bordered hover variant="dark" width="100%">
      <thead>
        <tr>
          <th>
            <span style={{color: "lightyellow", fontStyle: "italic", float: "left"}}>Vehicle Name:</span>
          </th>
          <th>
            <span style={{color: "lightyellow", fontStyle: "italic", float: "right"}}>{name}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Launch Date: </td>
          <td style={td_Style}>{info.launchDate}</td>
        </tr>
        <tr>
          <td>Landing Site: </td>
          <td style={td_Style}>{info.landingSite}</td>
        </tr>
        <tr>
          <td>Coordinates: </td>
          <td style={td_Style}>{info.coordinates}</td>
        </tr>
        <tr>
          <td>Landing Date: </td>
          <td style={td_Style}>{info.landingDate}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default VehicleInfo;
