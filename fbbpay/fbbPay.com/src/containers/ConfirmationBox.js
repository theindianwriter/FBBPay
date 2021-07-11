import React from "react";
import "./ConfirmationBox.css";

const ConfirmationBox = (props) => {
  return (
    <div id="confirmationBox">
      <h4>{props.argument}</h4>
      <button className="btn  btn-danger" onClick={props.handlePopUp}>
        Yes
      </button>
      <button className="btn  btn-danger" onClick={props.closePopUp}>
        No
      </button>
    </div>
  );
};

export default ConfirmationBox;
