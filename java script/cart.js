document.addEventListener('DOMContentLoaded', function() {

    const authLinks = document.getElementById('links');
    const userInfo = document.getElementById('user-info');
    const usernameDisplay = document.getElementById('username-display');
    const logoutBtn = document.getElementById('logout');

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const username = localStorage.getItem("UserName");

    if (isLoggedIn && username) {
        if (authLinks) authLinks.style.display = "none";
        if (userInfo) userInfo.style.display = "flex";
        if (usernameDisplay) {
            usernameDisplay.textContent = username;
            usernameDisplay.style.textTransform = "capitalize";
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("currentUser");
                window.location.href = "register.html";
            });
        }
    } else {
        if (authLinks) authLinks.style.display = "flex";
        if (userInfo) userInfo.style.display = "none";
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productContainer = document.querySelector('.product');


    function drawCartProducts() {
        if (cart.length === 0) {
            productContainer.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>';
            return;
        }

        let productsHTML = cart.map(item => {
            const subtotal = item.price * item.quantity;
            return `
                <div class="cart-product-item" data-id="${item.id}">
                    <img src="${item.imageUrl}" alt="${item.title}">
                    <div class="cart-product-details">
                        <h3>${item.title}</h3>
                        <p>Price: $${item.price}</p>
                        <div class="quantity-controls">
                            <button class="quantity-decrease">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-increase">+</button>
                        </div>
                        <p class="subtotal">Subtotal: $${subtotal}</p>
                    </div>
                    <button class="remove-from-cart" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        }).join('');


        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        productsHTML += `
            <div class="cart-summary">
                <h3>Cart Summary</h3>
                <div class="total-amount">
                    <span>Total:</span>
                    <span>$${total}</span>
                </div>
                <button class="checkout-btn">Proceed to Checkout</button>
            </div>
        `;

        productContainer.innerHTML = productsHTML;

   
        document.querySelectorAll('.quantity-increase').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.closest('.cart-product-item').getAttribute('data-id'));
                updateQuantity(productId, 1);
            });
        });

        document.querySelectorAll('.quantity-decrease').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.closest('.cart-product-item').getAttribute('data-id'));
                updateQuantity(productId, -1);
            });
        });

        document.querySelectorAll('.remove-from-cart').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                removeFromCart(productId);
            });
        });
    }

 
    function updateQuantity(productId, change) {
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex === -1) return;

        cart[itemIndex].quantity += change;

        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        drawCartProducts();
    }


    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        drawCartProducts();
    }


    drawCartProducts();
});