const currencyOne = document.getElementById("currency-one");
const amountOne = document.getElementById("amount-one");
const currencyTwo = document.getElementById("currency-two");
const amountTwo = document.getElementById("amount-two");
const rateElement = document.getElementById("rate");
const swap = document.getElementById("swap");

// functions
const calculate = () => {
  const currency_one = currencyOne.value;
  const currency_two = currencyTwo.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currency_two];
      rateElement.innerText = `1 ${currency_one} = ${rate.toFixed(
        2
      )} ${currency_two}`;
      amountTwo.value = (amountOne.value * rate).toFixed(2);
    });
};

// event listeners
currencyOne.addEventListener("change", calculate);
currencyTwo.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
amountTwo.addEventListener("input", calculate);
swap.addEventListener("click", () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculate();
});

calculate();
