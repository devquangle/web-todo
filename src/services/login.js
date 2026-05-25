const formLogin = document.getElementById("form_login");
const errorBox = document.getElementById("errorLoginFailed");
const statusBox = document.getElementById("statusBox");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const rememberInput = document.getElementById("remember");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

let countFailedLogin = Number(
  localStorage.getItem("countFailedLogin")
) || 0;

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function validateLogin(email, password) {
  let isValid = true;

  if (!validateEmail(email)) {
    emailError.textContent = "Please enter a valid email.";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  if (!validatePassword(password)) {
    passwordError.textContent =
      "Password must be at least 6 characters long.";
    isValid = false;
  } else {
    passwordError.textContent = "";
  }

  if(email === "admin@gamil.com" && password === "admin123") {
    return isValid;
  }

  return isValid;
}

function login(email, password) {
  let isValid = validateLogin(email, password);

  if (!isValid) {
    // tăng số lần fail
    countFailedLogin++;

    // lưu localStorage
    localStorage.setItem(
      "countFailedLogin",
      countFailedLogin
    );

    return {
      success: false,
      message: "Please fix the errors above.",
    };
  }

  return {
    success: true,
    message: "Login successful!",
  };
}

formLogin.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const remember = rememberInput.checked;

  console.log("Remember:", remember);

  const result = login(email, password);

  if (result.success) {
    errorBox.style.display = "none";
    statusBox.style.display = "block";

    localStorage.setItem("countFailedLogin", 0);
  } else {
    errorBox.style.display = "block";
    statusBox.style.display = "none";

    // hiện số lần fail
    errorBox.innerHTML = `
      <strong>Error:</strong>
      Invalid email or password <br/>
      Failed login count: ${countFailedLogin}
    `;
  }
});