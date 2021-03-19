import React, { useState, useEffect } from "react";
import {Redirect} from "react-router-dom";
import axios from "axios";

function Search(props) {
  const [Book, setBook] = useState([]);
  const url =
    "http://localhost:5000/books/book?title=" + props.location.bookTitle;
  useEffect(() => {
    axios
      .get(url)
      .then((response) => setBook(response.data))
      .catch((error) => console.log(error));
  }, []);



/*
<form>
<label>
 <input type="text" value={this.state.value} onChange={this.handleChange} />
 </label>
  <input submitbutton element onClick={() => {
  axois.get("http://localhost:5000/books/book/").then((res) => {
     setBooks(response.data)
     setRetrieved(true)
  }
}}>
</form>

<p>
  {retrieved ? (
    books.title
  ) : (
   "Search in the input bar above"
)
</p>
*/
  //  if (!props.isLoggedIn()) {
    //    return (<Redirect to='/Login' />);
    //}

    //console.log("output",books)
    // props.cart.forEach((book) => {
    //   promises.push(
    //     axios.get("http://localhost:5000/books/book/id", {params: {_id:book.book}}).then(response => {
    //       books.push(response.data)
    //     })
    //   )
    // })
    // Promise.all(promises).then(() => console.log(books))
    // console.log("books:", books)



    return (
      <div>
          <div class="container">
            <h1>Shopping Cart</h1>
        </div>
        </div>

  );
}

export default Search;
