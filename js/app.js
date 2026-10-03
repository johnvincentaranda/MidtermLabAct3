function isValidStudentNumber(value) {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  const regex = /^\d{2}-\d{4}-\d{3}$/;
  return regex.test(trimmed);
}

function isValidPassword(value) {
  if (typeof value !== 'string') return false;
  if (value.length < 8) return false;
  if (/\s/.test(value)) return false;
  const hasUpper = /[A-Z]/.test(value);
  const hasDigit = /\d/.test(value);
  const hasSymbol = /[@$!]/.test(value);
  return hasUpper && hasDigit && hasSymbol;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { isValidStudentNumber, isValidPassword };
}

if (typeof document !== 'undefined') {
  const form = document.getElementById('registrationForm');
  const fullName = document.getElementById('fullName');
  const studentNumber = document.getElementById('studentNumber');
  const email = document.getElementById('email');
  const mobileNumber = document.getElementById('mobileNumber');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const course = document.getElementById('course');
  const terms = document.getElementById('terms');

  const fullNameError = document.getElementById('fullNameError');
  const studentNumberError = document.getElementById('studentNumberError');
  const emailError = document.getElementById('emailError');
  const mobileNumberError = document.getElementById('mobileNumberError');
  const passwordError = document.getElementById('passwordError');
  const confirmPasswordError = document.getElementById('confirmPasswordError');
  const courseError = document.getElementById('courseError');
  const termsError = document.getElementById('termsError');

  const passwordFeedback = document.getElementById('passwordFeedback');
  const successMessage = document.getElementById('successMessage');
  const registrationSummary = document.getElementById('registrationSummary');

  const summaryName = document.getElementById('summaryName');
  const summaryStudentNumber = document.getElementById('summaryStudentNumber');
  const summaryEmail = document.getElementById('summaryEmail');
  const summaryMobileNumber = document.getElementById('summaryMobileNumber');
  const summaryCourse = document.getElementById('summaryCourse');

  function setError(input, errorEl, message) {
    errorEl.textContent = message;
    if (input) input.setAttribute('aria-invalid', 'true');
  }
  function clearError(input, errorEl) {
    errorEl.textContent = '';
    if (input) input.setAttribute('aria-invalid', 'false');
  }

  function validateFullName() {
    const trimmed = fullName.value.trim();
    if (trimmed.length === 0) {
      setError(fullName, fullNameError, 'Full name is required.');
      return false;
    }
    if (trimmed.length < 2) {
      setError(fullName, fullNameError, 'Full name must be at least 2 characters.');
      return false;
    }
    clearError(fullName, fullNameError);
    return true;
  }

  function validateStudentNumber() {
    const trimmed = studentNumber.value.trim();
    if (trimmed.length === 0) {
      setError(studentNumber, studentNumberError, 'Student number is required.');
      return false;
    }
    if (!isValidStudentNumber(trimmed)) {
      setError(studentNumber, studentNumberError, 'Enter a student number in the format 24-1234-123.');
      return false;
    }
    clearError(studentNumber, studentNumberError);
    return true;
  }

  function validateEmail() {
    const trimmed = email.value.trim();
    if (trimmed.length === 0) {
      setError(email, emailError, 'Email is required.');
      return false;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(trimmed)) {
      setError(email, emailError, 'Enter a valid email address.');
      return false;
    }
    clearError(email, emailError);
    return true;
  }

  function validateMobile() {
    const trimmed = mobileNumber.value.trim();
    if (trimmed.length === 0) {
      setError(mobileNumber, mobileNumberError, 'Mobile number is required.');
      return false;
    }
    const regex = /^(09\d{9}|\+639\d{9})$/;
    if (!regex.test(trimmed)) {
      setError(mobileNumber, mobileNumberError, 'Enter a valid mobile number: 09 followed by 9 digits or +639 followed by 9 digits.');
      return false;
    }
    clearError(mobileNumber, mobileNumberError);
    return true;
  }

  function validatePasswordField() {
    const val = password.value;
    if (val.length === 0) {
      setError(password, passwordError, 'Password is required.');
      return false;
    }
    if (!isValidPassword(val)) {
      setError(password, passwordError, 'Password must be at least 8 characters, include one uppercase letter, one digit, and one of @, $, or !, with no spaces.');
      return false;
    }
    clearError(password, passwordError);
    return true;
  }

  function validateConfirmPassword() {
    if (confirmPassword.value.length === 0) {
      setError(confirmPassword, confirmPasswordError, 'Confirm password is required.');
      return false;
    }
    if (confirmPassword.value !== password.value) {
      setError(confirmPassword, confirmPasswordError, 'Passwords do not match.');
      return false;
    }
    clearError(confirmPassword, confirmPasswordError);
    return true;
  }

  function validateCourse() {
    const val = course.value;
    if (val !== 'BSIT' && val !== 'BSCS') {
      setError(course, courseError, 'Please select a course.');
      return false;
    }
    clearError(course, courseError);
    return true;
  }

  function validateTerms() {
    if (!terms.checked) {
      setError(terms, termsError, 'You must agree to the terms.');
      return false;
    }
    clearError(terms, termsError);
    return true;
  }

  function updatePasswordFeedback() {
    const val = password.value;
    if (val.length === 0) {
      passwordFeedback.textContent = '';
      return;
    }
    let msgs = [];
    if (val.length < 8) msgs.push('At least 8 characters');
    if (!/[A-Z]/.test(val)) msgs.push('One uppercase letter');
    if (!/\d/.test(val)) msgs.push('One digit');
    if (!/[@$!]/.test(val)) msgs.push('One symbol @, $, or !');
    if (/\s/.test(val)) msgs.push('No spaces allowed');
    if (msgs.length === 0) {
      passwordFeedback.textContent = 'Password meets all requirements.';
    } else {
      passwordFeedback.textContent = 'Missing: ' + msgs.join(', ') + '.';
    }
  }

  fullName.addEventListener('blur', validateFullName);
  password.addEventListener('input', () => {
    updatePasswordFeedback();
    if (passwordError.textContent) validatePasswordField();
    if (confirmPassword.value) validateConfirmPassword();
  });
  course.addEventListener('change', validateCourse);
  terms.addEventListener('change', validateTerms);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    successMessage.textContent = '';
    registrationSummary.hidden = true;

    const v1 = validateFullName();
    const v2 = validateStudentNumber();
    const v3 = validateEmail();
    const v4 = validateMobile();
    const v5 = validatePasswordField();
    const v6 = validateConfirmPassword();
    const v7 = validateCourse();
    const v8 = validateTerms();

    if (v1 && v2 && v3 && v4 && v5 && v6 && v7 && v8) {
      successMessage.textContent = 'Registration details validated successfully!';
      summaryName.textContent = fullName.value.trim();
      summaryStudentNumber.textContent = studentNumber.value.trim();
      summaryEmail.textContent = email.value.trim();
      summaryMobileNumber.textContent = mobileNumber.value.trim();
      summaryCourse.textContent = course.value;
      registrationSummary.hidden = false;
    }
  });

  form.addEventListener('reset', () => {
    setTimeout(() => {
      clearError(fullName, fullNameError);
      clearError(studentNumber, studentNumberError);
      clearError(email, emailError);
      clearError(mobileNumber, mobileNumberError);
      clearError(password, passwordError);
      clearError(confirmPassword, confirmPasswordError);
      clearError(course, courseError);
      clearError(terms, termsError);
      passwordFeedback.textContent = '';
      successMessage.textContent = '';
      registrationSummary.hidden = true;
      summaryName.textContent = '';
      summaryStudentNumber.textContent = '';
      summaryEmail.textContent = '';
      summaryMobileNumber.textContent = '';
      summaryCourse.textContent = '';
      fullName.setAttribute('aria-invalid', 'false');
      studentNumber.setAttribute('aria-invalid', 'false');
      email.setAttribute('aria-invalid', 'false');
      mobileNumber.setAttribute('aria-invalid', 'false');
      password.setAttribute('aria-invalid', 'false');
      confirmPassword.setAttribute('aria-invalid', 'false');
      course.setAttribute('aria-invalid', 'false');
    }, 0);
  });
}
