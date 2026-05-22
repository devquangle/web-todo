const formLogin = document.getElementById("form_login");
const errorBox = document.getElementById("errorBox");
const statusBox = document.getElementById("statusBox");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const rememberInput = document.getElementById("remember");

//check if email and password are filled out, if not return error message, if email and password are correct return success message, if email and password are incorrect return error message



function login(email, password) {
  if (!email || !password) {
    return {
      success: false,
      message: "Email and password must be filled out!",
    };
  }

  if (email === "admin@gmail.com" && password === "admin123") {
    return {
      success: true,
      message: "Login successful!",
    };
  }

  return {
    success: false,
    message: "Invalid email or password!",
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
    alert(result.message);
  } else {
    alert(result.message);
  }
});
