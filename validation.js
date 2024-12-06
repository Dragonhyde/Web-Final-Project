document.getElementById('checkout-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form from submitting immediately to handle validation

    let valid = true;
    let errorMessage = "";

    // Validate and format phone number
    const phoneField = document.getElementById('phone');
    let phone = phoneField.value.replace(/\D/g, "");  // Remove all non-numeric characters

    // Check if phone number is exactly 10 digits long
    if (phone.length !== 10) {
        valid = false;
        errorMessage += "Phone number must be exactly 10 digits long.\n";
    } else {
        // Format the phone number as (XXX) XXX-XXXX
        phone = `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6, 10)}`;
        phoneField.value = phone;  // Update the field with formatted phone number
    }

    // Validate card number
    const cardNumber = document.getElementById('card-number').value;
    const cardRegex = /^\d{16}$/;
    if (!cardRegex.test(cardNumber)) {
        valid = false;
        errorMessage += "Card number must be 16 digits.\n";
    }

    // Validate expiry date
    const expiry = document.getElementById('expiry').value;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // Matches MM/YY format
    if (!expiryRegex.test(expiry)) {
        valid = false;
        errorMessage += "Expiry date must be in MM/YY format.\n";
    } else {
        const [month, year] = expiry.split('/').map(Number);
        const today = new Date();
        const expiryDate = new Date(`20${year}`, month - 1);
        if (expiryDate < today) {
            valid = false;
            errorMessage += "Expiry date cannot be in the past.\n";
        }
    }

    // Validate PIN
    const pin = document.getElementById('pin').value;
    const pinRegex = /^\d{3}$/;
    if (!pinRegex.test(pin)) {
        valid = false;
        errorMessage += "PIN must be exactly 3 digits.\n";
    }

    if (!valid) {
        alert(errorMessage); // Show error message if validation fails
    } else {
        // Redirect to Thank You page after form is validated
        window.location.href = 'Thanks.html'; // Redirect to the thank you page
    }
});

// Phone number auto-formatting while typing (format as (XXX) XXX-XXXX)
document.getElementById('phone').addEventListener('input', function (e) {
    let phone = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

    // Limit to 10 digits
    if (phone.length > 10) {
        phone = phone.slice(0, 10);
    }

    // Format the phone number as (XXX) XXX-XXXX
    if (phone.length <= 3) {
        e.target.value = `(${phone}`;
    } else if (phone.length <= 6) {
        e.target.value = `(${phone.substring(0, 3)}) ${phone.substring(3)}`;
    } else {
        e.target.value = `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6, 10)}`;
    }
});

