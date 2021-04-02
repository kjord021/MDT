var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const app = require('../app');
var connect = require('connect');
const { useParams } = require('react-router-dom');
var md5 = require('md5');
var eApp = connect();
var router = express.Router();

require('dotenv').config();

eApp.use(bodyParser.urlencoded({
  extended: true
}));

console.log("Attempting DB Connection");

const userConn = mongoose.createConnection("mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASS+process.env.DB_USER_LOCATION, {useNewUrlParser: true, useUnifiedTopology: true})
userConn.on('error', err => {
    console.error("Could not connect to database", err)
 });
userConn.on('connected', () => {
    console.log('User DB Connected Sucessfully');
});

//create schema for db
const userSchema = {
  userName: String,
  password: String,
  name: String,
  nickname: String,
  emailAddress: String,
  homeAddress: String,
  creditCard: Object,
  creditCards: [{
    number: Number,
    expirationDay: Number,
    expirationMonth: Number,
    csv: Number, 
  }],
  shippingAddresses: [
    String
  ],
  cart: [{
    book: Object,
    quantity: Number
  }],
  saveForLater: [{
    book: Object,
    quantity: Number
  }]
};

//bind schema to object
const User = userConn.model("User", userSchema);

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  User.find({}, function(err, result){
    if (err) {
      console.log(err);
    }
    else {
      res.json(result);
    }

  });

});

/* GET A single user listing. */
router.get('/user', function(req, res, next) {

  var userName = req.query.userName;
  
  User.findOne({userName: userName}, function(err, result){
    if (err) {
      console.log(err);
    }
    else {
      res.json(result);
    }

  });

});


/* POST A single user to login. */
router.post('/login', function(req, res){
   //parse data from html form
   const password = md5(req.body.password);
   const userName = req.body.userName;

   console.log(password);
 
   //if finds matching user name
   User.findOne({userName: userName}, function(err, user){
     if (user){
       //if finds matching password
       if (user.password == password){
           //redirect to the dashboard
           res.status(200).send('User found');
       } else {
         //handle login fail
         res.status(404).send('User Not Found');
       }
 
     } else {
       //handle login fail
       res.status(404).send('User Not Found');
     }
   })
});


/* POST A single user to Register. */
router.post('/register', function(req, res){
  const userName = req.body.userName;
  const email = req.body.emailAdd;
  const fullName = req.body.fullName;
  const password = md5(req.body.password);


  //check to see if UN or email exist
  User.findOne({userName: userName}, function(err, user){
    if (user){
      res.status(404).send('A user with that Username already exists.');
    }
    else {
      console.log(err);
      User.findOne({emailAddress: email}, function(err, user){
        if (user){
          res.status(404).send('A user with that email address already exists.');
        }
        else {
          console.log(err);

          //if login data doesnt exist create new login

          const newUser = User({
            userName: userName,
            emailAddress: email,
            name: fullName,
            password: password,
            nickname: null,
            homeAddress: null,
            creditCard: null,
          });
        
          newUser.save( function (err){
            if (!err){
              //redirect user to the login page
              res.send('user created. redirect to login');
            }
            else {
              console.log(err);
            }
          });

        }  
      });
    }   
  }); 
});

/*PUT new book to cart*/
router.put('/cart/add', function(req, res) {
  const book = req.body.book; //records book data passed to API
  var quantity = req.body.quantity; // records quantity passed to API
  const userID = req.body.userID; // records UserID to add cart items to right user

  if (quantity == null) {
    quantity = 1
  }
  User.updateOne(
    {_id: userID}, //finds user by ID
    {$push: {"cart": [{"book": book, "quantity": quantity}]}}, (err) => { //add data in to existing cart
      if (err){
        console.log(err);
      } else {
        res.send('Book added to cart');
      }
    }
  )
});

/*PUT a new credit card to account*/
router.put('/add/card', function(req, res) {
  var userName = req.body.userName;
  var cardNum = req.body.cardNum;
  var expirationDay = req.body.expirationDay;
  var expirationMonth = req.body.expirationMonth;
  var csv = req.body.csv;

  User.updateOne(
    {userName: userName},
    {$push: {"creditCards": [{"number": cardNum, "expirationDay": expirationDay, "expirationMonth": expirationMonth, "csv": csv}]}}, (err) => {
      if (err){
        console.log(err);
      } else {
        res.send('Card Added To AccountD');
      }
    }
  )
});

