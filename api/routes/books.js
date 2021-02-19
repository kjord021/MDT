var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const app = require('../app');
var connect = require('connect');
const { useParams } = require('react-router-dom');
var eApp = connect();
var router = express.Router();

require('dotenv').config();

eApp.use(bodyParser.urlencoded({
  extended: true
}));

console.log("Attempting DB Connection");

const bookConn = mongoose.createConnection("mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASS+process.env.DB_BOOK_LOCATION, {useNewUrlParser: true, useUnifiedTopology: true})
bookConn.on('error', err => {
    console.error("Could not connect to database", err)
 });
bookConn.on('connected', () => {
  console.log('Book DB Connected Sucessfully');
});

//create schema for db
const bookSchema = {
  _id: Number,
  author: String,
  cover: String,
  genre: String,
  price: String,
  rating: String,
  title: String,
  date: Date,
  description: String,
  publisher: String,
  authorBio: String
};

//bind schema to object
const Book = bookConn.model("Book", bookSchema);

/* GET books listing. */
router.get('/', function(req, res, next) {

Book.find({}, function(err, result){
  if (err) {
    console.log(err);
  }
  else {
    res.json(result);
  }

});
});

/*GET individual books*/
router.get('/book', function(req, res, next) {

  console.log(req.query.title);

  var title = req.query.title;

  Book.findOne({title: title}, function(err, result){
    if (err) {
      console.log(err);
    }
    else {
      console.log(title);
      console.log(result);
      res.json(result);
    }

  })

});
  /*POST individual books*/
  router.post('/addBook',(req, res) => {
        let book = new Book({title: 'The Bible', author: 'Jesus'});
        book.save();
        res.status(201).send(book)
    });
    // Everything below
    // is under construction :)
    /*PUT Individual books for editing*/
    router.put((req,res) => {
            Book.findById(req.params._id, (err, book) => {
                book.title = req.body.title;
                book.author = req.body.author;
                book.save()
                res.json(book)
            })
        });

    router.patch((req,res)=>{
                Book.findById(req.params.bookId, (err, book) => {
                    if(req.body._id){
                        delete req.body._id;
                    }
                    for( let b in req.body ){
                        book[b] = req.body[b];
                    }
                    book.save();
                    res.json(book);
                })
  });
  /*DELETE books*/
  router.delete((req,res)=>{
        Book.findById(req.params._id, (err, book) => {
            book.remove(err => {
                if(err){
                    res.status(500).send(err)
                }
                else{
                    res.status(204).send('removed')
                }
            })
        })
    });

module.exports = router;
