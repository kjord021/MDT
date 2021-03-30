import React, { useState, useEffect } from "react";
import {Redirect} from "react-router-dom";
import CartInfo from "./subcomponents/CartInfo";
import SaveLater from "./subcomponents/SaveLater"
import axios from "axios";

function Cart(props) {
  var totalCost = 0;
  var cartItem = {};

  const [books, setBooks] = useState([]); 
  const [cart, setCart] = useState([]);
  const [load, setLoad] = useState(true)
 

  //console.log("books",books) //for debugging
  //console.log("cart",cart) //for debugging

  useEffect(() => { //builds cart data
    getUserCart();
    getBookData();
    setLoad(true)
  }, [load, cart.length]);

  useEffect(() => { //builds save for later data
    setLoad(false)
  }, [])


  const getUserCart = () => {
    axios
    .get("http://localhost:5000/users/user/", {params: {userName:props.userName}})
    .then((response) => {
      const data = response.data.cart
      setCart(data)
    })
    .catch((error) => console.log(error));
  }

  const getBookData = () => {
    setBooks([])
    cart.map((cart, i) => {
    axios
    .get("http://localhost:5000/books/book/id", {params: {_id:cart.book}})
    .then((response) => {
      setBooks(books => [...books, response.data]) 
    })
    .catch((error) => console.log(error));
})}

  var saveCards = books.map((book) => 
    <div class="col-sm-6">
    <SaveLater/>
    </div>
  )

    if (!props.isLoggedIn()) {
        return (<Redirect to='/Login' />);
    }
    return (
      <div>
        <div class="container">
          <h1>Shopping Cart </h1>
          <button type="submit" class="btn btn-dark" onClick={() => {getUserCart(); getBookData();}}>
              Refresh
          </button>
          <hr/>
          {books.map((book, i) => {
            if (cart[i] != undefined) {
              cart.forEach((item) => {
                if (item.book == book._id) {
                  cartItem = item
                }
              })
              totalCost = (parseFloat(book.price?.$numberDecimal) * parseFloat(cartItem.quantity)) + totalCost 
              return <div key={i}>{<CartInfo book={book} cartItem={cartItem} userID={props.userID} setLoad={setLoad}/>}<br/></div>
            }
          })}
        </div>
        <h4 id="total">Subtotal: ${totalCost.toFixed(2)}</h4>
        <hr/>
        <div class="container">
          <h1>Save for Later </h1>
          <div class="row">
            {saveCards}
          </div>
          <br/>
        </div>
      </div>
    );
  }

export default Cart;