document.addEventListener('DOMContentLoaded', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');

    if (cartContainer) { // Check if cart container exists
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            let total = 0;

            cart.forEach((item, index) => {
                const row = document.createElement('div');
                row.className = 'cart-item';

                row.innerHTML = `
                    <span>${item.name}</span>
                    <span>${item.price}</span>
                    <button class="remove-item" data-index="${index}">Remove</button>
                `;

                cartContainer.appendChild(row);
                total += parseFloat(item.price.replace('$', ''));
            });

            // Add total row
            const totalRow = document.createElement('div');
            totalRow.className = 'cart-total';
            totalRow.innerHTML = `
                <strong>Total:</strong>
                <span>$${total.toFixed(2)}</span>
            `;
            cartContainer.appendChild(totalRow);
        }
    }

    // Add remove functionality using event delegation
    cartContainer.addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains('remove-item')) {
            const index = e.target.dataset.index;
            cart.splice(index, 1); // Remove item from cart array
            localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
            location.reload(); // Reload the page to reflect changes
        }
    });
});

// Form validation and submission handling
document.getElementById('checkout-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission to handle custom validation

    let valid = true;
    let errorMessages = [];

    // Validate and format phone number
    const phoneField = document.getElementById('phone');
    let phone = phoneField.value.replace(/\D/g, "");  // Remove non-numeric characters

    if (phone.length !== 10) {
        valid = false;
        errorMessages.push("Phone number must be exactly 10 digits.");
    } else {
        phone = `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6, 10)}`;
        phoneField.value = phone; // Update field with formatted phone number
    }

    // Validate card number
    const cardNumber = document.getElementById('card-number').value;
    if (!/^\d{16}$/.test(cardNumber)) {
        valid = false;
        errorMessages.push("Card number must be exactly 16 digits.");
    }

    // Validate expiry date
    const expiry = document.getElementById('expiry').value;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // Matches MM/YY format
    if (!expiryRegex.test(expiry)) {
        valid = false;
        errorMessages.push("Expiry date must be in MM/YY format.");
    } else {
        const [month, year] = expiry.split('/').map(Number);
        const today = new Date();
        const expiryDate = new Date(`20${year}`, month - 1); // Convert to Date object
        if (expiryDate < today) {
            valid = false;
            errorMessages.push("Expiry date cannot be in the past.");
        }
    }

    // Validate PIN
    const pin = document.getElementById('pin').value;
    if (!/^\d{3}$/.test(pin)) {
        valid = false;
        errorMessages.push("PIN must be exactly 3 digits.");
    }

    // Display errors or proceed to Thank You page
    if (!valid) {
        alert(errorMessages.join("\n")); // Display all error messages
    } else {
        window.location.href = 'Thanks.html'; // Redirect on successful validation
    }
});

// Phone number auto-formatting while typing
document.getElementById('phone').addEventListener('input', function (e) {
    let phone = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

    // Limit to 10 digits
    if (phone.length > 10) {
        phone = phone.slice(0, 10);
    }

    // Format as (XXX) XXX-XXXX
    if (phone.length <= 3) {
        e.target.value = `(${phone}`;
    } else if (phone.length <= 6) {
        e.target.value = `(${phone.substring(0, 3)}) ${phone.substring(3)}`;
    } else {
        e.target.value = `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6, 10)}`;
    }
});




