import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

function Register() {
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmailAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [redirectState, setRedirect] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);

  function onFormSubmit(e) {
    setFailedLogin(false);

    e.preventDefault();

    if (!(password.length >= 6)) {
      setErrorText("Your password must be at least 6 characters.");
      setFailedLogin(true);
    } else if (password != confPassword) {
      setErrorText("The passwords do not match.");
      setFailedLogin(true);
    }

    if (!failedLogin) {
      axios
        .post("http://localhost:5000/users/register", {
          userName: userName,
          password: password,
          emailAdd: email,
          fullName: fullName,
        })
        .then(
          (response) => {
            console.log(response);
            setRedirect(true);
            setFailedLogin(false);
          },
          (error) => {
            console.log(error);
            setRedirect(false);
            setFailedLogin(true);
            setErrorText(error.response.data);
          }
        );
    }
  }

  return (
    <>
      {redirectState ? <Redirect to="/login" /> : null}
      {failedLogin ? (
        <div class="container">
          <div class="alert alert-danger">{errorText}</div>
        </div>
      ) : null}
      <div id="background-login">
        <div class="container">
          <center class="card-center">
            <div class="row">
              <div class="col-lg-3"></div>
              <div class="col-lg-3" id="middle">
                <div class="card bg-secondary text-white" id="cardRegister">
                  <div class="card-header">
                    <p>
                      <h1 class="Welcome-text">Welcome!</h1>
                      Please enter your information below to register your
                      account.
                    </p>
                  </div>
                  <div class="card-body">
                    <form onSubmit={onFormSubmit}>
                      <div class="form-group">
                        <label for="formControlUserName">Username</label>
                        <input
                          type="userName"
                          class="form-control"
                          id="formControlUserName"
                          placeholder="Username"
                          name="userName"
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </div>
                      <div class="form-group">
                        <label for="formControlEmail">Email</label>
                        <input
                          type="email"
                          class="form-control"
                          id="formControlEmail"
                          placeholder="something@something.com"
                          name="email"
                          onChange={(e) => setEmailAddress(e.target.value)}
                        />
                      </div>
                      <div class="form-group">
                        <label for="formControlFullName">Full Name</label>
                        <input
                          type="fullName"
                          class="form-control"
                          id="formControlFullName"
                          placeholder="John Smith"
                          name="fullName"
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                      <div class="form-group">
                        <label for="FormControlPassword">Password</label>
                        <input
                          type="password"
                          class="form-control"
                          id="FormControlPassword"
                          placeholder="******"
                          name="password1"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div class="form-group">
                        <label for="FormControlPassword">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          class="form-control"
                          id="FormControlPassword"
                          placeholder="******"
                          name="password2"
                          onChange={(e) => setConfPassword(e.target.value)}
                        />
                      </div>
                      <div class="form-group">
                        <center>
                          <button type="submit" class="btn btn-dark">
                            Create Account
                          </button>
                        </center>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-lg-3"></div>
            </div>
          </center>
        </div>
      </div>
    </>
  );
}

export default Register;
