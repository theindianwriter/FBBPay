import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import toaster from "toasted-notes";
import { bindActionCreators } from "redux";
import { cartItemDeleted } from "./../actions/cartActions";
import axios from "axios";

class ShowBill extends React.Component {
  state = {
    products: {},
  };

  componentDidMount() {
    const { cartItems, billItemsId } = this.props;
    let totalPrice = 0;
    let products = {};
    billItemsId.forEach((id) => {
      products[id] = cartItems[id];
      totalPrice += cartItems[id].price;
    });
    products.price = totalPrice;
    this.setState({ products: products });
  }

  onToken = (token) => {
    let { products } = this.state;
    const { billItemsId } = this.props;
    let body = { token, products };
    axios.post("http://localhost:5000/payment", body).then((response) => {
      if (response.status === 200) {
        billItemsId.forEach((id) => {
          this.props.cartItemDeleted(id);
        });
        // post a request to download receipt
        this.props.closePopUp();
        toaster.notify(<div>Payment successful</div>);
      }
    });
  };

  render() {
    const { cartItems, billItemsId } = this.props;
    let totalPrice = 0;
    let dt = new Date();
    return (
      <div
        style={{
          backgroundColor: "white",

          top: "5%",
          left: "5%",
          position: "fixed",

          width: "90%",

          //margin: "5% auto",
        }}
      >
        <div className="container m-4">
          <div className="row">
            <div className="col-3">
              <h1 align="left">fbbPay </h1>
            </div>
            <div className="col-9" align="right">
              <h6>
                Date issued :{" "}
                {dt.getDate() +
                  "/" +
                  (dt.getMonth() + 1) +
                  "/" +
                  dt.getFullYear()}
              </h6>
              <h6>Bill id : {dt.getTime()}</h6>
              <h6>Billed to : Username</h6>
            </div>
          </div>
          {billItemsId.length ? (
            <div>
              <table className="table table-sm table-dark table-striped">
                {/* <caption>Product list</caption> */}
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">id</th>
                    <th scope="col">name</th>
                    <th scope="col">Price(Rs.)</th>
                  </tr>
                </thead>
                <tbody>
                  {billItemsId.map((id, index) => {
                    totalPrice += cartItems[id].price;
                    return (
                      <tr key={id}>
                        <th scope="row"> {index + 1}</th>
                        <td>{id}</td>
                        <td>{cartItems[id].name}</td>
                        <td>{cartItems[id].price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div align="right">
                <h1>
                  <span className="badge badge-secondary">
                    <span className="badge badge-secondary">TOTAL PRICE</span>{" "}
                    Rs. {totalPrice}
                  </span>
                </h1>
              </div>
              <div align="center">
                <StripeCheckout
                  token={this.onToken}
                  stripeKey="pk_test_QhYz43BU9mlqvqxnq7B5uSHv00bCFrtQdu"
                >
                  {" "}
                  <button className="btn btn-primary">Make Payment</button>
                </StripeCheckout>
              </div>
              <br />
              <h6 align="center">
                Make sure to have all the products with you
              </h6>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItems,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ cartItemDeleted }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowBill);
