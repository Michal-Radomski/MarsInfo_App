import React from "react";
import CountUp from "react-countup";

const CountUpComponent = ({end}: {end: number}): JSX.Element => {
  // console.log("end:", end);
  const [ready, setReady] = React.useState<boolean>(false);

  // Generate random color
  function generateRandomColor() {
    let randomColor: string = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
    randomColor = "#" + randomColor;
    // console.log("randomColor:", randomColor);
    return randomColor;
  }

  const styles = {
    Active: {
      color: generateRandomColor(),
      fontWeight: "bold",
      fontStyle: "normal",
    },
    InActive: {
      color: "black",
      fontWeight: "900",
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
