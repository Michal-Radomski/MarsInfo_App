import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import "./styles/App.scss";
import Home from "./components/pages/Home";
import MarsWeather from "./components/pages/MarsWeather/MarsWeather";
import Navbar from "./components/navbar/Navbar";
import Mars3D from "./components/pages/Mars3D/Mars3D";
import Covid from "./components/pages/Covid";
import Weather from "./components/pages/Weather";

function App(): JSX.Element {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/mars" component={MarsWeather} />
          <Route path="/mars3d" component={Mars3D} />
          <Route path="/covid" component={Covid} />
          <Route path="/weather" component={Weather} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
