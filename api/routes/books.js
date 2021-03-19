var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const app = require("../app");
var connect = require("connect");
const { useParams } = require("react-router-dom");
var eApp = connect();
var router = express.Router();
var Int32 = require("mongoose-int32");

require("dotenv").config();

eApp.use(bodyParser.json());
eApp.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

console.log("Attempting DB Connection");

const bookConn = mongoose.createConnection(
  "mongodb+srv://" +
    process.env.DB_USER +
    ":" +
    process.env.DB_PASS +
    process.env.DB_BOOK_LOCATION,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
bookConn.on("error", (err) => {
  console.error("Could not connect to database", err);
});
bookConn.on("connected", () => {
  console.log("Book DB Connected Sucessfully");
});

//create schema for db
const bookSchema = {
  author: String,
  cover: String,
  genre: String,
  price: mongoose.Decimal128,
  rating: Int32,
  title: String,
  __v: Int32,
  authorBio: String,
  date: Date,
  description: String,
  publisher: String,
  reviews: [],
};

//bind schema to object
const Book = bookConn.model("Book", bookSchema);

/* GET books listing. */
router.get("/", function (req, res, next) {
  Book.find({}, function (err, books) {
    console.log("working");
    res.send(books);
  });
});

/*GET individual books*/
router.get("/book", function (req, res, next) {
  console.log(req.query.title);

  var title = req.query.title;

  Book.findOne({ title: title }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(title);
      console.log(result);
      res.json(result);
    }
  });
});

/*GET individual book by author*/
router.get("/book/author", (req, res, next) => {
  var author = req.query;

  Book.find(author, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});


/*GET individual book by ID*/
router.get('/book/id', (req, res, next) => {
  var id = req.query;

  Book.findById(id, (err, result) => {
    if(err) {
      console.log(err);
    }
    else {
      res.json(result);
    }
  })
});


/*POST individual books*/
router.post("/addBook", (req, res, next) => {
  let book = new Book(req.body);
  book.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(201, post);
  });
});

//  var {ObjectID} = require('mongodb');
/*DELETE books*/
router.delete("/deleteBook", (req, res) => {
  console.log("Hey buddy");
  var bookTitle = req.body.title;

  console.log(bookTitle);

  Book.deleteOne({ title: bookTitle })
    .then(function () {
      console.log("Deleting Book");
    })
    .catch(function (error) {
      console.log(error);
    });
  res.send("Book deleted");
});

//Add a review
router.post('/addReview',(req,res) => {
  var id = req.query._id;
  var userName = req.query.username;
  var nickName = req.query.nickname;
  var headline = req.query.headline;
  var comment = req.query.comment;
  var rating = req.query.rating;
  var isAnonymous = req.query.isAnonymous;
  var showNickname = req.query.showNickname;
  Book.findOneAndUpdate({_id: id}, 
  {
    $push: {reviews: {
      userName: userName,
      nickName: nickName,
      headline: headline,
      comment: comment,
      rating: rating,
      isAnonymous: isAnonymous,
      showNickname: showNickname}}
  },
  (err, result) => {
  })
  res.send('Added Review');
});


//PUT and PATCH: under construction
/*PUT Individual books for editing*/
router.put((req, res) => {
  Book.findById(req.params._id, (err, book) => {
    book.title = req.body.title;
    book.author = req.body.author;
    book.save();
    res.json(book);
  });
});

router.patch((req, res) => {
  Book.findById(req.params.bookId, (err, book) => {
    if (req.body._id) {
      delete req.body._id;
    }
    for (let b in req.body) {
      book[b] = req.body[b];
    }
    book.save();
    res.json(book);
  });
});

/*        Book.findByIdAndRemove(req.params._id, (err, book) => {

                if(err){
                    res.status(500).send(err)
                }
                else{
                    res.status(204).send('removed')
                }
*/

module.exports = router;
