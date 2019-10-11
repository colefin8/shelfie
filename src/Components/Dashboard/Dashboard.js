import React from "react";
import Product from "../Product/Product";
import "./Dashboard.css";
import axios from "axios";

function Dashboard(props) {
  //METHODS

  function deleteProduct(id) {
    axios
      .delete(`/api/product/${id}`)
      .then(() => {
        props.getInventory();
      })
      .catch(err => console.log(err));
  }
  return (
    <ul>
      {props.inventory.map((e, i) => {
        return (
          <Product
            selectItem={props.selectItem}
            deleteProduct={deleteProduct}
            key={i}
            item={e}
          />
        );
      })}
    </ul>
  );
}

export default Dashboard;
