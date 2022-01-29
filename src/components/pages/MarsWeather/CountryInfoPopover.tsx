import React from "react";
import {useSelector} from "react-redux";
import {Card, Table} from "react-bootstrap";

const CountryInfoPopover = (): JSX.Element => {
  const storedData = useSelector((state: State) => state?.rootReducer?.location ?? "No Data") as State;
  // console.log("storedData:", storedData);
  const {currency_code, country} = storedData;
  console.log("currency_code, country:", currency_code, country);

  return <div>CountryInfoPopover</div>;
};

export default CountryInfoPopover;
