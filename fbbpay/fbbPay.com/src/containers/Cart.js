import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toaster from "toasted-notes";
import { cartItemDeleted } from "./../actions/cartActions";
import BuyButton from "./BuyButton";

class Cart extends React.Component {
  handleRemove = (event) => {
    this.props.cartItemDeleted(event.target.id);
    toaster.notify(<div>the item removed from the cart </div>);
  };

  render() {
    const { cartItems } = this.props;
    return (
      <div>
        <div className="container mt-2 mb-1" align="right">
          <BuyButton value="Buy all" itemsList={Object.keys(cartItems)} />
        </div>
        <div className="jumbotron p-3">
          <div className="card-deck">
            {Object.values(cartItems).map((
              item //get all the unfinished tasks of indiviual priority
            ) => (
              <div
                className="card mb-3"
                style={{ maxWidth: "14rem", minWidth: "14rem" }}
                key={item.id}
              >
                <div className="card-header font-weight-bold">
                  Rs. {item.price}
                </div>
                <div className="card-body">
                  <h4 className="card-title">{item.name}</h4>

                  <h5>{item.color}</h5>

                  <h5>{item.brand}</h5>
                </div>
                <div className="card-footer">
                  <BuyButton value="Buy" itemsList={[item.id]} />
                  <button
                    onClick={this.handleRemove}
                    id={item.id}
                    className="btn btn-info"
                    style={{ width: "5.5rem" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
