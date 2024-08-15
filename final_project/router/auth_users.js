const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
let sameUserName = users.filter((user)=>{
    return user.username === username
  });
  if(sameUserName.length > 0){
    return true;
  } else {
    return false;
  }
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}

//only registered users can login
//task 7
//user customer/login
regd_users.post("/login", (req,res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const username = req.body.username;
  const password = req.body.password;
  //console.log(req);
//console.log(req.params.username);
//console.log(req.query.username);
//console.log(req.body.username);

  if (!username || !password) {
      return res.status(404).json({message: "ERROR. Either username or password not provided."});
  }

  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("Successful User Login.");
  } else {
    return res.status(208).json({message: "Invalid Login. Please check username and password"});
  }
});

// Add a book review
//tasj 8
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  try {
    const reqIsbn = req.params.isbn;
    const reviewText = req.body.review;
    const username = req.session.authorization.username; 

    if (!username) {
      return res.status(401).json({ message: "Unauthorized" }); 
    }

    const book = books[reqIsbn];

    if (book) {
      book.reviews[username] = reviewText; 
      res.json({ message: "Book Review added/updated successfully" });
    } else {
      res.status(404).json({ message: "Book not found" }); 
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while adding/updating book review" }); 
  }
});

//Delete a book Review
//task 9
regd_users.delete("/auth/review/:isbn", (req, res) => {
    try {
      const reqIsbn = req.params.isbn;
      const username = req.session.authorization.username; 
  
      if (!username) {
        return res.status(401).json({ message: "Unauthorized" }); 
      }
  
      const book = books[reqIsbn];
  
      if (book) {
        if (book.reviews[username]) { 
          delete book.reviews[username]; 
          res.json({ message: "Book review deleted successfully" });
        } else {
          res.status(404).json({ message: "ERROR. Review not found" }); 
        }
      } else {
        res.status(404).json({ message: "ERROR. Book not found" }); 
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error while deleting book review" }); 
    }
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
