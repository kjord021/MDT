import React, { useState, useEffect } from "react";
import BookInfo from "./subcomponents/BookInfo";
import CommentingRating from "./subcomponents/CommentingRating";
import ErrorPage from "./404";
import axios from "axios";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";

// Placeholder book object

/*
const book = {
  author: "J.K. Rowling",
  authorBio:
    "Joanne Rowling CH, OBE, HonFRSE, FRCPE, FRSL, better known by her pen name J. K. Rowling, is a British author and philanthropist. She is best known for writing the Harry Potter fantasy series.",
  cover:
    "https://images-na.ssl-images-amazon.com/images/I/51jyI6lYi1L._SX342_BO1,204,203,200_.jpg",
  genre: "Fiction",
  price: "$10.49",
  title: "Harry Potter and the Deathly Hallows",
  date: "July 1, 2009",
  desc:
    "The heart of Book 7 is a hero's mission--not just in Harry's quest for the Horcruxes, but in his journey from boy to man--and Harry faces more danger than that found in all six books combined, from the direct threat of the Death Eaters and you-know-who, to the subtle perils of losing faith in himself. ",
  publisher: "Arthur A. Levine Books",
};
*/

function BookDetails(props) {
  // Testing
  // const title = "Harry Potter and the Chamber of Secrets";
  // const url = "http://localhost:5000/books/book?title=" + title;

  // Routing from about author page
  const url = "http://localhost:5000/books/book/id?_id=" + props.location.id;

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
      <BookInfo book={book} />
      <CommentingRating book={book} />
    </div>
  );
}

export default withRouter(BookDetails);
