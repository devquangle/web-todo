// ==========================
// Fake Database
// ==========================
export const users = [
  {
    email: "admin@gmail.com",
    password: "admin123",
    status: true,
  },
  {
    email: "admin2@gmail.com",
    password: "admin123",
    status: false,
  },
];

// ==========================
// Failed Login Count
// ==========================
export function getFailedLoginCount() {
  const count = localStorage.getItem(
    "failedLoginCount"
  );

  return count ? parseInt(count) : 0;
}

export function setFailedLoginCount(
  count
) {
  localStorage.setItem(
    "failedLoginCount",
    count
  );
}

export function increaseFailedLoginCount() {
  const currentCount =
    getFailedLoginCount();

  setFailedLoginCount(currentCount + 1);
}

export function resetFailedLoginCount() {
  setFailedLoginCount(0);
}

// ==========================
// Validate Email
// ==========================
export function validateEmail(email) {
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return "Email is required.";
  }

  if (!emailRegex.test(email)) {
    return "Invalid email.";
  }

  return "";
}

// ==========================
// Validate Password
// ==========================
export function validatePassword(
  password
) {
  if (!password) {
    return "Password is required.";
  }

  if (password.length < 6) {
    return "Password min 6 characters.";
  }

  return "";
}

// ==========================
// Login Service
// ==========================
export function loginService(
  email,
  password
) {
  // validate all fields
  const emailError =
    validateEmail(email);

  const passwordError =
    validatePassword(password);

  // return all field errors
  if (emailError || passwordError) {
    increaseFailedLoginCount();

    return {
      success: false,
      errors: {
        email: emailError,
        password: passwordError,
      },
      message: "Validation failed.",
    };
  }

  // check account
  const user = users.find(
    (u) =>
      u.email === email &&
      u.password === password
  );

  if (!user) {
    increaseFailedLoginCount();

    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  // check status
  if (!user.status) {
    increaseFailedLoginCount();

    return {
      success: false,
      message: "Account disabled.",
    };
  }

  // success
  resetFailedLoginCount();

  return {
    success: true,
    message: "Login success.",
  };
}