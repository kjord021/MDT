import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import {Redirect} from "react-router-dom";

function MyAccountShipping(props){

    function logOut(){
        props.logUserOut();
    }

    if (!props.isLoggedIn()) {
        return (<Redirect to='/Login' />);
    }

    return(
        <div class="container">
            <div class="row" id="myAccount"> 
                <div class="col-lg-3" id="accountList">
                    <ul class="list-group" id="accountListGroup">
                        <li class="list-group-item">
                            <a href="" id="accountListGroupItem" ><Link to="/MyAccount">Personal Information</Link></a>
                        </li>
                        <li class="list-group-item active" id="activeLGI">
                            <a href=""><Link to="/ShippingInformation">Shipping Information</Link></a>
                        </li>
                        <li class="list-group-item">
                            <a href=""><Link to="/PaymentInformation">Payment Information</Link></a>
                        </li>
                    </ul>
                </div>
                <div class="col-lg-6" id="middle">
                    <div class="jumbotron">
                            <h1 class="display-4">Shipping Information</h1>
                            <p class="lead">
                                Hello, {props.name}! You can edit your shipping information below.
                            </p>
                            <hr class="my-4" />
                            <label>Shipping Address: {props.homeAddress} </label><br/>
                            <p class="lead">
                                <a class="btn btn-primary btn-lg" href="#" role="button">Edit Shipping Information</a>
                            </p>
                    </div>    
                </div>
                <div class="col-lg-3">
                </div>                      
            </div>
            <div class="row" id="myAccount"> 
                <div class="col-lg-3">
                </div>
                <div class="col-lg-6" id="middle">
                    <a class="btn btn-primary btn-lg" onClick={logOut} href="#" role="button">Logout</a>
                </div>
                <div class="col-lg-3">
                </div>                      
            </div>
        </div>
    );
    }


export default MyAccountShipping;