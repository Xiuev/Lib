console.log("HI");
let bookCardContainer = document.querySelector(".book-card-container");
//let bookTitle = document.querySelector(".book-title");
//let bookAuthor = document.querySelector(".author");
//let bookPages = document.querySelector(".pages");
//let bookIsRead = document.querySelector(".read");
let bookFourm = document.querySelector("#book-fourm");
let newBookBtn = document.querySelector(".bookBtn");
let bookTitleInput = document.querySelector("#book-title-input");
let bookAuthorInput = document.querySelector("#book-author-input");
let bookPagesInput = document.querySelector("#book-pages-input");
let bookIsReadInput = document.querySelector("#book-isRead-input");
let submitBtn = document.querySelector("#submitBtn");
let titleInputDiv = document.querySelector("#title-input-div");
let pagesInputDiv = document.querySelector("#pages-input-div");
let authorInputDiv = document.querySelector("#author-input-div");
let isReadInputDiv = document.querySelector("#isRead-input-div");
let isClicked = false;
const myLibrary = [];

newBookBtn.addEventListener("click", toggleFourm);
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.numOfPages = pages;
  this.isRead = isRead;
  this.uuid = self.crypto.randomUUID();
  this.info = function () {
    return `${this.title} by ${this.author} ${this.numOfPages} pages, ${isRead}, ${uuid}`;
  };
}

function addBookToLibrary(title, author, pages, isRead) {
  // take params, create a book then store it in the array
  let newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
}

function addBooksToDisplay(library) {
  for (let i = 0; i < library.length; i++) {
    bookTitle.textContent = library[i].title;
    bookAuthor.textContent = library[i].author;
    bookPages.textContent = library[i].numOfPages;
    bookIsRead.textContent = library[i].isRead;
    //console.log(library[i].title);
  }
}
//function to generate new bookCard based on arr size?
function generateBookCard() {
  //apply document.createlement here
  let bookCard = document.createElement("div"); //container for each card that will be created
  bookCard.classList.add("bookCard"); //css
  let bookCardTitle = document.createElement("h3");
  bookCardTitle.textContent = bookTitleInput.value;
  let bookCardAuthor = document.createElement("h2");
  bookCardAuthor.textContent = bookAuthorInput.value;
  let bookCardPages = document.createElement("p");
  bookCardPages.textContent = bookPagesInput.value;
  let bookCardIsRead = document.createElement("p");
  bookCardIsRead.textContent = bookIsReadInput.value;
  let removeBookBtn = document.createElement("button");
  removeBookBtn.textContent = "Delete Book";
  removeBookBtn.classList.add("delete-btn");
  //removeBookBtn.setAttribute("data-id", userBook.uuid);
  bookCardContainer.appendChild(bookCard);
  bookCard.appendChild(bookCardTitle);
  bookCard.appendChild(bookCardAuthor);
  bookCard.appendChild(bookCardPages);
  bookCard.appendChild(bookCardIsRead);
  bookCard.appendChild(removeBookBtn);
  console.log(removeBookBtn.getAttribute("data-id"));
}
//function to create new Book
function addNewBook(event) {
  event.preventDefault();
  validateBookForm(); //bookcard being generated in this function

  let userBook = new Book(
    bookTitleInput.value.trim(),
    bookAuthorInput.value.trim(),
    bookPagesInput.value.trim(),
    bookIsReadInput.value.trim()
  );

  //generateBookCard();
  myLibrary.push(userBook);
  console.log(myLibrary);
}
//function to create Fourm
function toggleFourm() {
  isClicked = !isClicked;
  if (isClicked === true) {
    bookFourm.style.display = "none";
  } else {
    bookFourm.style.display = "block";
  }
}
//form validation function
function validateBookForm() {
  bookTitle = bookTitleInput.value.trim();
  bookAuthor = bookAuthorInput.value.trim();
  bookPages = bookPagesInput.value.trim();
  isBookRead = bookIsReadInput.value.trim();
  let errorList = Array.from(document.querySelectorAll(".errorMsg"));
  for (let i = 0; i < errorList.length; i++) {
    errorList[i].remove();
  }

  let isValid = true;
  if (bookTitle === "" || bookTitle === null) {
    let errorMsg = document.createElement("p");
    errorMsg.textContent = "Enter valid book Title.";
    errorMsg.classList.add("errorMsg");
    titleInputDiv.appendChild(errorMsg);
    isValid = false;
  }

  if (bookAuthor === "" || bookAuthor === null) {
    let errorMsg = document.createElement("p");
    errorMsg.textContent = " Enter valid author";
    errorMsg.classList.add("errorMsg");
    authorInputDiv.appendChild(errorMsg);
    isValid = false;
  }

  if (bookPages === "" || bookPages === null) {
    let errorMsg = document.createElement("p");
    errorMsg.textContent = "Enter valid page ammount";
    errorMsg.classList.add("errorMsg");
    pagesInputDiv.appendChild(errorMsg);
    isValid = false;
  }

  if (isBookRead === "" || isBookRead === null) {
    //for yes/no convert string to lower + check if user enters either or
    let errorMsg = document.createElement("p");
    errorMsg.textContent = "Enter YES or NO";
    errorMsg.classList.add("errorMsg");
    isReadInputDiv.appendChild(errorMsg);
    isValid = false;
  }
  if (isValid) {
    generateBookCard();
  }
}
//function to remove book from the library
function removeBook() {
  for (let i = 0; i < myLibrary.length; i++) {}
}

//function calls
submitBtn.addEventListener("click", addNewBook);
addBooksToDisplay(myLibrary);
