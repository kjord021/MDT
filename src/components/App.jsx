import '../styling/App.css';
import React, {useState, useEffect} from 'react';
import Home from './Home';
import Login from './Login';
import Register from './Register';
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

  return (
    <Router>
      <div className="App">
        <nav class="navbar navbar-expand-lg navbar-light bg-dark" id="nav">
          <ul class="navbar-nav mr-auto" id="nav">
            <li class="nav-item active" id="nav">
              <a class="nav-link" id="nav"><Link to="/">Home</Link></a>
            </li>
            <li class="nav-item active">
            <a class="nav-link"><Link to="/Login">Login</Link></a>
            </li>
            <li class="nav-item active">
            <a class="nav-link"><Link to="/Register">Register</Link></a>
            </li>
          </ul>
        </nav>
        <p>{apiResponse}</p>
        <Switch>
          <Route path ="/Login">
            <Login />
          </Route>
          <Route path ="/Register">
            <Register />
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
