import React from "react";

const VehicleInfo = ({info, name, imgName}: {info: State; name: string; imgName: string}): JSX.Element => {
  // console.log("{info}:", info);

  const td_Style: State = {
    fontWeight: "bold",
    float: "right",
    fontStyle: "italic",
    color: "lightyellow",
  };

  return (
    <React.Fragment>
      <hr />
      <table width="100%">
        <thead>
          <tr>
            <th>
              <span style={{color: "wheat", fontStyle: "italic", float: "left"}}>Vehicle Name:</span>
            </th>
            <th>
              <span style={{color: "wheat", fontStyle: "italic", float: "right"}}>{name}</span>
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
      </table>
      <hr />
      <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <img src={imgName} alt="name" style={{height: "230px"}} />
      </div>
      <hr />
    </React.Fragment>
  );
};

export default VehicleInfo;
