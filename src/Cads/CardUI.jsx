import React from 'react';
import "./card-style.css";

function Card(props) {
  return(
    <div className="book card text-center">
      <div className="overflow">
       <img src = {props.imgsrc} alt="Title1 here" className="card-img=bottom"/>
      </div>
      <div className="card-body.text-dark">
       <h4 className="card-title">{props.title}</h4>
       <p className="card-text text-secondary">
       WordWordsWordsWords WordWordsWordsWords WordWordsWordsWords
       WordWordsWordsWords WordWordsWordsWords
       </p>
       <a href='#' className = 'btn btn-outline-success'>Add to Cart</a>
      </div>
    </div>
  );
}

export default Card;
