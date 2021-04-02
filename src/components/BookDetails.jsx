import React, { useState, useEffect } from "react";
import BookInfo from "./subcomponents/BookInfo";
import CommentingRating from "./subcomponents/CommentingRating";
import ErrorPage from "./404";
import axios from "axios";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";

function BookDetails(props) {
  // Testing
  // const title = "Harry Potter and the Chamber of Secrets";
  //const url = "http://localhost:5000/books/book?title=" + title;

  // Routing from about author page
  const url = "http://localhost:5000/books/book/id?_id=" + props.bookID;

  const [book, setBook] = useState([]);
  const [is404, setIs404] = useState(false);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => setBook(response.data))
      .catch((error) => {
        if (error.response.status === 404) {
          setIs404(true);
        }
        console.log(error);
      });
  }, []);

  return (
    <div class="container" id="detailscontainer">
      {is404 ? <Redirect to="/404" /> : null}
      <BookInfo
        book={book}
        loggedIn={props.isLoggedIn()}
        userID={props.userID}
      />
      <CommentingRating book={book} login={props} />
    </div>
  );
}

export default withRouter(BookDetails);
