var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const app = require('../app');
var connect = require('connect');
var eApp = connect();
var router = express.Router();

require('dotenv').config();

eApp.use(bodyParser.urlencoded({
  extended: true
}));

console.log("Attempting DB Connection");

mongoose.connect("mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASS+process.env.DB_LOCATION, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {

  if (err){
    throw err;
  } else {
    console.log("DB Connected Sucessfully");
    console.log("Backend Server Ready to Recieve Commands");
  }

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
  creditCards: Array
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

  var userName = req.body.userName;
  
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
   const password = req.body.password;
   const userName = req.body.userName;
 
   //if finds matching user name
   User.findOne({userName: userName}, function(err, user){
     if (user){
       //if finds matching password
       if (user.password == password){
           //redirect to the dashboard
           res.send('login success');
       } else {
         //handle login fail
         res.send('login fail')
       }
 
     } else {
       //handle login fail
       res.send('login fail')
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
            password: password
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
