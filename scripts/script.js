let cart = [];

function addToCart(name, price) {
    let product = cart.find(item => item.name === name);
    if (product) {
        product.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
    showPopup(name);
}

function updateCart() {
    let cartIcon = document.getElementById('cart-count');
    let cartList = document.getElementById('cart-items');
    let cartTotal = document.getElementById('cart-total');
    let cartContainer = document.getElementById('cart-container');
    
    cartIcon.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartList.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        let li = document.createElement('li');
        li.textContent = `${item.name} x${item.quantity} - €${(item.price * item.quantity).toFixed(2)}`;
        cartList.appendChild(li);
    });
    cartTotal.textContent = `Totaal: €${total.toFixed(2)}`;
    cartContainer.style.display = cart.length > 0 ? 'block' : 'none';
}

function placeOrder() {
    if (cart.length === 0) {
        alert('Uw winkelwagen is leeg!');
        return;
    }
    openOrderForm();
}

function openOrderForm() {
    document.getElementById('order-form-modal').style.display = 'block';
}

function closeOrderForm() {
    document.getElementById('order-form-modal').style.display = 'none';
}

function submitOrder(event) {
    event.preventDefault();
    alert('Bestelling verzonden! We nemen binnenkort contact met u op.');
    cart = [];
    updateCart();
    closeOrderForm();
    closeCart();
}

function showPopup(name) {
    let popup = document.getElementById('cart-popup');
    popup.textContent = `${name} is toegevoegd aan uw winkelwagen!`;
    popup.classList.add('show');
    setTimeout(() => {
        popup.classList.remove('show');
    }, 2000);
}

function openCart() {
    document.getElementById('cart-modal').style.display = 'block';
}

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const name = this.getAttribute('data-name');
        const price = parseFloat(this.getAttribute('data-price'));
        addToCart(name, price);
    });
});
