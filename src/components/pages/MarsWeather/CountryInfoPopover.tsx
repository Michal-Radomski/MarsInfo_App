import React from "react";
import {Popover, OverlayTrigger} from "react-bootstrap";
import {useSelector} from "react-redux";

const CountryInfoPopover = (): JSX.Element => {
  const storeData = useSelector((state: State) => state?.rootReducer?.location ?? "No Data") as State;
  console.log("storeData:", storeData);

  const popover = (
    <Popover id="popoverLocation" style={{minWidth: "20%"}}>
      <Popover.Header as="h3">
        Yor are in:
        <span style={{float: "right"}}>
          {`${storeData.city}, ${storeData.country}`}
          {"\u00A0 \u00A0"}
          <img
            src={storeData.country_flag}
            height="16px"
            alt="Country flag"
            style={{marginBottom: "5px", border: "1px solid #666"}}
          />
        </span>
      </Popover.Header>
      <Popover.Body>
        Your IP is: <strong style={{float: "right"}}>{`${storeData.ip}`}</strong>
        <br />
        Your location is:
        <strong style={{float: "right"}}>{`${storeData.latitude.toFixed(5)}, ${storeData.longitude.toFixed(5)}`}</strong>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="right-end" overlay={popover} rootClose={true}>
      <div
        id="marker"
        // title={this.state.center}  //- original tooltip
        style={{
          width: "20px",
          height: "20px",
          border: "2px solid #088",
          borderRadius: "10px",
          backgroundColor: "#0FF",
          opacity: "0.5",
        }}
      ></div>
    </OverlayTrigger>
  );
};

export default CountryInfoPopover;
