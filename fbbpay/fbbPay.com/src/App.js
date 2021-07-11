import React from "react";
import Navigation from "./containers/Navigation";
import firebase from "firebase/app";
import { BrowserRouter } from "react-router-dom";

import Header from './containers/Header';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: null,
      loading: true,
      smoothTransition: false,
      visibleHeader: true,
    };
  }
  hideTheHeader = () => {
    this.setState({
      visibleHeader: false,
    });
  };

  listenToScroll = () => {
    if (window.pageYOffset >= 50) {
      this.setState({
        smoothTransition: true,
      });
    } else {
      this.setState({
        smoothTransition: false,
      });
    }
  };
  //whenever the app is rendered authentication is done if the user is logged in or not
  //and the authentication checked is made true
  componentDidMount() {
    window.addEventListener("scroll", this.listenToScroll);
    firebase.auth().onAuthStateChanged((authenticated) => {
      if (authenticated) {
        
        this.setState(() => ({
          authenticated: true,
          loading: false,
        }));
      } else {
        
        this.setState(() => ({
          authenticated: false,
          loading: false,
        }));
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.listenToScroll);
  }

  //renders the app when the authentication checked is true  else renders the loading page
  render() {
    if (!this.state.loading) {
      return (
        <BrowserRouter>
          <Header
            authenticated={this.state.authenticated}
            smoothTransition={this.state.smoothTransition}
          />
          <Navigation
            authenticated={this.state.authenticated}
          />
       </BrowserRouter>
      );
    } else {
      return <div className="preloader">Loading...</div>;
    }
  }
}



export default App;

