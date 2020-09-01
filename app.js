const balanceUI = document.getElementById("balance");
const incomeUI = document.getElementById("money-plus");
const expenseUI = document.getElementById("money-minus");
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
    text: "Project Work",
    amount: 300,
  },
  {
    id: 4,
    text: "Book",
    amount: -10,
  },
  {
    id: 5,
    text: "Camera",
    amount: -150,
  },
  {
    id: 6,
    text: "Rent",
    amount: -800,
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

//Update balance, income and expense function
function updateValues() {
  //Create an array with just the amounts of each transaction using map method
  const amounts = transactions.map((transaction) => transaction.amount);

  ///Calculate totals using reduce method
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const total = amounts.reduce(reducer, 0).toFixed(2);

  //Calculate income
  const income = amounts
    .filter((item) => item > 0)
    .reduce(reducer, 0)
    .toFixed(2);

  //Calculate expense
  const expense =
    amounts
      .filter((item) => item < 0)
      .reduce(reducer, 0)
      .toFixed(2) * -1;

  //Display amount income and expense on the DOM
  balanceUI.innerText = `£${total}`;
  incomeUI.innerText = `£${income}`;
  expenseUI.innerText = `£${expense}`;
}
//Init app
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();
