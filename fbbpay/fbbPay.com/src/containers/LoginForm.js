import React, { Component } from "react";

import firebase from "../config/fbConfig";
import { firebaseConfig } from "./../config/fbConfig";
import { validateEmail, validatePassword } from "./../helpers/validate";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";
import { getTime } from "./../helpers/validate";

class LoginForm extends Component {
  state = {
    email: {
      value: "",
      valid: true,
    },
    password: {
      value: "",
      valid: true,
    },
    error: null,
    loginButtonSelected: false,
  };
  // To check whether the inputs are valid or not
  checkValidation = (value, type) => {
    switch (type) {
      case "email":
        return validateEmail(value);
      case "password":
        return validatePassword(value);
      default:
        return false;
    }
  };
  handleChange = (event) => {
    const { value } = event.target;
    const { type } = event.target.dataset;
    this.setState({
      [type]: {
        value,
        valid: this.checkValidation(value, type),
      },
    });
  };
  // When user signs in with google
  signInWithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider()) //Firebase's in-built function
      .then((data) => {
        if (data.additionalUserInfo.isNewUser) {
          firebase
            .firestore()
            .doc("users/" + data.user.uid)
            .set({
              username: data.user.email.substring(
                0,
                data.user.email.indexOf("@")
              ), //Username will be "abc" if email id is "abc@eample.com"
              email: data.user.email,
              name: data.user.displayName,
              CreatedOn: getTime(new Date()),
              //For Notification, will be set later
            })
            .then(() => {
              toaster.notify("Successful login");
              this.props.history.push("/cart");
            });
        } else {
          toaster.notify("Successful login");
          this.props.history.push("/cart");
        }
      })
      .catch((error) => {
        toaster.notify(<div>{error.message}</div>);
      });
  };
  //Function to tackel when user forgets it's password
  handleForgetPassword = (event) => {
    event.preventDefault();
    let { email } = this.state;
    let auth = firebase.auth();
    if (!this.state.loginButtonSelected) {
      if (email.value.length && email.valid) {
        this.setState({ loginButtonSelected: true });
        const actionCodeSettings = {
          url: "http://localhost:3000/login", //Website's url, should be changed after it's hoisted
          handleCodeInApp: true,
        };
        auth
          .sendPasswordResetEmail(this.state.email.value, actionCodeSettings)
          .then(() => {
            toaster.notify("Check email to reset password");
            this.setState({ loginButtonSelected: false });
            this.props.history.push("/");
          })
          .catch((error) => {
            this.setState({ loginButtonSelected: false });
            toaster.notify(<div>{error.message}</div>);
          });
      } else {
        toaster.notify("Enter the registered email in the email section");
      }
    }
  };
  //This function is called Login button is clicked
  handleClick = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    let validity =
      email.valid &&
      password.valid &&
      email.value.length &&
      password.value.length;
    if (!validity) {
      //To check if values submitted is valid or not
      toaster.notify("Error!! Correct your login form");
    }
    if (!this.state.loginButtonSelected && validity) {
      this.setState({ loginButtonSelected: true, error: null });
      var secondaryApp = firebase.initializeApp(firebaseConfig, "Secondary");
      secondaryApp
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then((users) => {
          if (users.user.emailVerified) {
            firebase
              .auth()
              .signInWithEmailAndPassword(email.value, password.value)
              .then((user) => {
                this.setState({ loginButtonSelected: false });
                toaster.notify("Successful login");
                this.props.history.push("/");
              })
              .catch((error) => {
                secondaryApp.delete();
                toaster.notify(<div>{error.message}</div>);
                this.setState({ error: error, loginButtonSelected: false });
              });

            secondaryApp.delete();
          } else {
            toaster.notify(
              "A link has been sent to your registered email please verify it and login again"
            );
            secondaryApp.delete();
            this.setState({
              error: { message: "Verify your email" },
              loginButtonSelected: false,
            });
          }
        })
        .catch((error) => {
          secondaryApp.delete();
          toaster.notify(<div>{error.message}</div>);
          this.setState({ error: error, loginButtonSelected: false });
        });
    }
  };
  render() {
    return (
      <div className="image-background">
        <div className="container m-4">
          <div className="row">
            <div className="col-sm-3" />
            <div className="col-sm-9 ">
              <h1 align="center">LOGIN TO YOUR FASHION BAZAAR ACCOUNT</h1>
              {this.state.loginButtonSelected ? (
                <div className="loading" />
              ) : null}
              <form>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Email Id:</label>
                  <div className="col-sm-10">
                    <input
                      className="form-control"
                      type="email"
                      data-type="email"
                      onChange={this.handleChange}
                      placeholder="Enter your email id"
                    />
                    {!this.state.email.valid ? (
                      <small style={{ color: "red" }}>Invalid Email</small>
                    ) : null}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Password:</label>
                  <div className="col-sm-10">
                    <input
                      className="form-control"
                      type="password"
                      data-type="password"
                      onChange={this.handleChange}
                      placeholder="Enter your password"
                    />
                    {!this.state.password.valid ? (
                      <small style={{ color: "red" }}>Invalid Password</small>
                    ) : null}
                  </div>
                </div>
              </form>

              <div className="row mb-2">
                <div className="col-10" />
                <div className="col-2 ">
                  <button
                    type="submit"
                    className="btn btn-dark "
                    onClick={this.handleClick}
                  >
                    Login
                  </button>
                </div>
              </div>
              {"  "}
              <div className="row justify-content-md-center">
                <div className="col-12">
                  <button
                    //  style={{ color: "blue", marginLeft: "38%" }}
                    className="btn btn-block"
                    onClick={this.handleForgetPassword}
                  >
                    Forgot password
                  </button>
                </div>
              </div>
              <h4 align="center">OR</h4>
              <div className="row justify-content-md-center">
                <div className="col-12">
                  <button
                    className="btn-block google"
                    onClick={this.signInWithGoogle}
                  >
                    Login with Google
                  </button>
                </div>
              </div>
            </div>
            <div className="col-2" />
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
