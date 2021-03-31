import React, { useState, useEffect } from "react";
import CardUI from "../Cads/CardUI";
import axios from "axios";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

function Home(props){
    const [books, setBooks] = useState([]);
        axios
          .get("http://localhost:5000/books/", {
          })
          .then(
          (response) => {

            setBooks(response.data);

          },

          (error) => {
            console.log(error);
          }
        );

    var cards = books.map((book) =>
      <div class = "col-sm-6">

        <CardUI
        title = {book.title}
        imgsrc = {book.cover}
        description = {book.description}
        setBookID = {props.setBookID}
        bookID = {book._id}
        />
      </div>
    )

/*
    books.filter((book) => {
    if (book.date > 5) //etc etc
});
books.sort((book1, book2) => {
    if (book1.date > book2.date) {
return true;
...
}
*/


return (
  <>
  <div class="container">
      <br/>
      <div class = "row">
        <div class = "col-sm-4">
        </div>
        <div class = "col-sm-4">
        <input />
        </div>
        <div class = "col-sm-4">
        </div>
      </div>
      <br />
      <div class = "row">
          {cards}
      </div>
   </div>
  </>
);

}


export default Home;
