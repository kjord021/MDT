import React from "react";

// Placeholder book object (this will be replaced by a fetch later on)

const book = {
  author: "J.K. Rowling",
  cover:
    "https://images-na.ssl-images-amazon.com/images/I/51jyI6lYi1L._SX342_BO1,204,203,200_.jpg",
  genre: "Fiction",
  price: "$10.49",
  title: "Harry Potter and the Deathly Hallows",
  date: "July 1, 2009",
  desc:
    "The heart of Book 7 is a hero's mission--not just in Harry's quest for the Horcruxes, but in his journey from boy to man--and Harry faces more danger than that found in all six books combined, from the direct threat of the Death Eaters and you-know-who, to the subtle perils of losing faith in himself. ",
  publisher: "Arthur A. Levine Books",
};

function BookDetails() {
  let space = "1vh";

  return (
    <div class="container-md rounded border" id="detailscontainer">
      <div class="row">
        <div class="col-md-4">
          <img
            class="rounded border"
            id="bookcover"
            src={book.cover}
            alt="cover"
          />
        </div>
        <div id="bookdescription" class="col-md-8">
          <h2>{book.title}</h2>
          <h4>By {book.author}</h4>
          <p style={{ paddingTop: "1vh" }}>{book.desc}</p>
          <p>
            <span
              style={{
                marginRight: "1rem",
                fontWeight: "500",
              }}
              id="otherbookdetails"
            >
              PUBLISHER
            </span>
            {book.publisher}
          </p>

          <p>
            <span id="otherbookdetails">PUBLISHED ON</span>
            {book.date}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
