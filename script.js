console.log("HI");
let bookCardContainer = document.querySelector("#book-card-container");
let bookTitle = document.querySelector("#book-title");
let bookAuthor = document.querySelector("#author");
let bookPages = document.querySelector("#pages");
let bookIsRead = document.querySelector("#read");
const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.numOfPages = pages;
  this.isRead = isRead;
  let uuid = self.crypto.randomUUID();
  this.info = function () {
    return `${this.title} by ${this.author} ${this.numOfPages} pages, ${isRead}, ${uuid}`;
  };
}

//const bleach = new Book("bleach", "Kubo", 100, true);
//addBookToLibrary("bleach", "Kubo", 100, true);
//addBookToLibrary("JJK", "GEGE", 287, true);

function addBookToLibrary(title, author, pages, isRead) {
  // take params, create a book then store it in the array
  let newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
}

function addBookToDisplay() {}
