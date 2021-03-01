import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import axios from "axios";

function EditEmail(props){

    const [newEmail, setNewEmail] = useState("");
    const [oldEmail, setOldEmail] = useState("");
    const [confEmail, setConfEmail] = useState("");
    const [errorText, setErrorText] = useState("");
    const [failedChange, setFailedChange] = useState(false);
    const [redirectState, setRedirect] = useState(false);

    function onFormSubmit(e){
        e.preventDefault();

        if (oldEmail === props.emailAddress){
            if (newEmail === confEmail){
                    axios
                    .put("http://localhost:5000/users/update", {
                        emailAdd: newEmail,
                        userName: props.userName
                    })
                    .then(
                        (response) => {
                        console.log(response);
                        setRedirect(true);
                        setFailedChange(false);
                        props.logUserOut();
                        },
                        (error) => {
                        console.log(error);
                        setRedirect(false);
                        setFailedChange(true);
                        setErrorText(error.response.data);
                        }
                    );
            }
            else {
                setFailedChange(true);
                setErrorText("The Name's Do Not Match! Please Try Again.")
            }
        }
        else {
            setFailedChange(true);
            setErrorText("The old email address does not match our records. Please review and try again.")
        }

    }

    if (!props.isLoggedIn()) {
        return (<Redirect to='/Login' />);
     }

    return (
        <>
        {redirectState ? <Redirect to="/Login" /> : null}
        {failedChange ? (
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
                        <div class="card-header">Change The Email Address Associated With Your Account</div>
                        <div class="card-body">
                            <form onSubmit={onFormSubmit}>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Please Enter Your Old Email address</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => setOldEmail(e.target.value)}/>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail2">Please Enter Your New Email Address</label>
                                    <input type="email" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => setNewEmail(e.target.value)}/>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail3">Please Confirm Your New Email Address</label>
                                    <input type="email" class="form-control" id="exampleInputEmail3" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => setConfEmail(e.target.value)}/>
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

export default EditEmail;
