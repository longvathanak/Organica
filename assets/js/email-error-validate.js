function validateForm(form) {
  const emailInput = form.querySelector('input[name="email"]');
  const submitButton = form.querySelector('button[type="submit"]');
  const errorMessage = form.querySelector('.error-message');

  emailInput.addEventListener('input', () => {
    if (!isValidEmail(emailInput.value)) {
      emailInput.classList.add('is-invalid');
      submitButton.disabled = true;
      showErrorMessage(errorMessage, 'Please enter a valid email address.');
    } else {
      emailInput.classList.remove('is-invalid');
      submitButton.disabled = false;
      hideErrorMessage(errorMessage);
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (isValidEmail(emailInput.value)) {
      // Submit the form
      console.log('Form submitted successfully!');
    } else {
      emailInput.classList.add('is-invalid');
      emailInput.classList.add('shake');
      setTimeout(() => {
        emailInput.classList.remove('shake');
      }, 500);
      showErrorMessage(errorMessage, 'Please enter a valid email address.');
    }
  });
}

function isValidEmail(email) {
  // Add your email validation logic here
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

function showErrorMessage(errorMessage, message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
  errorMessage.style.opacity = '0';
  errorMessage.animate([
    { opacity: 0 },
    { opacity: 1 }
  ], {
    duration: 300,
    easing: 'ease-in-out'
  });
}

function hideErrorMessage(errorMessage) {
  errorMessage.animate([
    { opacity: 1 },
    { opacity: 0 }
  ], {
    duration: 300,
    easing: 'ease-in-out',
    fill: 'forwards'
  }).onfinish = () => {
    errorMessage.style.display = 'none';
  };
}

// Apply the validateForm function to both forms
const footerForm = document.querySelector('.footer-form');
const newsletterForm = document.querySelector('.newsletter-form');

validateForm(footerForm);
validateForm(newsletterForm);
