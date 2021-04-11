import React from 'react';
import logo from '../styling/assets/shopping-cart.svg'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import axios from 'axios';

function Nav(props){

    if (props.isLoggedIn()){
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-dark" id="nav">
                    <ul className="navbar-nav mr-auto" id="nav">
                        <li className="nav-item active" id="nav">
                            <Link to="/" className="nav-link" id="nav-link">Home</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/MyAccount" className="nav-link" id="nav-link">My account</Link>
                        </li>
                    </ul>
                    <div>
                        <Link to="/Cart"><img src={logo} className="cart-img"/></Link>
                    </div>
            </nav>
        );
    }
    else {
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-dark" id="nav">
                <ul className="navbar-nav mr-auto" id="nav">
                    <li className="nav-item active" id="nav">
                        <Link to="/" className="nav-link" id="nav-link">Home</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/Login" className="nav-link" id="nav-link">Login</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/Register" className="nav-link" id="nav-link">Register</Link>
                    </li>
                </ul>
                <div>
                        <Link to="/Cart"><img src={logo} className="cart-img"/></Link>
                </div>
            </nav>
      );
    }


}

export default Nav;
