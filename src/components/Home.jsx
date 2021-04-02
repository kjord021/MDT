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
    const [request, setRequested] = useState(false);
    const [dBooks, setDBooks] = useState([]);
    const [selectedOption, setSelectedOption] = useState("Author");
    if(!request){
      setRequested(true);
        axios
          .get("http://localhost:5000/books/", {
          })
          .then(
          (response) => {

            setBooks(response.data);
            setDBooks(response.data);


          },

          (error) => {
            console.log(error);
          }
        );
      }



  var onValueChange = function onValueChange(event){
    setSelectedOption(event.target.value);
  }

  var formSubmit = function formSubmit(event) {
    event.preventDefault();
    if(selectedOption === "Title"){

      setDBooks([].concat(books).sort( (a,b)=>{
        return a.title.localeCompare(b.title);

      }));

    }
    if(selectedOption === "Author"){

      setDBooks([].concat(books).sort( (a,b)=>{
        return a.author.localeCompare(b.author);

      }));

    }
    if(selectedOption === "Genre"){

      setDBooks([].concat(books).sort( (a,b)=>{
        return a.genre.localeCompare(b.genre);

      }));

    }
    if(selectedOption === "Price"){

      setDBooks([].concat(books).sort( (a,b)=>{
        return b.price.$numberDecimal.localeCompare(a.price.$numberDecimal);

      }));



    }
    if(selectedOption === "Book Rating"){

      setDBooks([].concat(books).sort( (a,b)=>{
        return b.rating - a.rating;

      }));



    }
    /*
    tempBooks.filter((book) => {
   if (book.date > 5)
});
var books.sort((book1, book2) => {
   if (book1.date > book2.date) {
return true;
...
}
*/
  }


return (
  <>
  <form onSubmit={formSubmit}>
      <div className="radio">
    <label>
      <input
        type="radio"
        value="Title"
        checked={selectedOption === "Title"}
        onChange={onValueChange}
      />
      Title
    </label>
  </div>

        <div className="radio">
          <label>
            <input
              type="radio"
              value="Author"
              checked={selectedOption === "Author"}
              onChange={onValueChange}
            />
            Author
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Genre"
              checked={selectedOption === "Genre"}
              onChange={onValueChange}
            />
            Genre
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Price"
              checked={selectedOption === "Price"}
              onChange={onValueChange}
            />
            Price
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Book Rating"
              checked={selectedOption === "Book Rating"}
              onChange={onValueChange}
            />
            Book Rating
          </label>
        </div>
        <div>
          Selected option is : {selectedOption}
        </div>
        <button className="btn btn-default" type="submit">
          Submit
        </button>
      </form>

  <div className = "container">
      <br/>
      <div className = "row">
        <div className = "col-sm-4">
        </div>
        <div className = "col-sm-4">
        </div>
        <div className = "col-sm-4">
        </div>
      </div>
      <br />
      <div className = "row">
            {dBooks.map((book) =>
            <div className = "col-sm-6" key = {book._id}>

              <CardUI
              title = {book.title}
              imgsrc = {book.cover}
              description = {book.description}
              setBookID = {props.setBookID}
              bookID = {book._id}
              />
            </div>
          )}
      </div>
   </div>
  </>
);

}


export default Home;
