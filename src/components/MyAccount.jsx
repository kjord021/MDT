import { PromiseProvider } from 'mongoose';
import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import {Redirect} from "react-router-dom";
import EditPersonalInfo from "./EditName"

function MyAccount(props){

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
                        <li class="list-group-item active" id="activeLGI">
                            <a href="" id="accountListGroupItem" ><Link to="/MyAccount">Personal Information</Link></a>
                        </li>
                        <li class="list-group-item">
                            <a href=""><Link to="/ShippingInformation">Shipping Information</Link></a>
                        </li>
                        <li class="list-group-item">
                            <a href=""><Link to="/PaymentInformation">Payment Information</Link></a>
                        </li>
                    </ul>
                </div>
                <div class="col-lg-6" id="middle">
                    
                    <div class="jumbotron">
                        <h1 class="display-4">Personal Information</h1>
                        <p class="lead">
                            Hello, {props.name}! You can edit your personal information below.
                        </p>
                        <hr class="my-4" />
                        <ul class="list-group" id="accountListGroup">
                            <li class="list-group-item" id="">
                                <div class="row">
                                    <div class="col-sm-7">
                                        <label>Name: {props.name} </label> &nbsp;
                                    </div>
                                    <div class="col-sm-0">
                                    </div>
                                    <div class="col-sm-5">
                                        <a class="btn btn-primary btn-sm" href="#" role="button">
                                            <Link to="/EditName">&#9998;</Link>
                                        </a><br/><br/>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item" id="">
                                <div class="row">
                                    <div class="col-sm-7">
                                        <label>Username: {props.userName} </label> &nbsp;
                                    </div>
                                    <div class="col-sm-0">
                                    </div>
                                    <div class="col-sm-5">
                                        <a class="btn btn-primary btn-sm" href="#" role="button">
                                            <Link to="/EditUsername">&#9998;</Link>
                                        </a><br/><br/>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item" id="">
                                <div class="row">
                                    <div class="col-sm-7">
                                        <label>Home Address: {props.homeAddress} </label> &nbsp;
                                    </div>
                                    <div class="col-sm-0">
                                    </div>
                                    <div class="col-sm-5">
                                        <a class="btn btn-primary btn-sm" href="#" role="button">
                                            <Link to="/EditHomeAddress">&#9998;</Link>
                                        </a><br/><br/>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <div class="row">
                                    <div class="col-sm-7">
                                        <label>Nickname: {props.nickName} </label> &nbsp;
                                    </div>
                                    <div class="col-sm-0">
                                    </div>
                                    <div class="col-sm-5">
                                        <a class="btn btn-primary btn-sm" href="#" role="button">
                                            <Link to="/EditNick">&#9998;</Link>
                                        </a><br/><br/>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <div class="row">
                                    <div class="col-sm-7">
                                        <label>Email Address: {props.emailAddress} </label> &nbsp;
                                    </div>
                                    <div class="col-sm-0">
                                    </div>
                                    <div class="col-sm-5">
                                        <a class="btn btn-primary btn-sm" href="#" role="button">
                                            <Link to="/EditEmail">&#9998;</Link>
                                        </a><br/><br/>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <div class="row">
                                    <div class="col-sm-7">
                                        <label>Change Your Password (for the safety of your account we do not display this information)</label> &nbsp;
                                    </div>
                                    <div class="col-sm-0">
                                    </div>
                                    <div class="col-sm-5">
                                        <a class="btn btn-primary btn-sm" href="#" role="button">
                                            <Link to="/EditPassword">&#9998;</Link>
                                        </a><br/><br/>
                                    </div>
                                </div>
                            </li>
                        </ul>
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


export default MyAccount;