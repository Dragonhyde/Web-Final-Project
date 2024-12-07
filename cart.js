// Initialize cart in localStorage if not already present
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

// Add event listener to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const productElement = this.closest('.product-info');

        // Ensure productElement exists
        if (productElement) {
            const productName = productElement.querySelector('a')?.textContent?.trim();
            const productPrice = productElement.querySelector('p')?.textContent?.trim();

            // Ensure productName and productPrice are valid
            if (productName && productPrice) {
                const parsedPrice = productPrice.replace(/[^\d.]/g, ''); // Extract numerical price

                const cart = JSON.parse(localStorage.getItem('cart'));
                cart.push({ name: productName, price: `$${parseFloat(parsedPrice).toFixed(2)}` });
                localStorage.setItem('cart', JSON.stringify(cart));

                alert(`${productName} added to cart!`);
            } else {
                console.error('Product name or price not found.');
            }
        } else {
            console.error('Product element not found.');
        }
    });
});

// Redirect to checkout page on "Go to Cart" button click
const goToCartButton = document.querySelector('.Go-to-cart');
if (goToCartButton) {
    goToCartButton.addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });
} else {
    console.error('"Go to Cart" button not found.');
}
