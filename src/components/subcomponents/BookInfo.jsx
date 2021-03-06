import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function BookInfo(props) {
  const [enlarge, setEnlarge] = useState(false);
  return (
    <div class="row">
      <div class="col-lg-1"></div>
      <div class="col-lg-10">
        <div class="card mb-3">
          <div class="row no-gutters">
            <div class="col-lg-4">
              <img
                src={props.book.cover}
                class="card-img"
                alt="book cover"
                onClick={() => setEnlarge(true)}
              />
            </div>
            <div class="col-lg-8">
              <div class="card-body">
                <h2 class="card-title">{props.book.title}</h2>
                <h5 id="bookauthor" class="card-title">
                  By {props.book.author}
                </h5>
                <p class="card-text">{props.book.description}</p>
                <p id="bookdetails" class="card-text">
                  <span style={{ paddingRight: "71px", fontWeight: "500" }}>
                    PUBLISHER
                  </span>
                  {props.book.publisher}
                </p>
                <p id="bookdetails" class="card-text">
                  <span style={{ paddingRight: "40px", fontWeight: "500" }}>
                    PUBLISHED ON
                  </span>
                  {props.book.date?.substring(0, 10)}
                </p>
                <p id="bookdetails" class="card-text">
                  <span style={{ paddingRight: "102px", fontWeight: "500" }}>
                    GENRE
                  </span>
                  {props.book.genre}
                </p>
                <hr />
                <p id="bookdetails" class="card-text">
                  <span style={{ paddingRight: "110px", fontWeight: "500" }}>
                    PRICE
                  </span>
                  ${props.book.price?.$numberDecimal}
                </p>
                <button id="submitbutton" type="submit" class="btn btn-success">
                  Add to cart
                </button>
                <Link
                  to={{
                    pathname: "/Author",
                    bio: props.book.authorBio,
                    author: props.book.author,
                  }}
                >
                  <button id="detailbutton" type="submit" class="btn btn-info">
                    About Author
                  </button>
                </Link>
                <button id="detailbutton" type="submit" class="btn btn-dark">
                  Back to results
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-1"></div>
      {enlarge && <LargeCover img={props.book.cover} setEnlarge={setEnlarge} />}
    </div>
  );
}

const LargeCover = ({ img, setEnlarge }) => {
  return (
    <div class="enlarge-img-overlay row">
      <div class="col-lg-1"></div>
      <div class="col-lg-10">
        <img
          onClick={() => setEnlarge(false)}
          src={img}
          class="enlarge-img"
          alt="book cover"
        />
      </div>
      <div class="col-lg-1"></div>
    </div>
  );
};

export default BookInfo;
