import React from "react";

import Spinner from "../../Spinner";

const MarsPictures = (): JSX.Element => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, [isLoading]);

  return isLoading ? (
    <Spinner />
  ) : (
    <div style={{textAlign: "center"}}>
      <h1>NASA Pictures of Mars</h1>
      <h3>Under Construction...</h3>
    </div>
  );
};

export default MarsPictures;
