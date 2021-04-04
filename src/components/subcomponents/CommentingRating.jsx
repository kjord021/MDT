import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import axios from "axios";

function CommentingRating(props) {
  const [createReview, setCreateReview] = useState(false);
  const [headline, setHeadline] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [showNickname, setShowNickname] = useState(0);
  const [isAnonymous, setAnonymous] = useState(0);
  const id = props.book._id;
  const username = props.props.userName || "Missing";
  const nickname = props.props.nickName || "Missing";
  const reviews = props.book.reviews || [];

  function handleAnonymous(x, y) {
    if (y == 0) return x;
    else return "anonymous";
  }

  function handleNickname(x, y) {
    if (y == 0) return x;
    else return "default";
  }

  function displayReviews() {
    if (!reviews.length) return null;

    return reviews.map((review, index) => (
      <div key={index}>
        <div class="row no-gutters">
          <div class="col-lg-4"></div>
          <div class="col-lg-2" align="center">
            <img
              src="https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png"
              class="img-thumbnail"
              alt="Profile"
            />
          </div>
          <div class="col-lg-2" align="center">
            <br />
            <h6>
              {"--- " + handleAnonymous(review.userName, review.isAnonymous)}
            </h6>
          </div>
          <div class="col-lg-4"></div>
        </div>
        <br />
        <h5>{review.headline}</h5>
        <StarRatings
          rating={Number(review.rating)}
          starRatedColor="blue"
          numberOfStars={5}
          name="review"
          starDimension="15px"
        />
        <p>
          <br />
          {review.comment}
        </p>
        <p>{"~" + handleNickname(review.nickName, review.showNickname)}</p>
        <div class="row no-gutters">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <hr />
          </div>
          <div class="col-lg-4"></div>
        </div>
        <br />
      </div>
    ));
  }

  function ratingAverage() {
    var sum = 0;
    var size = 0;
    reviews.map((review, index) => (sum = sum + Number(review.rating)));
    return Math.round((sum / reviews.length) * 100) / 100 || 0;
  }

  function onFormSubmit(e) {
    axios.post(
      `http://localhost:5000/books/addReview`,
      {},
      {
        params: {
          username: username,
          nickname: nickname,
          _id: id,
          rating: rating,
          headline: headline,
          comment: comment,
          isAnonymous: isAnonymous,
          showNickname: showNickname,
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
              <div class="col-lg-3" align="Center">
                <br />
                <br />
                <button
                  onClick={() => setCreateReview(false)}
                  class="btn btn-outline-secondary btn-sm"
                >
                  Go Back
                </button>
              </div>
              <div class="col-lg-6">
                <br />
                <h3>Create Review</h3>
                <br />
                <br />
              </div>
              <div class="col-lg-3"></div>
              <div class="col-lg-3"></div>
              <div class="col-lg-3">
                <h4>Overall Rating:</h4>
              </div>
              <div class="rating col-lg-4">
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
              <div class="col-lg-2"></div>
              <br />
              <br />
              <br />
              <br />
              <div class="col-lg-3"></div>
              <div class="col-lg-3">
                <h6>Keep Anonymous:</h6>
                <input
                  type="checkbox"
                  name="check[0]"
                  onChange={(e) => setAnonymous(1 - e.target.value)}
                  value={isAnonymous}
                ></input>
              </div>
              <div class="col-lg-3">
                <h6>Hide Nickname:</h6>
                <input
                  type="checkbox"
                  name="check[0]"
                  onChange={(e) => setShowNickname(1 - e.target.value)}
                  value={showNickname}
                ></input>
              </div>
              <div class="col-lg-12">
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
                  rating={Number(ratingAverage())}
                  starRatedColor="blue"
                  numberOfStars={5}
                  name="rating"
                  starDimension="35px"
                />
                <h4> {Number(ratingAverage())} out of 5</h4>
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
            {displayReviews()}
            <br />
          </div>
        </div>
        <div class="col-lg-1"></div>
      </div>
    </React.Fragment>
  );
}

export default CommentingRating;
