import React from 'react';
import style from './card-style.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

function CardUI(props) {
  return(
    <>
          <div className="card text-center">
            <div className="overflow">
            <img src = {props.imgsrc} alt="Title1 here" className="card-img-top" />
            </div>
            <div className="card-body text-dark">
            <h4 className="card-title">{props.title}</h4>
            <p className="card-text text-secondary">
            {props.description}
            </p>
            <Link onClick={()=>props.setBookID(props.bookID)} to="/BookDetails" as="a" class="btn btn-primary">Book Details</Link>
            &nbsp;&nbsp;&nbsp;
            <Link to="/Cart" as="a" class="btn btn-primary">Cart</Link>


              </div>



          </div>

    </>
  );
}

export default CardUI;
