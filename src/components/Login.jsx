import React, {useState, useEffect} from "react";
import {Redirect} from "react-router-dom";
import axios from 'axios';

function Login(props){

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [redirectState, setRedirect] = useState(false);
    const [failedLogin, setFailedLogin] = useState(false);
    
    function onFormSubmit(e){

        const config = {
            headers: {
             'Content-Type': 'application/x-www-form-urlencoded'   
            }
        }

        const params = {
            userName: userName,
            params: {
                userName: userName
            }
        }

        e.preventDefault();
        axios.post('http://localhost:5000/users/login', {
            userName: userName,
            password: password
        })
        .then((response) => {
            console.log(response);
            setRedirect(true);
            props.setLoggedIn(true);
            setFailedLogin(false);

            axios.get('http://localhost:5000/users/user/', params, config)
            .then((response) => {
                var data = response.data;
                props.getUserInformation(JSON.stringify(data));
            }
            , (error) => {
                console.log(error);
            }
            );

        }, (error) => {
            console.log(error);
            setRedirect(false);
            props.setLoggedIn(false);
            setFailedLogin(true);
        });

        
    }

    

    return (
        <>
            {redirectState ? <Redirect to="/dashboard" /> : null}
            {failedLogin ? <div class="container">
                                <div class = "alert alert-danger">
                                    LOGIN FAILED
                                </div>
                            </div> : null}
            <div id="background-login">
                <div class="container">
                    <center class="card-center">
                        <div class="row" > 
                            <div class="col-lg-3">
                            </div>
                            <div class="col-lg-3" id="middle">
                                
                                <div class="card bg-secondary text-white">
                                    <div class="card-header">
                                        <p>
                                        <h1 class="Welcome-text">Welcome Back!</h1>
                                        Please enter your credentials to log into BookViewer-9000.
                                        </p>
                                    </div>
                                    <div class="card-body">
                                        <form onSubmit={onFormSubmit}>
                                            <div class = "form-group">
                                                <label for="formControlUserName">Username</label>
                                                <input type="userName" class="form-control" id="formControlUserName" placeholder="Username" name="userName" onChange={e => setUserName(e.target.value)}/>
                                            </div>
                                            <div class = "form-group">
                                                <label for="FormControlPassword">Password</label>
                                                <input type="password" class="form-control" id="FormControlPassword" placeholder="******" name="password" onChange={e => setPassword(e.target.value)}/>
                                            </div>
                                            <div class = "form-group">
                                                <center>
                                                    <button type="submit" class="btn btn-dark">Login</button>
                                                </center>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3">
                            </div>                      
                        </div>
                    </center>
                </div>
            </div>
        </>
    );
}

export default Login;