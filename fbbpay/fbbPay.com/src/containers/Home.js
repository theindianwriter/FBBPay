import React from "react";
import QrScanner from "./QrScanner";

export default class Home extends React.Component {
  render() {
    return (
      <main>
        <div align="center" className="container">
          {this.props.authenticated ? <QrScanner /> : null}
        </div>
      </main>
    );
  }
}
