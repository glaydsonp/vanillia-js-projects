// variables
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = Number(movieSelect.value);
const buttonClearSelection = document.getElementById("clearSelection");

// functions
const updateSelectedCountAndTotal = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectedSeats.length;

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorageHelper("selectedSeats", seatsIndex);

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
};

const clearSelection = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  selectedSeats.forEach((item) => {
    item.className = "seat";
  });

  localStorage.removeItem("selectedMovie");
  localStorage.removeItem("selectedMoviePrice");
  localStorage.removeItem("selectedSeats");

  count.innerText = 0;
  total.innerText = 0;
};

const setMovieData = (movieIndex, moviePrice) => {
  localStorageHelper("selectedMovie", movieIndex);
  localStorageHelper("selectedMoviePrice", moviePrice);
};

const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovie");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }

  const selectedMoviePrice = localStorage.getItem("selectedMoviePrice");

  if (selectedMoviePrice) {
    ticketPrice = JSON.parse(selectedMoviePrice);
  }

  updateSelectedCountAndTotal();
};

const localStorageHelper = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// event listeners
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCountAndTotal();
  }
});

buttonClearSelection.addEventListener("click", (e) => {
  clearSelection();
});

movieSelect.addEventListener("change", (e) => {
  ticketPrice = Number(e.target.value);
  updateSelectedCountAndTotal();
  setMovieData(e.target.selectedIndex, e.target.value);
});

populateUI();
updateSelectedCountAndTotal();
