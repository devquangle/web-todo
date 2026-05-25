export const users = [
  {
    email: "admin@gmail.com",
    password: "admin123",
    status: true,
  },
];
export function getFailedLoginCount() {
  const count = localStorage.getItem("failedLoginCount");
  return count ? parseInt(count) : 0;
}
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



  if (!emailRegex.test(email)) {
    return "Invalid email.";
  }

  return "";
}

export function validatePassword(password) {
  if (!password) {
    return "Password is required.";
  }

  if (password.length < 6) {
    return "Password min 6 characters.";
  }

  return "";
}

export function loginService(email, password) {
  const emailError = validateEmail(email);

  if (emailError) {
    return {
      success: false,
      message: emailError,
    };
  }

  const passwordError =
    validatePassword(password);

  if (passwordError) {
    return {
      success: false,
      message: passwordError,
    };
  }

  const user = users.find(
    (u) =>
      u.email === email &&
      u.password === password &&
      u.status
  );

  if (!user) {
    return {
      success: false,
      message: "Invalid account.",
    };
  }

  return {
    success: true,
    message: "Login success.",
  };
}