import React, { useState } from "react";
const mongoose = require("mongoose");

function CommentingRating(props) {
  const [headline, setHeadline] = useState("");
  const [comment, setComment] = useState("");

  const reviewConn = mongoose.createConnection(
    "mongodb+srv://" +
      process.env.DB_USER +
      ":" +
      process.env.DB_PASS +
      process.env.DB_BOOK_LOCATION,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  reviewConn.on("error", (err) => {
    console.error("Could not connect to Review database", err);
  });
  reviewConn.on("connected", () => {
    console.log("Review DB Connected Sucessfully");
  });

  const reviewSchema = {
    headline: { type: String, trim: true, default: "default headline" },
    comment: { type: String, trim: true, default: "default comment" },
  };

  const review = reviewConn.model("Review", reviewSchema, "commentratingDB");

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
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
              </div>
              <br />
              <hr />
            </div>
            <div class="col-lg-12">
              <form>
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

export default CommentingRating;
