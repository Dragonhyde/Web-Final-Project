if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}


document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const productElement = this.closest('.product-info');
        const productName = productElement.querySelector('a').textContent;
        const productPrice = productElement.querySelector('p').textContent.replace('Price: ', '');
        
        
        const cart = JSON.parse(localStorage.getItem('cart'));
        cart.push({ name: productName, price: productPrice });
        localStorage.setItem('cart', JSON.stringify(cart));

        alert(`${productName} added to cart!`);
    });
});

// "Go to Cart" button redirects to checkout page
document.querySelector('.Go-to-cart').addEventListener('click', () => {
    window.location.href = 'checkout.html';
});