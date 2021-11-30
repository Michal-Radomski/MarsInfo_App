import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import "./App.scss";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Money from "./components/Money";
import Covid from "./components/Covid";
import Weather from "./components/Weather";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/money" component={Money} />
          <Route path="/covid" component={Covid} />
          <Route path="/weather" component={Weather} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
