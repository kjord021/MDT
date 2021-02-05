import '../styling/App.css';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
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
