import "../styling/App.css";
import React, { useState, useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import MyAccount from "./MyAccount";
import EditName from "./EditName";
import EditUsername from "./EditUsername";
import EditHomeAddress from "./EditHomeAddress";
import EditNick from "./EditNick";
import EditEmail from "./EditEmail";
import EditPassword from "./EditPassword"
import MyAccountPayment from "./MyAccountPayment";
import MyAccountShipping from "./MyAccountShipping";
import Cart from "./Cart";
import Search from "./Search";
import Nav from "./Nav";
import BookDetails from "./BookDetails";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";

function App() {
  //Here we are creating a state apiResponse, and a method setAPI to change the value of that state
  // const [apiResponse, setAPI] = useState({
  //   list: []
  // });
  const [loginState, setLoginState] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setName] = useState("");
  const [nickName, setNick] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [creditCards, setCreditCards] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);

  // //Call the useEffect hook
  // useEffect(() =>{
  //   //Create an axios request to our api at /testAPI route
  //   axios({
  //     "method": "GET",
  //     "url": "http://localhost:5000/users",
  //   })
  //   //set apiResponse to the retrieved data
  //   .then((response) => {
  //     alert(JSON.stringify(response.data));
  //   })
  //   //log any errors if they apply
  //   .catch((error) => {
  //     console.log(error)
  //   })
  // });

  function setLoggedIn(status) {
    setLoginState(status);
  }

  function isLoggedIn() {
    return loginState;
  }

  function logUserOut() {
    setLoginState(false);
    setUserName("");
    setPassword("");
    setName("");
    setNick("");
    setEmailAddress("");
    setHomeAddress("");
    setCreditCards([]);
  }

  function getUserInformation(information) {
    var tempObject = JSON.parse(information);
    setUserName(tempObject.userName);
    setPassword(tempObject.password);
    setName(tempObject.name);
    setNick(tempObject.nickname);
    setHomeAddress(tempObject.homeAddress);
    setEmailAddress(tempObject.emailAddress);
    setShoppingCart(tempObject.cart);
  }

  return (
    <Router>
      <div className="App">
        <Nav isLoggedIn={isLoggedIn} />
        <Switch>
          <Route path="/Login">
            <Login
              setLoggedIn={setLoggedIn}
              getUserInformation={getUserInformation}
            />
          </Route>
          <Route path="/Register">
            <Register />
          </Route>
          <Route path="/MyAccount">
            <MyAccount
              userName={userName}
              password={password}
              homeAddress = {homeAddress}
              name={fullName}
              nickName={nickName}
              emailAddress={emailAddress}
              isLoggedIn={isLoggedIn}
              logUserOut={logUserOut}
            />
          </Route>
          <Route path="/EditName">
            <EditName
              userName= {userName}
              isLoggedIn={isLoggedIn}
              logUserOut={logUserOut}
            />
          </Route>
          <Route path="/EditUsername">
            <EditUsername
              userName= {userName}
              isLoggedIn={isLoggedIn}
              logUserOut={logUserOut}
            />
          </Route>
          <Route path="/EditHomeAddress">
            <EditHomeAddress
              userName= {userName}
              isLoggedIn={isLoggedIn}
              logUserOut={logUserOut}
            />
          </Route>
          <Route path="/EditNick">
            <EditNick
              userName= {userName}
              isLoggedIn={isLoggedIn}
              logUserOut={logUserOut}
            />
          </Route>
          <Route path="/EditEmail">
            <EditEmail
              emailAddress = {emailAddress}
              userName= {userName}
              isLoggedIn={isLoggedIn}
              logUserOut={logUserOut}
            />
          </Route>
          <Route path="/EditPassword">
            <EditPassword
              password = {password}
              userName= {userName}
              isLoggedIn={isLoggedIn}
              logUserOut={logUserOut}
            />
          </Route>
          <Route path="/ShippingInformation">
            <MyAccountShipping
              name={fullName}
              homeAddress={homeAddress}
              isLoggedIn={isLoggedIn}
              logUserOut={logUserOut}
            />
          </Route>
          <Route path="/PaymentInformation">
            <MyAccountPayment
              name={fullName}
              isLoggedIn={isLoggedIn}
              logUserOut={logUserOut}
            />
          </Route>
          <Route path="/BookDetails">
            <BookDetails />
          </Route>
          <Route path="/Cart">
            <Cart
              userName={userName}
              password={password}
              name={fullName}
              nickName={nickName}
              emailAddress={emailAddress}
              cart={shoppingCart}
              isLoggedIn={isLoggedIn}
            />
          </Route>
          <Route path="/Search">
            <Search
              userName={userName}
              password={password}
              cart={shoppingCart}
              isLoggedIn={isLoggedIn}
            />
          </Route>
          <Route path="/Dashboard">
            <Home />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
