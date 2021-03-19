import React, { useState, useEffect } from "react";
import CardUI from "../Cads/CardUI";
import axios from "axios";

function Home(){
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
        />
      </div>
    )



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
