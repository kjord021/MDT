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
            <nav class="navbar navbar-expand-lg navbar-light bg-dark" id="nav">
                    <ul class="navbar-nav mr-auto" id="nav">
                        <li class="nav-item active" id="nav">
                            <a class="nav-link" id="nav"><Link to="/">Home</Link></a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link"><Link to="/MyAccount">My account</Link></a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link"><Link to="/Search">Book Search</Link></a>
                        </li>
                    </ul>
                    <div>
                        <Link to="/Cart"><img src={logo} class="cart-img"/></Link>
                    </div>
            </nav>
        );
    }
    else {
        return(
            <nav class="navbar navbar-expand-lg navbar-light bg-dark" id="nav">
                <ul class="navbar-nav mr-auto" id="nav">
                    <li class="nav-item active" id="nav">
                        <a class="nav-link" id="nav"><Link to="/">Home</Link></a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link"><Link to="/Login">Login</Link></a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link"><Link to="/Register">Register</Link></a>
                    </li>
                </ul>
                <div>
                        <Link to="/Cart"><img src={logo} class="cart-img"/></Link>
                </div>
            </nav>
      );
    }


}

export default Nav;
