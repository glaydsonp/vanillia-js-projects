const toggleButton = document.getElementById("toggle");
const closeButton = document.getElementById("close");
const openButton = document.getElementById("open");
const modal = document.getElementById("modal");

// Toggle navigation
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
});

// Show modal
openButton.addEventListener("click", (event) => {
  modal.classList.add("show-modal");
});

closeButton.addEventListener("click", (event) => {
  modal.classList.remove("show-modal");
});

// Hide modal on outside click
window.addEventListener("click", (event) => {
  return event.target == modal ? modal.classList.remove("show-modal") : false;
});
