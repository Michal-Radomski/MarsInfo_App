import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import "./App.scss";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/pages/Home";
import Money from "./components/pages/Money";
import Covid from "./components/pages/Covid";
import Weather from "./components/pages/Weather";

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
