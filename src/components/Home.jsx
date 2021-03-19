import React, { useState, useEffect } from "react";
import CardUI from "../Cads/CardUI";
import axios from "axios";

function Home(){
    var cards;
    var data;
    const [books, setBooks] = useState([]);
        axios
          .get("http://localhost:5000/books/", {
          })
          .then(
          (response) => {

            setBooks(response.data);

          /*
          books.map((book) =>
             <CardUI
              title = {book.title}
             />
             */

          },

          (error) => {
            console.log(error);
          }
        );


return (
  <>

<>CardUI

</>

  { books.forEach(book =>

     <CardUI title = {book.title}/>

    )}


  </>
);

}


export default Home;
