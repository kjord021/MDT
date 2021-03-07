import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import axios from "axios";

function CommentingRating(props) {
  const [createReview, setCreateReview] = useState(false);
  const [headline, setHeadline] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const id = props.book._id;

  function onFormSubmit(e) {
    axios.post(
      `http://localhost:5000/books/addReview`,
      {},
      {
        params: {
          userName: "username",
          _id: id,
          rating: rating,
          headline: headline,
          comment: comment,
        },
      }
    );
  }

  if (createReview) {
    return (
      <div class="row" align="center">
        <div class="col-lg-1"></div>
        <div class="col-lg-10 ">
          <div class="card mb-3">
            <div class="row no-gutters">
              <br />
              <div class="col-lg-5">
                <br />
                <h3>Create Review</h3>
              </div>
              <div class="col-lg-12">
                <h4>Overall Rating</h4>
                <div class="rating">
                  <StarRatings
                    rating={rating}
                    changeRating={(e) => setRating(e)}
                    starRatedColor="blue"
                    numberOfStars={5}
                    name="creat rating"
                    isSelectable
                    starDimension="35px"
                  />
                </div>
                <br />
                <hr />
              </div>
              <div class="col-lg-12">
                <form onSubmit={onFormSubmit}>
                  <br />
                  <h4>Add a Headline</h4>
                  <br />
                  <input
                    size="97"
                    placeholder="What's most important to know?"
                    onChange={(e) => setHeadline(e.target.value)}
                  />
                  <br />
                  <br />
                  <br />
                  <h4>Add a Comment</h4>
                  <br />
                  <textarea
                    placeholder="What did you like or dislike?"
                    name="review_text"
                    cols="100"
                    rows="5"
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <br />
                  <br />
                  <button type="submit" class="btn btn-dark">
                    Submit Review
                  </button>
                  <br />
                  <br />
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-1"></div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div class="row" align="center">
        <div class="col-lg-1"></div>
        <div class="col-lg-10 ">
          <div class="card mb-3">
            <div class="row no-gutters"></div>
            <br></br>
            <h2>Customer Reviews</h2>
            <br />
            <div class="row">
              <div class="col-lg-2"></div>
              <div class="col-lg-4" align="center">
                <h3>Overall Rating</h3>
                <StarRatings
                  rating={4.4}
                  starRatedColor="blue"
                  numberOfStars={5}
                  name="rating"
                  starDimension="35px"
                />
                <h4> {4.4} out of 5</h4>
              </div>

              <div class="col-lg-4" align="Center">
                <br />
                <br />
                <button
                  onClick={() => setCreateReview(true)}
                  class="btn btn-outline-secondary btn-lg"
                >
                  Create Customer Review
                </button>
              </div>
              <div class="col-lg-2"></div>
            </div>
            <br></br>
            <br></br>
            <h3>Featured Reviews</h3>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
        <div class="col-lg-1"></div>
      </div>
    </React.Fragment>
  );
}

export default CommentingRating;
