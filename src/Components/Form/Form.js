import React, { Component } from "react";
import "./Form.css";
import axios from "axios";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: "",
      imgurl: "",
      previewurl: "",
      editId: null
    };
  }

  componentDidUpdate(oldProps) {
    if (this.props.selectedItem.id !== oldProps.selectedItem.id) {
      this.setState({ editId: this.props.selectedItem.id });
    }
  }
  //METHODS

  editItem = () => {
    console.log(this.state);
    axios
      .put(`/api/product/${this.state.editId}`, {
        name: this.state.name,
        price: this.state.price,
        imgurl: this.state.imgurl
      })
      .then(this.props.getInventory())
      .catch(err => console.log(err));
  };

  handleNameChange = name => {
    this.setState({ name });
    // console.log(`this.state.name: ${this.state.name}`);
  };

  handlePriceChange = value => {
    const price = parseInt(value);
    this.setState({ price });
  };

  onError = () => {
    this.setState({
      imgurl:
        "https://wanowi.com/public/uploads/products/list/product-default.jpg"
    });
  };

  handleImageChange = imgurl => {
    imgurl
      ? this.setState({ imgurl, previewurl: imgurl })
      : this.setState({
          imgurl:
            "https://wanowi.com/public/uploads/products/list/product-default.jpg",
          previewurl:
            "https://wanowi.com/public/uploads/products/list/product-default.jpg"
        });
    // console.log(`this.state.imgurl: ${this.state.imgurl}`);
  };

  addToDatabase = () => {
    const newProduct = {
      name: this.state.name,
      price: this.state.price,
      imgurl: this.state.imgurl
    };
    console.log(newProduct);

    axios
      .post("/api/product", newProduct)
      .then(res => {
        console.log(res);
        this.clearInput();
      })
      .catch(err => console.log(`client side err: ${err}`));
    this.clearInput();
  };

  clearInput = () => {
    this.setState({ name: "", price: "", imgurl: "" });
  };

  //RENDER

  render() {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          this.state.editId === null ? this.addToDatabase() : this.editItem();
        }}
      >
        <input
          value={this.state.input}
          placeholder="product name"
          onChange={e => this.handleNameChange(e.target.value)}
        />
        <input
          value={this.state.price}
          placeholder="price"
          onChange={e => this.handlePriceChange(e.target.value)}
        />
        <input
          placeholder="image url"
          onChange={e => this.handleImageChange(e.target.value)}
        />
        <button type="reset">Cancel</button>
        {this.state.editId === null ? (
          <button type="submit">Add to Inventory</button>
        ) : (
          <button type="submit">Save Changes</button>
        )}
        <img
          className="previewimg"
          alt="preview"
          src={this.state.imgurl}
          onError={this.onError}
        />
      </form>
    );
  }
}

export default Form;
