if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        // Locate the closest product container
        const productElement = this.closest('.product-info');
        
    
        const productName = productElement.querySelector('h2').textContent;
        const productPrice = productElement.querySelector('p').textContent.replace('Price: ', '').trim();

      
        const cart = JSON.parse(localStorage.getItem('cart'));

      
        cart.push({ name: productName, price: productPrice });

      
        localStorage.setItem('cart', JSON.stringify(cart));

   
        alert(`${productName} has been added to your cart!`);
    });
});


document.querySelector('.Go-to-cart').addEventListener('click', () => {
    window.location.href = 'checkout.html';
});
