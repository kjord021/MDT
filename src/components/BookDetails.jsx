import React from "react";

// Placeholder book object (this will be replaced by a fetch later on)

const book = {
  author: "J.K. Rowling",
  authorBio:
    "Joanne Rowling CH, OBE, HonFRSE, FRCPE, FRSL, better known by her pen name J. K. Rowling, is a British author and philanthropist. She is best known for writing the Harry Potter fantasy series.",
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
  return (
    <div class="container" id="detailscontainer">
      <div class="row">
        <div class="col-lg-1"></div>
        <div class="col-lg-10">
          <div class="card mb-3">
            <div class="row no-gutters">
              <div class="col-lg-4">
                <img src={book.cover} class="card-img" alt="book cover" />
              </div>
              <div class="col-lg-8">
                <div class="card-body">
                  <h2 class="card-title">{book.title}</h2>
                  <h5 id="bookauthor" class="card-title">
                    By {book.author}
                  </h5>
                  <p class="card-text">{book.desc}</p>
                  <p id="bookdetails" class="card-text">
                    <span style={{ paddingRight: "71px", fontWeight: "500" }}>
                      PUBLISHER
                    </span>
                    {book.publisher}
                  </p>
                  <p id="bookdetails" class="card-text">
                    <span style={{ paddingRight: "40px", fontWeight: "500" }}>
                      PUBLISHED ON
                    </span>
                    {book.date}
                  </p>
                  <p id="bookdetails" class="card-text">
                    <span style={{ paddingRight: "102px", fontWeight: "500" }}>
                      GENRE
                    </span>
                    {book.genre}
                  </p>
                  <hr />
                  <p id="bookdetails" class="card-text">
                    <span style={{ paddingRight: "110px", fontWeight: "500" }}>
                      PRICE
                    </span>
                    {book.price}
                  </p>
                  <button
                    id="submitbutton"
                    type="submit"
                    class="btn btn-success"
                  >
                    Purchase
                  </button>
                  <button id="detailbutton" type="submit" class="btn btn-info">
                    About Author
                  </button>
                  <button id="detailbutton" type="submit" class="btn btn-dark">
                    Back to results
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-1"></div>
      </div>
    </div>
  );
}

export default BookDetails;
