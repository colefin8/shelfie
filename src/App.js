import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Dashboard from "./Components/Dashboard/Dashboard";
import Form from "./Components/Form/Form";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route component={Dashboard} exact path="/" />
        <Route component={Form} path="/add" />
        <Route component={Form} path="/edit/:id" />
      </Switch>
    </div>
  );
}

export default App;
