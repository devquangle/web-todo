import { login } from "./services/login.service.js";

const formLogin =
  document.getElementById("form_login");

const errorBox =
  document.getElementById("errorLoginFailed");

const statusBox =
  document.getElementById("statusBox");

const emailInput =
  document.getElementById("email");

const passwordInput =
  document.getElementById("password");

formLogin.addEventListener(
  "submit",
  function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();

    const password =
      passwordInput.value.trim();

    const result = login(email, password);

    if (result.success) {
      statusBox.style.display = "block";
      errorBox.style.display = "none";

      statusBox.innerHTML = result.message;
    } else {
      errorBox.style.display = "block";
      statusBox.style.display = "none";

      errorBox.innerHTML = result.message;
    }
  }
);