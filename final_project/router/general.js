const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesUserExist = (username)=>{
    let usersamename = users.filter((user)=>{
      return user.username === username
    });
    if(usersamename.length > 0){
      return true;
    } else {
      return false;
    }
  }

// User registeration
//task 6
public_users.post("/register", (req,res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const username = req.params.username;
  const password = req.params.password;
  console.log(req);
console.log(req.params.username);
console.log(req.query.username);
console.log(req.body.username);
  if (username && password) {
    if (!doesUserExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Try loggin in now."});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Error while registering user"});
});

// Get the book list available in the shop
//task 1
public_users.get('/',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
    try {
    const bookList = books; 
    res.json(bookList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while fetching books" });
  }
});

// Get book details based on ISBN
//task 2
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  try {
    const reqIsbn = req.params.isbn;
    const book = books[reqIsbn];
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "Book not found. Try different book." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while fetching book details" });
  }
 });
  
// Get book details based on author
//task 3
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  try {
    const reqAuthor = req.params.author;
    const booksByAuthor = [];

    const bookKeys = Object.keys(books);
    for (const b of bookKeys) {
      const book = books[b];
      if (book.author === reqAuthor) {
        booksByAuthor.push(book);
      }
    }

    if (booksByAuthor.length > 0) {
      res.json(booksByAuthor); 
    } else {
      res.status(404).json({ message: "No books found for searched author" }); 
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while fetching books" }); 
  }
});

// Get all books based on title
//task 4
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  try {
    const reqTitle = req.params.title;
    const booksByTitle = [];
    const bookKeys = Object.keys(books);

    for (const key of bookKeys) {
      const book = books[key];
      if (book.title.toLowerCase() === reqTitle.toLowerCase()) { 
        booksByTitle.push(book);
      }
    }

    if (booksByTitle.length > 0) {
      res.json(booksByTitle);
    } else {
      res.status(404).json({ message: "No books found for searched title" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while fetching books" }); 
  }
});

//  Get book review
//task 5
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  try {
    const reqIsbn = req.params.isbn; 
    const book = books[reqIsbn];

    if (book) {
      const reviews = book.reviews;
      res.json(reviews); 
    } else {
      res.status(404).json({ message: "Book not found. Try a different one." }); 
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while fetching reviews" }); 
  }
});

module.exports.general = public_users;
