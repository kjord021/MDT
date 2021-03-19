import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";

function MyAccountPayment(props) {

    const [redirectState, setRedirect] = useState(false);

    function logOut() {
        props.logUserOut();
    }

    function onFormSubmit(e) {

        e.preventDefault();

        axios
            .put("http://localhost:5000/users/delete/card", {
                number: props.creditCards[0].number,
                userName: props.userName
            })
            .then(
                (response) => {
                    console.log(response);
                    logOut();
                    setRedirect(true);

                },
                (error) => {
                    console.log(error);
                }
            );
    }

    function onFormSubmit1(e) {

        e.preventDefault();

        axios
            .put("http://localhost:5000/users/delete/card", {
                number: props.creditCards[1].number,
                userName: props.userName
            })
            .then(
                (response) => {
                    console.log(response);
                    logOut();
                    setRedirect(true);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    function onFormSubmit2(e) {

        e.preventDefault();

        axios
            .put("http://localhost:5000/users/delete/card", {
                number: props.creditCards[2].number,
                userName: props.userName
            })
            .then(
                (response) => {
                    console.log(response);
                    logOut();
                    setRedirect(true);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    function onFormSubmit3(e) {

        e.preventDefault();

        axios
            .put("http://localhost:5000/users/delete/card", {
                number: props.creditCards[3].number,
                userName: props.userName
            })
            .then(
                (response) => {
                    console.log(response);
                    logOut();
                    setRedirect(true);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    function onFormSubmit4(e) {

        e.preventDefault();

        axios
            .put("http://localhost:5000/users/delete/card", {
                number: props.creditCards[4].number,
                userName: props.userName
            })
            .then(
                (response) => {
                    console.log(response);
                    logOut();
                    setRedirect(true);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    function displayList() {
        if (props.creditCards.length === 5) {
            return (
                <>
                    <ul class="list-group" id="accountListGroup">
                        <li class="list-group-item" id="">
                            <div class="row">
                                <div class="col-sm-7">
                                    <label>Card Number 1: {props.creditCards[0].number} </label> &nbsp;
                                    <label>Expiration: {props.creditCards[0].expirationMonth}/{props.creditCards[0].expirationDay} </label> &nbsp;
                                </div>
                                <div class="col-sm-0">
                                </div>
                                <div class="col-sm-5">
                                    <form onSubmit={onFormSubmit}>
                                        <button id='1' type="submit" class="btn btn-danger">Delete</button>
                                    </form>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item" id="">
                            <div class="row">
                                <div class="col-sm-7">
                                    <label>Card Number 2: {props.creditCards[1].number}  </label> &nbsp;
                                    <label>Expiration: {props.creditCards[1].expirationMonth}/{props.creditCards[1].expirationDay} </label> &nbsp;
                                </div>
                                <div class="col-sm-0">
                                </div>
                                <div class="col-sm-5">
                                    <form onSubmit={onFormSubmit1}>
                                        <button id='2' type="submit" class="btn btn-danger">Delete</button>
                                    </form>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item" id="">
                            <div class="row">
                                <div class="col-sm-7">
                                    <label>Card Number 3: {props.creditCards[2].number}  </label> &nbsp;
                                    <label>Expiration: {props.creditCards[2].expirationMonth}/{props.creditCards[2].expirationDay} </label> &nbsp;
                                </div>
                                <div class="col-sm-0">
                                </div>
                                <div class="col-sm-5">
                                    <form onSubmit={onFormSubmit2}>
                                        <button id='2' type="submit" class="btn btn-danger">Delete</button>
                                    </form>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item" id="">
                            <div class="row">
                                <div class="col-sm-7">
                                    <label>Card Number 4: {props.creditCards[3].number}  </label> &nbsp;
                                    <label>Expiration: {props.creditCards[3].expirationMonth}/{props.creditCards[3].expirationDay} </label> &nbsp;
                                </div>
                                <div class="col-sm-0">
                                </div>
                                <div class="col-sm-5">
                                    <form onSubmit={onFormSubmit3}>
                                        <button id='2' type="submit" class="btn btn-danger">Delete</button>
                                    </form>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item" id="">
                            <div class="row">
                                <div class="col-sm-7">
                                    <label>Card Number 5: {props.creditCards[4].number}  </label> &nbsp;
                                    <label>Expiration: {props.creditCards[4].expirationMonth}/{props.creditCards[4].expirationDay} </label> &nbsp;
                                </div>
                                <div class="col-sm-0">
                                </div>
                                <div class="col-sm-5">
                                    <form onSubmit={onFormSubmit4}>
                                        <button id='2' type="submit" class="btn btn-danger">Delete</button>
                                    </form>
                                </div>
                            </div>
                        </li>
                    </ul>
                </>
            )
        }
        else if (props.creditCards.length == 4) {
            return (
                <>
                    <ul class="list-group" id="accountListGroup">
                        <li class="list-group-item" id="">
                            <div class="row">
                                <div class="col-sm-7">
                                    <label>Card Number 1: {props.creditCards[0].number} </label> &nbsp;
                                    <label>Expiration: {props.creditCards[0].expirationMonth}/{props.creditCards[0].expirationDay} </label> &nbsp;
                                </div>
                                <div class="col-sm-0">
                                </div>
                                <div class="col-sm-5">
                                    <form onSubmit={onFormSubmit}>
                                        <button id='1' type="submit" class="btn btn-danger">Delete</button>
                                    </form>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item" id="">
                            <div class="row">
                                <div class="col-sm-7">
                                    <label>Card Number 2: {props.creditCards[1].number}  </label> &nbsp;
                                    <label>Expiration: {props.creditCards[1].expirationMonth}/{props.creditCards[1].expirationDay} </label> &nbsp;
                                </div>
                                <div class="col-sm-0">
                                </div>
                                <div class="col-sm-5">
                                    <form onSubmit={onFormSubmit1}>
                                        <button id='2' type="submit" class="btn btn-danger">Delete</button>
                                    </form>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item" id="">
                            <div class="row">
                                <div class="col-sm-7">
                                    <label>Card Number 3: {props.creditCards[2].number}  </label> &nbsp;
                                    <label>Expiration: {props.creditCards[2].expirationMonth}/{props.creditCards[2].expirationDay} </label> &nbsp;
                                </div>
                                <div class="col-sm-0">
                                </div>
                                <div class="col-sm-5">
                                    <form onSubmit={onFormSubmit2}>
                                        <button id='2' type="submit" class="btn btn-danger">Delete</button>
                                    </form>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item" id="">
                            <div class="row">
                                <div class="col-sm-7">
                                    <label>Card Number 4: {props.creditCards[3].number}  </label> &nbsp;
                                    <label>Expiration: {props.creditCards[3].expirationMonth}/{props.creditCards[3].expirationDay} </label> &nbsp;
                                </div>
                                <div class="col-sm-0">
                                </div>
                                <div class="col-sm-5">
                                    <form onSubmit={onFormSubmit3}>
                                        <button id='2' type="submit" class="btn btn-danger">Delete</button>
                                    </form>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <br />
                    <a class="btn btn-primary btn-lg" href="#" role="button"><Link to="/AddCard">Add New Card +</Link></a>
                </>
            )
        }
        else if (props.creditCards.length == 3) {
            return (
                <>
                    <ul class="list-group" id="accountListGroup">
                        <li class="list-group-item" id="">
                            <div class="row">
                                <div class="col-sm-7">
                                    <label>Card Number 1: {props.creditCards[0].number} </label> &nbsp;
                                    <label>Expiration: {props.creditCards[0].expirationMonth}/{props.creditCards[0].expirationDay} </label> &nbsp;
                            </div>
                                <div class="col-sm-0">
                                </div>
                                <div class="col-sm-5">
                                    <form onSubmit={onFormSubmit}>
                                        <button id='1' type="submit" class="btn btn-danger">Delete</button>
                                    </form>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item" id="">
                            <div class="row">
                                <div class="col-sm-7">
                                    <label>Card Number 2: {props.creditCards[1].number}  </label> &nbsp;
                                    <label>Expiration: {props.creditCards[1].expirationMonth}/{props.creditCards[1].expirationDay} </label> &nbsp;
                            </div>
                                <div class="col-sm-0">
                                </div>
                                <div class="col-sm-5">
                                    <form onSubmit={onFormSubmit1}>
                                        <button id='2' type="submit" class="btn btn-danger">Delete</button>
                                    </form>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item" id="">
                            <div class="row">
                                <div class="col-sm-7">
                                    <label>Card Number 3: {props.creditCards[2].number}  </label> &nbsp;
                                    <label>Expiration: {props.creditCards[2].expirationMonth}/{props.creditCards[2].expirationDay} </label> &nbsp;
                            </div>
                                <div class="col-sm-0">
                                </div>
                                <div class="col-sm-5">
                                    <form onSubmit={onFormSubmit2}>
                                        <button id='2' type="submit" class="btn btn-danger">Delete</button>
                                    </form>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <br />
                    <a class="btn btn-primary btn-lg" href="#" role="button"><Link to="/AddCard">Add New Card +</Link></a>
                </>
            )
        }
        else if (props.creditCards.length == 2) {
            return (
                <>
                    <ul class="list-group" id="accountListGroup">
                        <li class="list-group-item" id="">
                            <div class="row">
                                <div class="col-sm-7">
                                    <label>Card Number 1: {props.creditCards[0].number} </label> &nbsp;
                                    <label>Expiration: {props.creditCards[0].expirationMonth}/{props.creditCards[0].expirationDay} </label> &nbsp;
                                </div>
                                <div class="col-sm-0">
                                </div>
                                <div class="col-sm-5">
                                    <form onSubmit={onFormSubmit}>
                                        <button id='1' type="submit" class="btn btn-danger">Delete</button>
                                    </form>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item" id="">
                            <div class="row">
                                <div class="col-sm-7">
                                    <label>Card Number 2: {props.creditCards[1].number}  </label> &nbsp;
                                    <label>Expiration: {props.creditCards[1].expirationMonth}/{props.creditCards[1].expirationDay} </label> &nbsp;
                                </div>
                                <div class="col-sm-0">
                                </div>
                                <div class="col-sm-5">
                                    <form onSubmit={onFormSubmit1}>
                                        <button id='2' type="submit" class="btn btn-danger">Delete</button>
                                    </form>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <br />
                    <a class="btn btn-primary btn-lg" href="#" role="button"><Link to="/AddCard">Add New Card +</Link></a>
                </>
            )

        }
        else if (props.creditCards.length == 1) {
            return (
                <>
                    <ul class="list-group" id="accountListGroup">
                        <li class="list-group-item" id="">
                            <div class="row">
                                <div class="col-sm-7">
                                    <label>Card Number: {props.creditCards[0].number} </label> &nbsp;
                                    <label>Expiration: {props.creditCards[0].expirationMonth}/{props.creditCards[0].expirationDay} </label> &nbsp;
                                </div>
                                <div class="col-sm-0">
                                </div>
                                <div class="col-sm-5">
                                    <form onSubmit={onFormSubmit}>
                                        <button id='1' type="submit" class="btn btn-danger">Delete</button>
                                    </form>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <br />
                    <a class="btn btn-primary btn-lg" href="#" role="button"><Link to="/AddCard">Add New Card +</Link></a>
                </>

            )
        }
        else {
            return (
                <>
                    <br />
                    <a class="btn btn-primary btn-lg" href="#" role="button"><Link to="/AddCard">Add New Card +</Link></a>
                </>
            )
        }
    }

    if (!props.isLoggedIn()) {
        return (<Redirect to='/Login' />);
    }

    return (
        <>
            {redirectState ? <Redirect to="/Login" /> : null}
            <div class="container">
                <div class="row" id="myAccount">
                    <div class="col-lg-3" id="accountList">
                        <ul class="list-group" id="accountListGroup">
                            <li class="list-group-item">
                                <a href="" id="accountListGroupItem" ><Link to="/MyAccount">Personal Information</Link></a>
                            </li>
                            <li class="list-group-item " id="activeLGI">
                                <a href=""><Link to="/ShippingInformation">Shipping Information</Link></a>
                            </li>
                            <li class="list-group-item active">
                                <a href=""><Link to="/PaymentInformation">Payment Information</Link></a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-lg-6" id="middle">
                        <div class="jumbotron">
                            <h1 class="display-4">Payment Information</h1>
                            <p class="lead">
                                Hello, {props.name}! You can edit your payment information below.
                            </p>
                            <hr class="my-4" />
                            {displayList()}
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
        </>
    );
}


export default MyAccountPayment;