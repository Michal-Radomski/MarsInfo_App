import React from "react";
import CountUp from "react-countup";

const CountUpComponent = ({end}: {end: number}): JSX.Element => {
  // console.log("end:", end);
  const [ready, setReady] = React.useState<boolean>(false);

  const styles = {
    Active: {
      color: "#0D6EFD",
      fontWeight: "normal",

      fontStyle: "normal",
    },
    InActive: {
      color: "black",
      fontWeight: "bold",
      fontStyle: "italic",
    },
  };

  return (
    <>
      {end >= 500 ? (
        <CountUp
          separator=" "
          start={0}
          end={end}
          delay={0.8}
          duration={2.5}
          onEnd={() => setReady(true)}
          style={!ready ? styles.Active : styles.InActive}
        />
      ) : (
        <CountUp
          separator=" "
          start={0}
          end={end}
          delay={0.8}
          duration={2.5}
          decimals={3}
          decimal="."
          onEnd={() => setReady(true)}
          style={!ready ? styles.Active : styles.InActive}
        />
      )}
    </>
  );
};

export default CountUpComponent;
