import axios from "axios";
import React from "react";

function SaveLater(props) {
    return (
        <div class="card" style={{width: '2 rem' }}>
            <img class="card-img-top" src={props.book.cover} alt="Card image cap"/>
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
        </div>
    )
}

export default SaveLater;