// Ensure cart is initialized in localStorage
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

// Add event listeners to all "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        // Locate the closest product container
        const productElement = this.closest('.product-info');
        
        // Extract product name and price
        const productName = productElement.querySelector('h2').textContent;
        const productPrice = productElement.querySelector('p').textContent.replace('Price: ', '').trim();

        // Retrieve the cart from localStorage
        const cart = JSON.parse(localStorage.getItem('cart'));

        // Add the product to the cart
        cart.push({ name: productName, price: productPrice });

        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Notify the user
        alert(`${productName} has been added to your cart!`);
    });
});

// "Go to Cart" button redirects to the checkout page
document.querySelector('.Go-to-cart').addEventListener('click', () => {
    window.location.href = 'checkout.html';
});
