import React, {useState} from 'react';
import {Redirect} from "react-router-dom";
import CartInfo from "./subcomponents/CartInfo";

const book = {
    _id: 1,
    author: "J.K. Rowling",
    authorBio:
      "Joanne Rowling CH, OBE, HonFRSE, FRCPE, FRSL, better known by her pen name J. K. Rowling, is a British author and philanthropist. She is best known for writing the Harry Potter fantasy series.",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51jyI6lYi1L._SX342_BO1,204,203,200_.jpg",
    genre: "Fiction",
    price: "10.49",
    title: "Harry Potter and the Deathly Hallows",
    date: "July 1, 2009",
    desc:
      "The heart of Book 7 is a hero's mission--not just in Harry's quest for the Horcruxes, but in his journey from boy to man--and Harry faces more danger than that found in all six books combined, from the direct threat of the Death Eaters and you-know-who, to the subtle perils of losing faith in himself. ",
    publisher: "Arthur A. Levine Books",
  };

function Cart(props) {
    if (!props.isLoggedIn()) {
        return (<Redirect to='/Login' />);
    }
    return (
    <div class="container" id="cartcontainer">
        <h1>Shopping Cart</h1>
        <hr />
            {props.cart.map((item,i) => {
              return <p key={i}>{<CartInfo book={book} quantity={item.quantity}/>}</p>
            })};
    </div>
    );
}

export default Cart;