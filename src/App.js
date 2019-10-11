import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Dashboard from "./Components/Dashboard/Dashboard";
import Form from "./Components/Form/Form";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      inventory: [],
      selectedItem: {}
    };
  }

  componentDidMount() {
    this.getInventory();
  }

  selectItem = selectedItem => {
    this.setState({ selectedItem });
  };

  getInventory = () => {
    axios
      .get("/api/inventory")
      .then(res => this.setState({ inventory: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Dashboard
          selectItem={this.selectItem}
          getInventory={this.getInventory}
          inventory={this.state.inventory}
        />
        <Form
          getInventory={this.getInventory}
          selectedItem={this.state.selectedItem}
        />
      </div>
    );
  }
}

export default App;