/* DELETE an card using put*/
router.put('/delete/card', function(req, res){
  const userName = req.body.userName;
  const number = req.body.number;

  User.updateOne(
    {userName: userName},
    {$pull: {"creditCards": {number: number}}}, (err) => {
      if (err){
        console.log(err);
      } else {
        res.send('Card removed from Array');
      }
    }
  )

});

/*PUT new shipping address to array */
router.put('/update/Shipping', function(req, res) {
  var userName = req.body.userName;
  var address = req.body.address;

  User.updateOne(
    {userName: userName},
    {$push: {"shippingAddresses": [address]}}, (err) => {
      if (err){
        console.log(err);
      } else {
        res.send('Address added to Array');
      }
    }
  )
});

/* ADD an address using put*/
router.put('/add/address', function(req, res){
  const userName = req.body.userName;
  const address = req.body.address;

  console.log(address);

  User.updateOne(
    {userName: userName},
    {$push: {"shippingAddresses": address}}, (err) => {
      if (err){
        console.log(err);
      } else {
        res.send('Address removed from Array');
      }
    }
  )

});

/* DELETE an address using put*/
router.put('/delete/address', function(req, res){
  const userName = req.body.userName;
  const address = req.body.address;

  console.log(address);

  User.updateOne(
    {userName: userName},
    {$pull: {"shippingAddresses": address}}, (err) => {
      if (err){
        console.log(err);
      } else {
        res.send('Address removed from Array');
      }
    }
  )

});


/* PUT A single user to update. */
router.put('/update', function(req, res){

  const userName = req.body.userName;
  const newUserName = req.body.newUserName;
  const homeAddress = req.body.homeAddress;
  const email = req.body.emailAdd;
  const password = md5(req.body.password);
  const fullName = req.body.fullName;
  const nickname = req.body.nickname;

  console.log(req.body.homeAddress);

  if (newUserName != null){
    User.findOne({userName: newUserName}, function(err, user){
      if (user){
        res.status(404).send('A user with that Username already exists.');
      }
      else {
        User.updateOne({userName: userName}, {userName: newUserName}, function(err){
          if (err){
            console.log(err);
          } else {
            res.send('Updated UserName');
          }
        });
      }
    });
  }

  if (email != null) {

    User.findOne({emailAddress: email}, function(err, user){
      if (user){
        res.status(404).send('A user with that email already exists');
      }
      else {
        User.updateOne({userName: userName}, {emailAddress: email}, function(err){
          if (err){
            console.log(err);
          } else {
            res.send('Updated Users Email Address');
          }
        });
      }
    });
  }
  if (password != null) {
    User.updateOne({userName: userName}, {password: password}, function(err){
      if (err){
        console.log(err);
      } else {
        res.send('Updated Users Password');
      }
    });
  }
  if (fullName != null) {
    User.updateOne({userName: userName}, {name: fullName}, function(err){
      if (err){
        console.log(err);
      } else {
        res.send('Updated Users Name');
      }
    });
  }
  if (homeAddress != null){
    User.updateOne({userName: userName}, {homeAddress: homeAddress}, function(err){
      if (err){
        console.log(err);
      } else {
        res.send('Updated Users Address');
      }
    });
  }
  if (nickname != null) {
    User.updateOne({userName: userName}, {nickname: nickname}, function(err){
      if (err){
        console.log(err);
      } else {
        res.send('Updated Users NickName');
      }
    });
  }
});


/* DELETE A single user to delete. */
router.delete('/delete', function(req, res){

  const userName = req.body.userName;

  User.deleteOne({ userName: userName}).then(function(){ 
    console.log("Deleting User"); // Success 
  }).catch(function(error){ 
      console.log(error); // Failure 
  }); 

  res.send('Successfully Deleted User');
});

/*DELETE item from cart*/
router.delete("/cart/delete", (req, res) => {
  const cartItemID = req.body.cartID;
  const userID = req.body.userID;

  User.updateOne(
    {_id: userID},
    {$pull: {"cart": {_id:cartItemID}}}, (err) => {
      if (err){
        console.log(err);
      } else {
        res.send('Book removed from cart');
      }
    }
  )
});

/*PATCH quantity in cart*/
router.patch("/cart/update", (req, res) => {
  const cartItemID = req.body.cartID
  const userID = req.body.userID;
  const newQuantity = req.body.quantity

  User.updateOne(
    {_id: userID, "cart._id": cartItemID},
    {$set: {"cart.$.quantity": newQuantity}}, (err) => {
      if (err){
        console.log(err);
      } else {
        res.send('Book quantity updated');
      }
    }
  )
});

module.exports = router;
