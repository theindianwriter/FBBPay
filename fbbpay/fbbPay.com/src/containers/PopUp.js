import React from "react";
import "./PopUp.css";
//this component is responsible for the popup of the component
class Popup extends React.Component {
  handleClick = event => {
    //if anything in the div component "popup" is clicked it would close the popup
    if (event.target.getAttribute("popup")) {
      this.props.onClose();
    }
  };

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="popupBackdrop" popup="true" onClick={this.handleClick}>
        {this.props.children}
        {/* renders the component send to the popup */}
      </div>
    );
  }
}
export default Popup;