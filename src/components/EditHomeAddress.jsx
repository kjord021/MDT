import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import axios from "axios";

function EditHomeAddress(props){

    const [homeAddress, setHomeAddress] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [country, setCountry] = useState("");
    const [errorText, setErrorText] = useState("");
    const [failedChange, setFailedChange] = useState(false);
    const [redirectState, setRedirect] = useState(false);

    function onFormSubmit(e){
        e.preventDefault();

        if (homeAddress != null){
                axios
                .put("http://localhost:5000/users/update", {
                    homeAddress: homeAddress,
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
            setErrorText("The Input Is Not Valid! Please Ensure You Filled Out The Entire Form And Try Again.")
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
                        <div class="card-header">Change The Address Associated With Your Account</div>
                        <div class="card-body">
                            <form onSubmit={onFormSubmit}>
                                <div class="form-group">
                                    <label for="nameChange">Please Enter Your Address</label>
                                    <input type="nameChange" class="form-control" id="nameChange" aria-describedby="nameChange" placeholder="101 W Main St S APT 101 Boston, MA 02109 United States" onChange={(e) => setHomeAddress(e.target.value)}/>
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

export default EditHomeAddress;
