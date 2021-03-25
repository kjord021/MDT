import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

function AboutAuthor(props) {
  const [booklist, setBooklist] = useState([]);
  const url =
    "http://localhost:5000/books/book/author?author=" + props.location.author;
  const [is404, setIs404] = useState(false);
  useEffect(() => {
    axios
      .get(url)
      .then((response) => setBooklist(response.data))
      .catch((error) => {
        if (error.response.status === 404) {
          setIs404(true);
        }
        console.log(error);
      });
  }, []);

  return (
    <div class="row">
      {is404 ? <Redirect to="/404" /> : null}
      <div class="col-lg-3"></div>
      <div class="col-lg-6">
        <div class="card mb-3" style={{ marginTop: "4vh" }}>
          <div class="card-body">
            <h3 class="card-title" style={{ fontStyle: "italic" }}>
              About the author:{" "}
              <span style={{ fontWeight: "bold" }}>
                {props.location.author}
              </span>
            </h3>
            <hr />
            <p class="card-text">{props.location.bio}</p>
          </div>
        </div>
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">Browse books by this author:</h4>
            <hr />
            <div class="container">
              <div class="row">
                {booklist.map((book) => {
                  const { title, cover, genre, _id } = book;
                  return (
                    <div class="col-sm-6 col-lg-4">
                      <Link
                        to={{
                          pathname: "/bookDetails",
                          id: _id,
                        }}
                        style={{ textDecoration: "inherit", color: "inherit" }}
                      >
                        <div class="card mb-3">
                          <div class="row no-gutters">
                            <div class="col-sm-12">
                              <img
                                src={cover}
                                class="author-card-img"
                                alt="book cover"
                              />
                            </div>
                            <div class="row no-gutters">
                              <div class="col-sm-12">
                                <div class="card-body">
                                  <h5 class="card-title">{title}</h5>
                                  <hr />
                                  <h6 class="card-text">
                                    Price: ${book.price?.$numberDecimal}
                                  </h6>
                                  <h6 class="card-text">Genre: {genre}</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3"></div>
    </div>
  );
}

export default withRouter(AboutAuthor);
