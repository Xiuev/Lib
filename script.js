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
//let isRead = false;
let myLibrary = [];

newBookBtn.addEventListener("click", toggleFourm);
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.numOfPages = pages;
  this.isRead = isRead;
  this.uuid = self.crypto.randomUUID();
  this.info = function () {
    return `${this.title} by ${this.author} ${this.numOfPages} pages, ${this.isRead}, ${this.uuid}`;
  };
}
//book protoype
Book.prototype.toggleReadStatus = function () {
  //toggle isRead status
  if (this.isRead) {
    this.isRead = false;
  } else {
    this.isRead = true;
  }
};
//function to generate new bookCard based on arr size?
function generateBookCard(userBook) {
  //apply document.createlement here
  let bookCard = document.createElement("div"); //container for each card that will be created
  bookCard.classList.add("bookCard"); //css
  let bookCardTitle = document.createElement("h3");
  bookCardTitle.textContent = userBook.title;
  let bookCardAuthor = document.createElement("h2");
  bookCardAuthor.textContent = userBook.author;
  let bookCardPages = document.createElement("p");
  bookCardPages.textContent = userBook.numOfPages;
  let bookCardIsRead = document.createElement("p");
  bookCardIsRead.textContent = userBook.isRead ? "yes" : "no";
  let removeBookBtn = document.createElement("button");
  let changeReadStatusBtn = document.createElement("button");
  changeReadStatusBtn.textContent = "Read Status";
  changeReadStatusBtn.classList.add("change-read-status");
  changeReadStatusBtn.setAttribute("data-id", userBook.uuid);
  removeBookBtn.textContent = "Delete Book";
  removeBookBtn.classList.add("delete-btn");
  removeBookBtn.setAttribute("data-id", userBook.uuid);
  console.log(removeBookBtn.getAttribute("data-id"));
  console.log(
    `Read status button unique id is: ${changeReadStatusBtn.getAttribute(
      "data-id"
    )}`
  );
  bookCardContainer.appendChild(bookCard);
  bookCard.appendChild(bookCardTitle);
  bookCard.appendChild(bookCardAuthor);
  bookCard.appendChild(bookCardPages);
  bookCard.appendChild(bookCardIsRead);
  bookCard.appendChild(removeBookBtn);
  bookCard.appendChild(changeReadStatusBtn);

  changeReadStatusBtn.addEventListener("click", function () {
    //identify correct book instance
    for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].uuid === changeReadStatusBtn.getAttribute("data-id")) {
        myLibrary[i].toggleReadStatus();
        bookCardIsRead.textContent = userBook.isRead ? "yes" : "no";
        console.log(myLibrary);
      }
    }
  });

  removeBookBtn.addEventListener("click", function () {
    //let filteredBooks return new array EXCLUDING deleted books
    let filteredBooks = myLibrary.filter(
      (book) => book.uuid !== removeBookBtn.getAttribute("data-id")
    );
    myLibrary = filteredBooks;
    console.log(myLibrary);
    bookCardContainer.innerHTML = "";
    myLibrary.forEach((book) => generateBookCard(book));
  });
}
//function to create new Book
function addNewBook(event) {
  event.preventDefault();
  let cleanReadInput = bookIsReadInput.value.toLowerCase();
  if (cleanReadInput === "yes") {
    cleanReadInput = true;
  } else {
    cleanReadInput = false;
  }
  let userBook = new Book(
    bookTitleInput.value.trim().toLowerCase(),
    bookAuthorInput.value.trim().toLowerCase(),
    parseInt(bookPagesInput.value.trim()),
    cleanReadInput
  );
  if (validateBookForm()) {
    myLibrary.push(userBook);
    console.log(myLibrary);
    generateBookCard(userBook);
  }
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
    return true;
  }
}
//function to remove book from the library
function deleteBook() {
  // if running into scope issues try passing obj,parameter thigny
}

//function calls
submitBtn.addEventListener("click", addNewBook);
