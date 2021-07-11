import React, { Component } from "react";
import { firebaseConfig } from "./../config/fbConfig";
import firebase from "../config/fbConfig";
import { validateEmail, validatePassword, getTime } from "./../helpers/validate";
import toaster from "toasted-notes";

class SignupForm extends Component {
  state = {
    firstName: {
      value: "",
      valid: true,
    },
    lastName: {
      value: "",
      valid: true,
    },
    username: {
      value: "",
      valid: true,
    },
    email: {
      value: "",
      valid: true,
    },
    password: {
      value: "",
      valid: true,
    },
    confirmPassword: {
      value: "",
      valid: true,
    },
    error: null,
    createAcountButtonSelected: false,
  };
  //To check if the values submitted are valid or not
  checkValidation(value, type) {
    switch (type) {
      case "firstName":
        return value.length > 0;
      case "lastName":
        return value.length > 0;
      case "email":
        return validateEmail(value);
      case "password":
        return validatePassword(value);
      case "confirmPassword":
        return value === this.state.password.value;
      case "username":
        return value.length > 6 && this.checkUsername(value);
      default:
        return false;
    }
  }

  //Function to validate whether the entered username is unique or not
  checkUsername(username) {
    let db = firebase.firestore();
    db.collection("users")
      .where("username", "==", username)
      .get()
      .then((doc) => {
        this.setState({
          username: {
            value: username,
            valid: doc.empty,
          },
        });
      });
  }
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
  handleClick = (event) => {
    event.preventDefault();
    if (!this.state.createAcountButtonSelected) {
      let {
        firstName,
        lastName,
        email,
        username,
        password,
        confirmPassword,
      } = this.state;
      //Final validation of the entered values
      let validity =
        firstName.valid &&
        firstName.value.length &&
        lastName.valid &&
        lastName.value.length &&
        email.valid &&
        email.value.length &&
        username.valid &&
        password.valid &&
        password.value.length &&
        confirmPassword.valid &&
        confirmPassword.value.length;
      if (validity) {
        this.setState({ createAcountButtonSelected: true });
        const { email, password, username } = this.state;
        const actionCodeSettings = {
          url: "http://localhost:3000/login", //Website's url, should be changed once hoisted
          handleCodeInApp: true,
        };
        var secondaryApp = firebase.initializeApp(firebaseConfig, "Secondary");
        secondaryApp
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
          .then((users) => {
            this.setState({ createAcountButtonSelected: false });
            firebase
              .firestore()
              .doc("users/" + users.user.uid)
              .set({
                email: email.value,
                name: firstName.value + " " + lastName.value,
                username: username.value,
                createdOn: getTime(new Date()),
              });
            users.user
              .sendEmailVerification(actionCodeSettings)
              .then(() => {
                toaster.notify(
                  <div>
                    creation successful!! <br />
                    <br />a link has been sent to your email, please verify it
                    and login again
                  </div>
                );
                this.setState({
                  error: {
                    message: "please verify your e-mail and login again",
                  },
                  createAcountButtonSelected: false,
                });
                this.props.history.push("/");
              })
              .catch((error) => {
                secondaryApp.delete();
                toaster.notify(<div>{error.message}</div>);
                this.setState({
                  error: error,
                  createAcountButtonSelected: false,
                });
              });
            secondaryApp.delete();
          })
          .catch((error) => {
            secondaryApp.delete();
            toaster.notify(<div>{error.message}</div>);
            this.setState({
              error: error,
              createAcountButtonSelected: false,
            });
          })
          .catch((error) => {
            secondaryApp.delete();
            toaster.notify(<div>{error.message}</div>);
            this.setState({
              error: error,
              createAcountButtonSelected: false,
            });
          });
      } else {
        toaster.notify("Incorrect form fill up");
      }
    }
  };

  render() {
    return (
      <div className="image-background">
        <div className="container m-4">
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-9 ">
              <h1 align="center">CREATE YOUR FASHION BAZAAR ACCOUNT</h1>
              {this.state.createAcountButtonSelected ? (
                <div className="loading" />
              ) : null}
              <form>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">First Name:</label>
                  <div className="col-sm-10">
                    <input
                      className="form-control"
                      type="text"
                      data-type="firstName"
                      onChange={this.handleChange}
                      placeholder="Enter your first name here"
                    />
                    {!this.state.firstName.valid ? (
                      <small style={{ color: "red" }}>
                        First Name cannot be empty
                      </small>
                    ) : null}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Last Name:</label>
                  <div className="col-sm-10">
                    <input
                      className="form-control"
                      type="text"
                      data-type="lastName"
                      onChange={this.handleChange}
                      placeholder="Enter your last name here"
                    />
                    {!this.state.lastName.valid ? (
                      <small style={{ color: "red" }}>
                        Last Name cannot be empty
                      </small>
                    ) : null}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Username:</label>
                  <div className="col-sm-10">
                    <input
                      className="form-control"
                      type="text"
                      data-type="username"
                      onChange={this.handleChange}
                      placeholder="Enter your unique username here"
                    />
                    {!this.state.username.valid ? (
                      <small style={{ color: "red" }}>
                        Username should atleast be of 7 characters and should be
                        unique
                      </small>
                    ) : null}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Email:</label>
                  <div className="col-sm-10">
                    <input
                      className="form-control"
                      type="text"
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
                      placeholder="Enter your Password"
                    />
                    {!this.state.password.valid ? (
                      <small style={{ color: "red" }}>
                        Use 8 or more characters max 16 with a mix of
                        letters,capital letters, numbers & symbols
                      </small>
                    ) : null}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">
                    Confirm Password:
                  </label>
                  <div className="col-sm-10">
                    <input
                      className="form-control"
                      type="password"
                      data-type="confirmPassword"
                      onChange={this.handleChange}
                      placeholder="Confirm Your Password"
                      disabled={
                        this.state.password.valid &&
                        this.state.password.value.length
                          ? null
                          : "disabled"
                      }
                    />
                  </div>
                </div>
                {!this.state.confirmPassword.valid ? (
                  <small style={{ color: "red" }}>
                    Password and confirm password should be same
                  </small>
                ) : null}
              </form>
              <div className="row">
                <div className="col-sm-10" />
                <div className="col-sm- ">
                  <button
                    type="submit"
                    className="btn btn-dark pb-2 mb-2"
                    onClick={this.handleClick}
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default SignupForm;

