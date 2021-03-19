import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import {Redirect} from "react-router-dom";
  import axios from "axios";

function AddCard(props){

    const [redirectState, setRedirect] = useState(false);
    const [number, setNumber] = useState(0);
    const [expirationDay, setExpirationDay] = useState(0);
    const [expirationMonth, setExpirationMonth] = useState(0);
    const [csv, setCSV] = useState(0);
    const [failedSubmit, setFailedSubmit] = useState(false);
    const [errorText, setErrorText] = useState("");

    function logOut(){
        props.logUserOut();
    }

    function onFormSubmit(e){
        
        e.preventDefault();
        
        var date = new Date().getFullYear();

        if (number <= 1000000000000000){
            setErrorText("Card Number Must Be 16 Digits Long");
            setFailedSubmit(true);
        }
        else if (number >= 9999999999999999){
            setErrorText("Card Number Cannot Be Longer Than 16 Digits");
            setFailedSubmit(true);
        }
        else if (expirationMonth < 1){
            setErrorText("Must Be a Valid Month (1 or greater)");
            setFailedSubmit(true);
        }
        else if (expirationMonth > 12) {
            setErrorText("Must Be a Valid Month (12 or less)");
            setFailedSubmit(true);
        }
        else if (expirationDay < date){
            setErrorText("Must be a valid year");
            setFailedSubmit(true);
        }
        else if (csv < 100){
            setErrorText("CSV must be three digits long");
            setFailedSubmit(true);
        }
        else if (csv > 999){
            setErrorText("CSV must be three digits long");
            setFailedSubmit(true);
        }
        else {
                axios
                .put("http://localhost:5000/users/add/card", {
                    expirationDay: expirationDay,
                    cardNum: number,
                    expirationMonth: expirationMonth,
                    csv: csv,
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
    }


    if (!props.isLoggedIn()) {
        return (<Redirect to='/Login' />);
    }

    return(
        <>
        {redirectState ? <Redirect to="/Login" /> : null}
        {failedSubmit ? (
            <div class="container">
              <div class="alert alert-danger">{errorText}</div>
            </div>
          ) : null}
            <div class="container">
                <br/> <br/>
                <div class="row">
                    <div class="col-sm-0">
                    </div>
                    <div class="col-sm-12">
                        <div class="card text-white bg-secondary mb-3">
                            <div class="card-header">Add A New Payment Card To Your Account</div>
                            <div class="card-body">
                                <form onSubmit={onFormSubmit}>
                                    <div class="form-group">
                                        <label for="nameChange">Please Enter The Card Number</label>
                                        <input type="nameChange" class="form-control" id="nameChange" aria-describedby="nameChange" placeholder="No Formatting Just Plain Text i.e 1234567891011123" onChange={(e) => setNumber(e.target.value)}/>
                                    </div>
                                    <div class="form-group">
                                        <label for="nameChange">Please Enter The Month Of Expiration</label>
                                        <input type="nameChange" class="form-control" id="nameChange" aria-describedby="nameChange" placeholder="Any Number from 1-12" onChange={(e) => setExpirationMonth(e.target.value)}/>
                                        <br />
                                        <label for="nameChange">Please Enter The Year Of Expiration</label>
                                        <input type="nameChange" class="form-control" id="nameChange" aria-describedby="nameChange" placeholder="Any Number from 2021-xxxx" onChange={(e) => setExpirationDay(e.target.value)}/>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Please Enter Your CSV</label>
                                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" placeholder="Any Three Digit Number i.e 123" onChange={(e) => setCSV(e.target.value)} />
                                    </div>
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-0">
                    </div>
                </div>
            </div>
        </>
    )

}

export default AddCard;