import axios from "axios";
import React from "react";

function SaveLater(props) {

    function deleteBook(book, ID) {
        axios.delete("http://localhost:5000/users/save/delete", {data: {
            bookID:book._id,
            userID:ID
        }})
        .then((response) => {
            console.log(response);
            props.setRender(props.render + 1);
        })
        .catch((error) => console.log(error))
    };

    function addCart(book, ID) {
        axios.put("http://localhost:5000/users/cart/add" , {
            userID:ID,
            book:book._id
        })
        .then((response) => {
            console.log(response)
            deleteBook(book, ID)
        })
        .catch((error) => console.log(error))
    };

    return (
        <div class="card save-card">
            <img class="card-img-top" src={props.book.cover} />
                <div class="card-body" id="save-card">
                    <h5 class="card-title">{props.book.title}</h5>
                    <p class="card-text">{props.book.author}</p>
                    <div class="row">&nbsp;&nbsp;&nbsp;
                        <button type="submit" class="btn btn-danger" onClick={() => {deleteBook(props.book, props.userID)}}>Delete</button>
                        &nbsp;&nbsp;&nbsp;
                        <button type="submit" class="btn btn-success" onClick={() => {addCart(props.book, props.userID)}}>Move to Cart</button>
                    </div>
                </div>
        </div>
    )
}

export default SaveLater;