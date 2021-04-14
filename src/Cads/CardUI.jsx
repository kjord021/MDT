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
  console.log(props);
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


            <p className="card-text text-secondary">
            Rating: {props.rating}
            </p>

            <p className="card-text text-secondary">
            Price: {props.price.$numberDecimal}
            </p>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link onClick={()=>props.setBookID(props.bookID)} to="/BookDetails" as="a" className="btn btn-primary">Book Details</Link>


              </div>



          </div>

    </>
  );
}

export default CardUI;
