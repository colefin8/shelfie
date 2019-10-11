import React, { Component } from "react";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: 0,
      imgurl: ""
    };
  }
  //METHODS

  handleNameChange = () => {};

  handleImageChange = () => {};

  addToDatabase = () => {};

  clearInput = () => {};

  //RENDER

  render() {
    return (
      <form>
        <input placeholder="product name" />
        <input placeholder="image url" />
        <button type="reset">Cancel</button>
        <button type="submit">Add to Inventory</button>
      </form>
    );
  }
}

export default Form;
