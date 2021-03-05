import React, { useState, useEffect } from "react";
import {Redirect} from "react-router-dom";
import CartInfo from "./subcomponents/CartInfo";
import axios from "axios";

function Cart(props) {
  var totalCost = 0;
  var quantity = 0;

  const [books, setBooks] = useState([]); //stores book data from GET

  useEffect(() => {
    axios //refreshes shopping cart data
    .get("http://localhost:5000/users/user/", {params: {userName:props.userName}})
    .then((response) => {
      var data = response.data;
      props.updateCart(JSON.stringify(data))
    })
    .catch((error) => console.log(error))
    .finally(() => {
      props.cart.forEach((book) => { //loops through cart to retrieve book data based on ID
        axios
        .get("http://localhost:5000/books/book/id", {params: {_id:book.book}})
        .then((response) => setBooks(books => [...books, response.data]))
        .catch((error) => console.log(error));
  })})},[]);

    if (!props.isLoggedIn()) {
        return (<Redirect to='/Login' />);
    }
    return (
      <div>
        <div class="container">
          <h1>Shopping Cart</h1>
          <hr />
          {books.map((book, i) => {
            if (props.cart[i] != undefined) {
              props.cart.forEach((item) => {
                if (item.book == book._id) {
                  quantity = item.quantity
                }
              })
              totalCost = (parseFloat(book.price?.$numberDecimal) * parseFloat(quantity)) + totalCost 
              return <div key={i}>{<CartInfo book={book} quantity={quantity} />}</div>
            }
          })}
        </div>
        <h4 id="total">Total Cost: ${totalCost.toFixed(2)}</h4>
      </div>
    );
  }



export default Cart;