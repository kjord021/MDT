import React from "react";

function CartInfo(props) {

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
                          <p>Quantity: {props.quantity}</p>
                          <p>Cost: ${props.book.price?.$numberDecimal}</p>
                      </div>
                  </div>
                  <div class="col-md-3">
                      <button id="cart-button" type="submit" class="btn btn-danger" onClick={() => deleteBook(props.book)}>Delete</button>
                      <div>
                          <button id="cart-button" class="btn btn-primary">Save for later</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}

function deleteBook(book) {
    console.log("delete", book._id)
}
export default CartInfo;

