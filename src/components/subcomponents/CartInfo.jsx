import axios from "axios";
import React from "react";
import refresh from '../../styling/assets/refresh.png'

function CartInfo(props) {

    function deleteBook(cart, ID) {
        axios.delete("http://localhost:5000/users/cart/delete", {data: {
            cartID:cart._id,
            userID:ID
        }})
        .then((response) => {
            console.log(response);
            props.setLoad(false);
        })
        .catch((error) => console.log(error))
    }
    
    function updateQ(cart, ID){
        axios.patch("http://localhost:5000/users/cart/update", {
            cartID:cart._id,
            userID:ID,
            quantity: document.getElementById(cart._id).value
        })
        .then((response) => {
            console.log(response)
            props.setLoad(false);
        })
        .catch((error) => console.log(error))
    }

  return (
      <div class="card cart-card">
          <div class="cart-card-body">
              <div class="row">
                  <div class="col-md-2 cart-card">
                      <img src={props.book.cover} class="cart-card-img" alt="book cover" />
                  </div>
                  <div id="cart-item-center" class="col-md-7">
                      <h3 class="card-title cart-title">{props.book.title}</h3>
                      <h5 id="bookauthor" class="card-title">By {props.book.author}</h5>
                      <div class="cart-card-p">
                          <div>
                              Quantity: 
                            <div class="input-group justify-content-center" text-align="center">
                                <input type="number" id={props.cartItem._id} min="1" max="50" defaultValue={props.cartItem.quantity}></input>
                                <button type="button" onClick={() => updateQ(props.cartItem, props.userID)}><img src={refresh} class="cart-refresh-img"/></button>
                            </div>
                          </div>
                          <br/>
                          <p>Cost: ${props.book.price?.$numberDecimal}</p>
                      </div>
                  </div>
                  <div class="col-md-3">
                      <button id="cart-button" type="submit" class="btn btn-danger" 
                        onClick={() => deleteBook(props.cartItem, props.userID)}>Delete
                      </button>
                      <div>
                          <button id="cart-button" class="btn btn-primary">Save for later</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default CartInfo;

