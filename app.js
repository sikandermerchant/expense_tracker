const balance = document.getElementById("balance");
const income = document.getElementById("money-plus");
const expense = document.getElementById("money-minus");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const form = document.getElementById("form");
const list = document.getElementById("list");

///Ultimately we will store the transactions into local storage but for development purpose lets create an array with dummy transactions as below:

const dummyTransactions = [
  {
    id: 1,
    text: "Flower",
    amount: -20,
  },
  {
    id: 2,
    text: "Salary",
    amount: 1000,
  },
  {
    id: 3,
    text: "Book",
    amount: -10,
  },
  {
    id: 4,
    text: "Camera",
    amount: -150,
  },
];

let transactions = dummyTransactions;
//Add transaction to DOM List
function addTransactionDOM(transaction) {
  ///Get the sign
  const sign = transaction.amount < 0 ? "-" : "+";

  //Create a list item element
  const item = document.createElement("li");

  //Add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn">x</button>
  `;
  ///we are using Math.abs as we want just the absolute number without the + or - sign coming from the amount. The sign varaible will provide the necessary sign and related colour
  list.appendChild(item);
}

//Init app
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
}

init();
