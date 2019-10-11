import React from "react";

function Product(props) {
  return (
    <div className="product">
      <li key={props.i}>
        <img alt="product" className="itemimg" src={props.item.img} />
        <h2>{props.item.name}</h2>
        <h3>{props.item.price}</h3>
      </li>
      <button onClick={() => props.deleteProduct(props.item.id)}>Delete</button>
      <button onClick={() => props.selectItem(props.item)}>Edit</button>
    </div>
  );
}

export default Product;
