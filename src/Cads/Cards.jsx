import React, {Component} from 'react'
import Card from './CardUI';

class Cards extends Component{
render(){
  return(
    <div className="container-fluid d-flex justify-content-center">
      <div className="row">
        <div className="col-md-4">
          <Card imgsrc="https://images-na.ssl-images-amazon.com/images/I/41U3yoF6sXL._SX427_BO1,204,203,200_.jpg" title="Greenlights"/>
        </div>
        <div className="col-md-4">
          <Card imgsrc="https://www.pluggedin.com/wp-content/uploads/2020/01/harry-potter-and-the-prisoner-of-azkaban-cover-image-718x1024.jpeg" title="Harry Potter and the Prisoner of Azkaban"/>
        </div>
        <div className="col-md-4">
          <Card imgsrc="https://images-na.ssl-images-amazon.com/images/I/61VUik8NJ8L.jpg"  title="Catching Fire"/>
        </div>
      </div>
    </div>
  )
}
}

export default Cards;
