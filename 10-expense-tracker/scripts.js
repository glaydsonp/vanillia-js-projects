// dom elements
const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// dummy data
const dummyTransactions = [
  { id: 1, text: "Flower", amount: -20 },
  { id: 2, text: "Salary", amount: 300 },
  { id: 3, text: "Book", amount: -10 },
  { id: 4, text: "Camera", amount: 150 },
  { id: 5, text: "Internet Bill", amount: -50 },
];

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

// variables
let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// functions
const init = () => {
  list.innerHTML = "";

  transactions.forEach((transaction) => {
    addTransaction(transaction);
  });

  updateBalance();
};

const addTransaction = (transaction) => {
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  item.innerHTML = `${transaction.text} <span> ${sign}$${Math.abs(
    transaction.amount
  )} <button class="delete-btn" onclick="removeTransactionById(${
    transaction.id
  })">X</button></span>`;
  list.appendChild(item);
};

const updateBalance = () => {
  const amounts = transactions.map((transaction) => transaction.amount);
  let income = `0.00`;
  let expense = `0.00`;
  let total = `0.00`;

  if (amounts && amounts.length > 0) {
    total = amounts.reduce((acc, amount) => (acc += amount)).toFixed(2);

    const incomeFiltered = amounts.filter((amount) => amount > 0);
    if (incomeFiltered && incomeFiltered.length > 0) {
      income = incomeFiltered
        .reduce((acc, amount) => (acc += amount))
        .toFixed(2);
    }

    expenseFiltered = amounts.filter((amount) => amount < 0);

    if (expenseFiltered && expenseFiltered.length > 0) {
      expense = (
        expenseFiltered.reduce((acc, amount) => (acc += amount)) * -1
      ).toFixed(2);
    }
  }

  balance.innerHTML = `$${total}`;
  moneyPlus.innerHTML = `$${income}`;
  moneyMinus.innerHTML = `$${expense}`;
};

const addTransactionFromForm = (formEvent) => {
  formEvent.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount.");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: Number(amount.value),
    };

    transactions.push(transaction);
    addTransaction(transaction);
    updateBalance();
    updateLocalStorageTransactions();
    clearFields();
  }
};

const removeTransactionById = (transactionId) => {
  transactions = transactions.filter((item) => item.id !== transactionId);
  init();
  updateLocalStorageTransactions();
};

const generateID = () => {
  return Math.floor(Math.random() * 1000000000);
};

const clearFields = () => {
  text.value = "";
  amount.value = "";
};

const updateLocalStorageTransactions = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};
// event listeners
form.addEventListener("submit", addTransactionFromForm);

// init app
init();
