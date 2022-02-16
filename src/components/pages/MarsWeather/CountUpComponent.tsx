import React from "react";
import CountUp from "react-countup";

const CountUpComponent = ({end}: {end: number}): JSX.Element => {
  // console.log("end:", end);
  return (
    <React.Fragment>
      {end >= 500 ? (
        <CountUp separator=" " start={0} end={end} delay={0.8} duration={2.5} />
      ) : (
        <CountUp separator=" " start={0} end={end} delay={0.5} duration={2.5} decimals={3} decimal="." />
      )}
    </React.Fragment>
  );
};

export default CountUpComponent;
