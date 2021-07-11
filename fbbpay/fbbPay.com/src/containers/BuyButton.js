import React from "react";
import firebase from "firebase/app";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";
import Popup from "./PopUp";

import ShowBill from "./ShowBill";

class BuyButton extends React.Component {
  state = {
    popUpStatus: false,
    itemsList: [], //controls the state of the pop up
  };

  checkForItemsInDb = () => {
    let db = firebase.firestore();
    let products = db.collection("products");
    let itemsId = [];
    let promises = [];
    this.props.itemsList.forEach((key) => {
      promises.push(
        new Promise((resolve) => {
          products
            .doc(key)
            .get()
            .then((doc) => {
              if (doc.exists) {
                itemsId.push(key);
              }
              resolve();
            })
            .catch((error) => {
              console.log("Error getting  the information:", error);
              toaster.notify(<div>Error !! Try again </div>);
              this.setState({
                popUpStatus: false,
              });
            });
        })
      );
    });

    Promise.all(promises).then(() => {
      this.setState({
        popUpStatus: true,
        itemsList: itemsId,
      });
    });
  };

  popUpOpen = () => {
    this.checkForItemsInDb();
  };

  popUpClose = () => {
    this.setState({ popUpStatus: false });
  };

  render() {
    //console.log(this.state.itemsList);
    return (
      <span>
        <Popup show={this.state.popUpStatus} onClose={this.popUpClose}>
          <ShowBill billItemsId={this.state.itemsList} closePopUp={this.popUpClose}/>
        </Popup>
        <button
          onClick={this.popUpOpen}
          className="btn  btn-danger"
          style={{ width: "5.5rem" }}
        >
          {this.props.value}
        </button>
      </span>
    );
  }
}

export default BuyButton;
