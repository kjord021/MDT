import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import axios from "axios";

function EditPassword(props){

    const [password, setPassword] = useState("");
    const [confPass, setConfPass] = useState("");
    const [oldPass, setOldPass] = useState("");
    const [errorText, setErrorText] = useState("");
    const [failedChange, setFailedChange] = useState(false);
    const [redirectState, setRedirect] = useState(false);

    function onFormSubmit(e){
        e.preventDefault();

        if (oldPass === props.password){
            if (password.length > 5){
                if (password === confPass){
                        axios
                        .put("http://localhost:5000/users/update", {
                            password: password,
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
                    setErrorText("The Passwords Do Not Match! Please Try Again.")
                }
            }
            else {
                setFailedChange(true);
                setErrorText("The length must be greater than 1.")
            }
        }
        else {
            setFailedChange(true);
            setErrorText("The old password does not match our records. Please review and try again.") 
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
                        <div class="card-header">Change The Password Associated With Your Account</div>
                        <div class="card-body">
                            <form onSubmit={onFormSubmit}>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Please Enter Your Old Password</label>
                                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" placeholder="Password" onChange={(e) => setOldPass(e.target.value)} />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword2">Please Enter Your New Password</label>
                                    <input type="password" class="form-control" id="exampleInputPassword2" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword3">Please Confirm Your New Password</label>
                                    <input type="password" class="form-control" id="exampleInputPassword3" placeholder="Password" onChange={(e) => setConfPass(e.target.value)} />
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

export default EditPassword;
