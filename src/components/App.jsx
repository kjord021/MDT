import '../styling/App.css';
import React, {useState, useEffect} from 'react';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Nav from './Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';

function App() {

  //Here we are creating a state apiResponse, and a method setAPI to change the value of that state
  const [apiResponse, setAPI] = useState('temp');
  const [loginState, setLoginState] = useState(false);

  //Call the useEffect hook
  useEffect(() =>{
    //Create an axios request to our api at /testAPI route
    axios({
      "method": "GET",
      "url": "http://localhost:5000/testAPI"
    })
    //set apiResponse to the retrieved data
    .then((response) => {
      setAPI(response.data)
    })
    //log any errors if they apply
    .catch((error) => {
      console.log(error)
    })
  });

  function setLoggedIn(status){
    setLoginState(status);
  }

  function isLoggedIn(){
    
    return loginState;

  }

  return (
    <Router>
      <div className="App">
        <Nav isLoggedIn={isLoggedIn} /> 
        <p>{apiResponse}</p>
        <Switch>
          <Route path ="/Login">
            <Login setLoggedIn={setLoggedIn} />
          </Route>
          <Route path ="/Register">
            <Register />
          </Route>
          <Route path ="/Dashboard">
            <Home />
          </Route>
          <Route path ="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}




export default App;
