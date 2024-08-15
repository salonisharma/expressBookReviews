const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const async_promise = express.Router();

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

// Get the book list available in the shop
//task 10
async_promise.get('/',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  console.log("in async");
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve("Promise resolved Task 10")
    },6000)})

    myPromise.then((successMessage) => {
        console.log("callback " + successMessage)
        res.send(JSON.stringify({books},null, 4));
    })

    /*try {
    const bookList = books; 
    res.json(bookList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while fetching books" });
  }*/
});

// Get book details based on ISBN
//task 11
async_promise.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  console.log("in async isbn");
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve("Promise resolved Task 11")
    },6000)})
    
    myPromise.then((successMessage) => {
        console.log("callback " + successMessage)
        const reqIsbn = req.params.isbn;
        const book = books[reqIsbn];
        if (book) {
            res.json(book);
        }

    })

    console.log("After calling promise Task 11");
  //return res.status(300).json({message: "Yet to be implemented"});
  /*try {
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
  }*/
 });
  
// Get book details based on author
//task 12
async_promise.get('/author/:author',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  console.log("in async author");
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve("Promise resolved Task 12")
    },6000)})

    myPromise.then((successMessage) => {
        console.log("callback " + successMessage);
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
        }
    });

  /*try {
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
  }*/
});

// Get all books based on title
//task 13
async_promise.get('/title/:title',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  console.log("in async title");
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve("Promise resolved Task 13")
    },6000)});

    myPromise.then((successMessage) => {
        console.log("callback " + successMessage);
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
        }
    });

  /*try {
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
  }*/
});

//  Get book review
//task 5
async_promise.get('/review/:isbn',function (req, res) {
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



//module.exports.general = public_users;
module.exports.asyncPromiseCalls = async_promise;
