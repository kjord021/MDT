import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import axios from "axios";

function EditUsername(props){

    const [newUsername, setNewUsername] = useState("");
    const [oldUsername, setOldUsername] = useState("");
    const [confUsername, setConfUsername] = useState("");
    const [errorText, setErrorText] = useState("");
    const [failedChange, setFailedChange] = useState(false);
    const [redirectState, setRedirect] = useState(false);

    function onFormSubmit(e){
        e.preventDefault();

        if (oldUsername === props.userName){
            if (newUsername === confUsername){
                    axios
                    .put("http://localhost:5000/users/update", {
                        userName: props.userName,
                        newUserName: newUsername
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
            setErrorText("The old Username does not match our records. Please review and try again.")
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
                        <div class="card-header">Change The Username Associated With Your Account</div>
                        <div class="card-body">
                            <form onSubmit={onFormSubmit}>
                                <div class="form-group">
                                    <label for="nameChange">Please Enter Your Old Username</label>
                                    <input type="nameChange" class="form-control" id="nameChange" aria-describedby="nameChange" placeholder="Enter New Name" onChange={(e) => setOldUsername(e.target.value)}/>
                                </div>
                                <div class="form-group">
                                    <label for="nameChangeConf">Please Enter Your New Username</label>
                                    <input type="nameChangeConf" class="form-control" id="nameChangeConf" aria-describedby="nameChangeConf" placeholder="Confirm New Name" onChange={(e) => setNewUsername(e.target.value)}/>
                                </div>
                                <div class="form-group">
                                    <label for="nameChangeConf">Please Confirm Your New Username</label>
                                    <input type="nameChangeConf" class="form-control" id="nameChangeConf" aria-describedby="nameChangeConf" placeholder="Confirm New Name" onChange={(e) => setConfUsername(e.target.value)}/>
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

export default EditUsername;
