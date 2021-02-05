const express = require ("express");
const mongoose = require("mongoose");
const path = require("path");
const { reduce } = require("async");

require('dotenv').config();

const app = express();

// Serve the static files from the React app
app.use(express.static('./'));

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


app.get('/', (req, res) => {
  res.send("Hello");
});

app.post('/login', (req, res) =>{



});


// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


app.listen(5000, function() {
    console.log("Server started on port 5000");
  });