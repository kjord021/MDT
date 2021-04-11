import React, { useState, useEffect } from "react";
import {Redirect} from "react-router-dom";
import CartInfo from "./subcomponents/CartInfo";
import SaveLater from "./subcomponents/SaveLater"
import axios from "axios";


function Cart(props) {
    var totalCost = 0;
    const [isLoading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [save, setSave] = useState([]);
    const [render, setRender] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:5000/users/user/", {params: {userName:props.userName}})
        .then((response) => {
            setCart([])
            setSave([])

            response.data.cart.map((item) => {
                axios.get("http://localhost:5000/books/book/id", {params: {_id:item.book}})
                .then((response) => {
                    setCart(cart => [...cart, {_id:item._id, quantity:item.quantity, book:response.data}]);
                })
            });
            response.data.saveForLater.map((item) => {
                axios.get("http://localhost:5000/books/book/id", {params: {_id:item.book}})
                .then((response) => {
                    setSave(cart => [...cart, {_id:item._id, quantity:item.quantity, book:response.data}])
                })
            });
            setLoading(false)
        });
    },[render]);

    if (!props.isLoggedIn()) {
        return (<Redirect to='/Login' />);
    }
    if (isLoading) {
        return <div>Loading...</div>
      }
      
    cart.map(item => totalCost = totalCost + parseFloat(item.book.price?.$numberDecimal) * parseFloat(item.quantity))
    return (
        <div>
          <div class="container">
            <h1>Shopping Cart </h1>
            <button type="submit" class="btn btn-dark" onClick={() => {setRender(render + 1)}}>
                Refresh
            </button>
            <hr/>
            <div class="p-cart-card" >
                {cart.map(item => <div key={item._id}><CartInfo book={item.book} cartItem={item} userID={props.userID} setRender={setRender} render={render}/><br/></div>)}
            </div>
          </div>
          <h4 id="total">Subtotal: ${totalCost.toFixed(2)}</h4>
          <hr/>
          <div class="container">
            <h1>Save for Later </h1>
            <div class="row">
                {save.map(item => <div class="col-sm-6" key={item._id}><SaveLater book={item.book} userID={props.userID} setRender={setRender} render={render}/><br/></div>)}
            </div>
            <br/>
          </div>
        </div>
      );
}

export default Cart;