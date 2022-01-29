import React from "react";
import {useSelector} from "react-redux";
import {Card, Table} from "react-bootstrap";

const CountryInfoPopover = (): JSX.Element => {
  const storeData = useSelector((state: State) => state?.rootReducer?.location ?? "No Data") as State;
  console.log("storeData:", storeData);

  return <div>CountryInfoPopover</div>;
};

export default CountryInfoPopover;
