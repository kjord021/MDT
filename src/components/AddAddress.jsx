import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import {Redirect} from "react-router-dom";
  import axios from "axios";

function AddAddress(props){

    const [redirectState, setRedirect] = useState(false);
    const [address, setAddress] = useState("");

    function logOut(){
        props.logUserOut();
    }

    function onFormSubmit(e){
        e.preventDefault();

        axios
        .put("http://localhost:5000/users/add/address", {
            address: address,
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

    if (!props.isLoggedIn()) {
        return (<Redirect to='/Login' />);
     }

    return(
        <>
        {redirectState ? <Redirect to="/Login" /> : null}
            <div class="container">
                <br/> <br/>
                <div class="row">
                    <div class="col-sm-0">
                    </div>
                    <div class="col-sm-12">
                        <div class="card text-white bg-secondary mb-3">
                            <div class="card-header">Add A New Shipping Address To Your Account</div>
                            <div class="card-body">
                                <form onSubmit={onFormSubmit}>
                                    <div class="form-group">
                                        <label for="nameChange">Please Enter The Address</label>
                                        <input type="nameChange" class="form-control" id="nameChange" aria-describedby="nameChange" placeholder="101 W Main St S APT 101 Boston, MA 02109 United States" onChange={(e) => setAddress(e.target.value)}/>
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

export default AddAddress;