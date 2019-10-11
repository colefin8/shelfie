import React from "react";
import Product from "../Product/Product";
import "./Dashboard.css";
import axios from "axios";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = { inventory: [] };
  }

  componentDidMount() {
    this.getInventory();
  }

  //METHODS

  getInventory = () => {
    axios
      .get("/api/inventory")
      .then(res => this.setState({ inventory: res.data }))
      .catch(err => console.log(err));
  };

  deleteProduct = id => {
    axios
      .delete(`/api/product/${id}`)
      .then(() => {
        this.getInventory();
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <ul className="dashboardList">
        {this.state.inventory.map((e, i) => {
          return (
            <Product
              selectItem={this.props.selectItem}
              deleteProduct={this.deleteProduct}
              key={i}
              item={e}
            />
          );
        })}
      </ul>
    );
  }
}

export default Dashboard;
