import React from "react";
import styled from "styled-components";

const DivLocalWeather = styled.div`
  background-color: yellow;
  min-width: 150px;
  height: 350px;
`;

const LocalWeather = () => {
  return <DivLocalWeather>Local Weather</DivLocalWeather>;
};

export default LocalWeather;
