import React from 'react';
import style from './card-style.css'

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

            <a href='http://localhost:3000/Cart' className = 'btn btn-primary'>Add to Cart</a>
            &nbsp;&nbsp;&nbsp;
            <a href='http://localhost:3000/bookDetails' className = 'btn btn-primary'>Book Details</a>

            </div>


          </div>
    </>
  );
}

export default CardUI;
