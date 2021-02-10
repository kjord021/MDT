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

mongoose.connect("mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASS+process.env.DB_USER_LOCATION, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("DB Connected Sucessfully"))
  .catch(err => console.error("Could not connect to database", err));

//create schema for db
const userSchema = {
  userName: String,
  password: String,
  name: String,
  nickname: String,
  emailAddress: String,
  homeAddress: String,
  creditCard: Object,
  creditCards: Array,
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
const User = mongoose.model("User", userSchema);

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

  console.log(req.query.userName);

  var userName = req.query.userName;
  
  User.findOne({userName: userName}, function(err, result){
    if (err) {
      console.log(err);
    }
    else {
      console.log(userName);
      console.log(result);
      res.json(result);
    }

  });

});


/* POST A single user to login. */
router.post('/login', function(req, res){
   //parse data from html form
   const password = req.body.password;
   const userName = req.body.userName;
 
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
  const password = req.body.password;

  //check to see if UN or email exist
  User.findOne({userName: userName}, function(err, user){
    if (user){
      res.send('A user with that Username already exists.');
    }
    else {
      console.log(err);
      User.findOne({emailAddress: email}, function(err, user){
        if (user){
          res.send('A user with that email address already exists.');
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

/* PUT A single user to update. */
router.put('/update', function(req, res){
  
  const userName = req.body.userName;
  const email = req.body.emailAdd;
  const password = req.body.password;

  if (email != null) {
    User.updateOne({userName: userName}, {emailAddress: email}, function(err){
      if (err){
        console.log(err);
      } else {
        console.log('Updated Users Email Address');
      }
    });
  }
  if (password != null) {
    User.updateOne({userName: userName}, {password: password}, function(err){
      if (err){
        console.log(err);
      } else {
        console.log('Updated Users Password');
      }
    });
  }
  
  res.send('Finished updating information');

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

module.exports = router;
