document.addEventListener('DOMContentLoaded', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const shippingFee = 10.00;

    if (cartContainer) {
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

            const totalRow = document.createElement('div');
            totalRow.className = 'cart-total';
            totalRow.innerHTML = `
                <strong>Total:</strong>
                <span>$${(total + shippingFee).toFixed(2)}</span>
            `;
            cartContainer.appendChild(totalRow);

            totalPriceElement.textContent = `$${(total + shippingFee).toFixed(2)}`;
        }
    }

    cartContainer.addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains('remove-item')) {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            location.reload();
        }
    });

    document.getElementById('checkout-form').addEventListener('submit', function (e) {
        e.preventDefault();

        let valid = true;
        let errorMessages = [];

        const nameOnCardField = document.getElementById('name-on-card');
        const nameParts = nameOnCardField.value.trim().split(' ');
        if (nameParts.length < 2 || nameParts.some(part => part.length < 2)) {
            valid = false;
            errorMessages.push("Name on card must include a first and last name, each at least 2 characters long.");
        }

        const phoneField = document.getElementById('phone');
        let phone = phoneField.value.replace(/\D/g, "");

        if (phone.length !== 10) {
            valid = false;
            errorMessages.push("Phone number must be exactly 10 digits.");
        } else {
            phone = `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6, 10)}`;
            phoneField.value = phone;
        }

        const postalCodeField = document.getElementById('postal-code');
        let postalCode = postalCodeField.value.toUpperCase().replace(/\s+/g, "");
        const postalCodeRegex = /^[A-Z]\d[A-Z]\d[A-Z]\d$/;

        if (!postalCodeRegex.test(postalCode)) {
            valid = false;
            errorMessages.push("Postal code must follow the Canadian format (e.g., T2N 1N4).");
        } else {
            postalCode = `${postalCode.substring(0, 3)} ${postalCode.substring(3)}`;
            postalCodeField.value = postalCode;
        }

        const cardNumber = document.getElementById('card-number').value;
        if (!/^\d{16}$/.test(cardNumber)) {
            valid = false;
            errorMessages.push("Card number must be exactly 16 digits.");
        }

        const expiry = document.getElementById('expiry').value;
        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expiryRegex.test(expiry)) {
            valid = false;
            errorMessages.push("Expiry date must be in MM/YY format.");
        } else {
            const [month, year] = expiry.split('/').map(Number);
            const today = new Date();
            const expiryDate = new Date(`20${year}`, month - 1);
            if (expiryDate < today) {
                valid = false;
                errorMessages.push("Expiry date cannot be in the past.");
            }
        }

        const pin = document.getElementById('pin').value;
        if (!/^\d{3}$/.test(pin)) {
            valid = false;
            errorMessages.push("PIN must be exactly 3 digits.");
        }

        if (!valid) {
            alert(errorMessages.join("\n"));
        } else {
            alert("Checkout successful!");
            window.location.href = 'Thanks.html';
        }
    });

    document.getElementById('phone').addEventListener('input', function (e) {
        let phone = e.target.value.replace(/\D/g, "");

        if (phone.length > 10) {
            phone = phone.slice(0, 10);
        }

        if (phone.length <= 3) {
            e.target.value = `(${phone}`;
        } else if (phone.length <= 6) {
            e.target.value = `(${phone.substring(0, 3)}) ${phone.substring(3)}`;
        } else {
            e.target.value = `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6, 10)}`;
        }
    });

    document.getElementById('postal-code').addEventListener('input', function (e) {
        let postalCode = e.target.value.toUpperCase().replace(/\s+/g, "").slice(0, 6);
        if (postalCode.length >= 3) {
            postalCode = `${postalCode.substring(0, 3)} ${postalCode.substring(3)}`;
        }
        e.target.value = postalCode;
    });
});

