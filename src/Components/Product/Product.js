import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";

function Product(props) {
  const { img, name, price, id } = props.item;
  return (
    <li className="product" key={props.i}>
      <img alt="product" className="itemimg" src={img} />
      <div className="rightSide">
        <div>
          <p className="text">{name}</p>
          <p className="text">{`$${price}`}</p>
        </div>
        <div className="buttons">
          <button
            className="productButton"
            onClick={() => props.deleteProduct(id)}
          >
            Delete
          </button>
          <button className="productButton">
            <Link
              className="link"
              to={{
                pathname: `/edit/${id}`,
                state: {
                  id: id
                }
              }}
            >
              Edit
            </Link>
          </button>
        </div>
      </div>
    </li>
  );
}

export default Product;
