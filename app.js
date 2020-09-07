const balanceUI = document.getElementById("balance");
const incomeUI = document.getElementById("money-plus");
const expenseUI = document.getElementById("money-minus");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const form = document.getElementById("form");
const list = document.getElementById("list");
const addTransactionBtn = document.getElementById("addTransactionBtn");
const updateTransactionBtn = document.getElementById("updateTransactionBtn");

///Ultimately we will store the transactions into local storage but for development purpose lets create an array with dummy transactions as below:

// const dummyTransactions = [
//   {
//     id: 1,
//     text: "Flower",
//     amount: -20,
//   },
//   {
//     id: 2,
//     text: "Salary",
//     amount: 1000,
//   },
//   {
//     id: 3,
//     text: "Project Work",
//     amount: 300,
//   },
//   {
//     id: 4,
//     text: "Book",
//     amount: -10,
//   },
//   {
//     id: 5,
//     text: "Camera",
//     amount: -150,
//   },
//   {
//     id: 6,
//     text: "Rent",
//     amount: -800,
//   },
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);
let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

//Add transaction function
function addTransaction(e) {
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please enter transaction text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
  e.preventDefault();
}

//Generate random id
function generateID() {
  return Math.floor(Math.random() * 1000000);
}
//Add transaction to DOM List
function addTransactionDOM(transaction) {
  ///Get the sign
  const sign = transaction.amount < 0 ? "-" : "+";

  //Create a list item element
  const item = document.createElement("li");

  //Add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
  <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  <button class="edit-btn" onclick="editTransaction(${
    transaction.id
  })">-</button>
  `;
  ///we are using Math.abs as we want just the absolute number without the + or - sign coming from the amount. The sign variable will provide the necessary sign and related colour
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

//Remove transaction by id
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id != id);
  updateLocalStorage();
  init();
}

//Edit Transactions
function editTransaction(id) {
  const transactionToEdit = transactions.filter(
    (transaction) => transaction.id === id
  );
  text.value = transactionToEdit[0].text;
  amount.value = transactionToEdit[0].amount;
  addTransactionBtn.style.display = "none";
  updateTransactionBtn.style.visibility = "visible";
  updateTransactionBtn.addEventListener("click", () => {
    const editedTransaction = {
      id: transactionToEdit[0].id,
      text: text.value,
      amount: +amount.value,
    };
    transactions = transactions.filter(
      (transaction) => transaction.id !== editedTransaction.id
    );
    transactions.push(editedTransaction);
    updateLocalStorage();
    init();
    text.value = "";
    amount.value = "";
    addTransactionBtn.style.display = "block";
    updateTransactionBtn.style.visibility = "hidden";
  });
}

//Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

//Init app
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

//Event Listener for Adding Transaction
form.addEventListener("submit", addTransaction);
