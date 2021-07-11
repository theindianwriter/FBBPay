import React, { Component } from "react";
import firebase from "../config/fbConfig";
import QrReader from "react-qr-reader";
import { validateKey } from "./../helpers/validate";
import toaster from "toasted-notes";
import { bindActionCreators } from "redux";
import { cartItemAdded } from "./../actions/cartActions";
import { connect } from "react-redux";

class QrScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 300,
      active: false,
    };
  }
  handleButton = () => {
    this.setState({
      active: true,
    });
  };

  handleScan = (key) => {
    if (key) {
      key = key.trim();
      toaster.notify(<div> successfully scanned </div>);
      if (validateKey(key)) {
        let db = firebase.firestore();
        let products = db.collection("products");
        console.log(key);
        products
          .doc(key)
          .get()
          .then((doc) => {
            if (doc.exists) {
              let product = doc.data();
              // do save it to the cart
              this.props.cartItemAdded(product);
              toaster.notify(<div>the product has been added to the cart</div>);
            } else {
              toaster.notify(<div>No such product found </div>);
            }
          })
          .catch((error) => {
            console.log("Error getting  the information:", error);
            toaster.notify(
              <div>Error getting the information please try again!! </div>
            );
          });
      } else {
        toaster.notify(<div>No such product found or wrong qrcode !!! </div>);
      }
      this.setState({
        active: false,
      });
    }
  };
  handleError = (err) => {
    console.error(err);
  };
  render() {
    return (
      <div>
        {this.state.active ? (
          <QrReader
            delay={this.state.delay}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: "30%", height: "50%" }}
          />
        ) : (
          <div style={{ width: "30%", height: "50%" }}>
            <button className="btn" onClick={this.handleButton}>
              SCAN
            </button>
          </div>
        )}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ cartItemAdded }, dispatch);
}

export default connect(null, mapDispatchToProps)(QrScanner);
