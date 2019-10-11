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
      previewimg:
        "https://wanowi.com/public/uploads/products/list/product-default.jpg"
    };
  }

  componentDidMount() {
    console.log(this.state);
    if (this.state.imgurl) {
      this.setState({ previewimg: this.state.imgurl });
    }
    if (this.props.location.state) {
      this.selectedEdit(this.props.location.state.id);
    }
  }

  componentDidUpdate(oldprops) {
    if (oldprops.location.pathname !== this.props.location.pathname) {
      this.clearInput();
    }
  }

  selectedEdit = id => {
    axios
      .get(`/api/product/${id}`)
      .then(res => {
        const { name, price, img } = res.data[0];
        this.setState({
          name,
          price,
          imgurl: img,
          previewimg: img
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  editItem = () => {
    console.log(this.state);
    axios
      .put(`/api/product/${this.props.location.state.id}`, {
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

  handlePriceChange = price => {
    this.setState({ price });
  };

  onError = () => {
    this.setState({
      previewimg:
        "https://wanowi.com/public/uploads/products/list/product-default.jpg"
    });
  };

  handleImageChange = imgurl => {
    imgurl
      ? this.setState({ imgurl: imgurl, previewimg: imgurl })
      : this.setState({
          previewimg:
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
      <div className="formDiv">
        <form
          onSubmit={e => {
            e.preventDefault();
            this.props.location.state ? this.editItem() : this.addToDatabase();
            window.location.replace("/");
          }}
        >
          <img
            className="previewimg"
            alt="preview"
            src={this.state.previewimg}
            onError={this.onError}
          />
          <input
            className="formInput"
            value={this.state.name}
            placeholder="product name"
            onChange={e => this.handleNameChange(e.target.value)}
          />
          <input
            className="formInput"
            value={this.state.price}
            placeholder="price"
            onChange={e => this.handlePriceChange(e.target.value)}
          />
          <input
            className="formInput"
            value={this.state.imgurl}
            placeholder="image url"
            onChange={e => this.handleImageChange(e.target.value)}
          />
          <div className="formButtonDiv">
            <button
              className="formButton"
              type="button"
              onClick={() => this.clearInput()}
            >
              Clear
            </button>
            {!this.props.location.state ? (
              <button className="formButton" type="submit">
                Add to Inventory
              </button>
            ) : (
              <button className="formButton" type="submit">
                Save Changes
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
