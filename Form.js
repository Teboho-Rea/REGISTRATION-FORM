// Function for displaying error messages
const showError = (element, message) => {
    const errorMessageSpan = element.parentElement.querySelector('.error-message');
    if (errorMessageSpan) {
        errorMessageSpan.textContent = message;
        element.classList.add('invalid');
    }
};

// Function for clearing error messages
const clearError = (element) => {
    const errorMessageSpan = element.parentElement.querySelector('.error-message');
    if (errorMessageSpan) {
        errorMessageSpan.textContent = '';
        element.classList.remove('invalid');
    }
};

// Function to validate the form
const validateForm = (event) => {
    const form = document.getElementById('registrationForm');
    const usernameInput = form.querySelector('#username');
    const passwordInput = form.querySelector('#password');
    const dobInput = form.querySelector('#dob');
    const ageInput = form.querySelector('#age');
    const countrySelect = form.querySelector('#country');
    const genderInputs = form.querySelectorAll('input[name="gender"]');

    let isValid = true;

    // Validate Username
    if (usernameInput.value.trim() === '') {
        showError(usernameInput, 'Username is required.');
        isValid = false;
    } else {
        clearError(usernameInput);
    }

    // Validate Password
    if (passwordInput.value.length < 8) {
        showError(passwordInput, 'Password must be at least 8 characters.');
        isValid = false;
    } else {
        clearError(passwordInput);
    }

    // Validate Date of Birth (Optional but good to include)
    if (dobInput.value === '') {
        // Not required for now, but a check can be added if needed
    }

    // Validate Age
    const age = parseInt(ageInput.value, 10);
    if (ageInput.value.trim() !== '' && (age < 18 || age > 120)) {
        showError(ageInput, 'Please enter a valid age between 18 and 120.');
        isValid = false;
    } else {
        clearError(ageInput);
    }
    
    // Validate Country
    if (countrySelect.value === '') {
        showError(countrySelect, 'Please select a country.');
        isValid = false;
    } else {
        clearError(countrySelect);
    }

    // Validate Gender
    const isGenderSelected = [...genderInputs].some(input => input.checked);
    const genderLegend = form.querySelector('legend');
    if (!isGenderSelected) {
        showError(genderLegend, 'Please select your gender.');
        isValid = false;
    } else {
        clearError(genderLegend);
    }

    // If validation fails, prevent form submission
    if (!isValid) {
        event.preventDefault();
        alert('Please fix the errors in the form.');
    } else {
        alert('Registration successful!');
    }
};

// Update the output for the range slider
const updateRangeOutput = () => {
    const rangeInput = document.getElementById('satisfaction');
    const output = document.querySelector('output[for="satisfaction"]');
    if (rangeInput && output) {
        output.textContent = rangeInput.value;
        rangeInput.addEventListener('input', () => {
            output.textContent = rangeInput.value;
        });
    }
};

// Add event listener for form submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', validateForm);
    
    // Call the function to set up range output
    updateRangeOutput();
});