const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// functions
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = "form-control error";

  const errorMessageElement = formControl.querySelector("small");
  errorMessageElement.innerText = message;
};

const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// check required fields
const checkRequired = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required.`);
    } else {
      showSuccess(input);
    }
  });
};

const checkLenght = (input, minLength, maxLength) => {
  if (input.value.length < minLength) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${minLength} characters.`
    );
  } else if (input.value.length > maxLength) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${maxLength} characters.`
    );
  } else {
    showSuccess(input);
  }
};

const checkEmail = (input) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid.");
  }
};

const checkPasswordsMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match.");
  } else {
    showSuccess(input2);
  }
};

// event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLenght(username, 3, 15);
  checkLenght(password, 6, 15);
  checkEmail(email);
  checkPasswordsMatch(password, password2);

  // if (username.value === '') {
  //     showError(username, 'Username is required.');
  // } else {
  //     showSuccess(username);
  // }
  // if (email.value === '') {
  //     showError(email, 'Email is required.');
  // } else if (!checkEmail(email.value)) {
  //     showError(email, 'Email is not valid.');
  // } else {
  //     showSuccess(email);
  // }
  // if (password.value === '') {
  //     showError(password, 'Password is required.');
  // } else {
  //     showSuccess(password);
  // }
  // if (password2.value === '') {
  //     showError(password2, 'Password is required.');
  // } else if (password.value !== password2.value) {
  //     showError(password2, 'The passwords does not match.')
  // } else {
  //     showSuccess(password2);
  // }
});
