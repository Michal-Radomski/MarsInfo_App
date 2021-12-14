import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import "./styles/App.scss";
import Home from "./components/pages/Home";
import MarsWeather from "./components/pages/MarsWeather/MarsWeather";
import Navbar from "./components/navbar/Navbar";
import Money from "./components/pages/Money";
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
          <Route path="/money" component={Money} />
          <Route path="/covid" component={Covid} />
          <Route path="/weather" component={Weather} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
