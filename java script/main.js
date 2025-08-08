document.addEventListener('DOMContentLoaded', function() {
    // كود تسجيل الدخول والخروج
    const authLinks = document.getElementById('links');
    const userInfo = document.getElementById('user-info');
    const usernameDisplay = document.getElementById('username-display');
    const logoutBtn = document.getElementById('logout');

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const username = localStorage.getItem("UserName");

        const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingDiv);

        setTimeout(() => {
        loadingDiv.style.opacity = '0';
        setTimeout(() => {
            loadingDiv.remove();
            // إضافة تأثيرات للعناصر بعد التحميل
            animateElements();
        }, 500);
    }, 1000);
    
    function animateElements() {
        const products = document.querySelectorAll('.product-item');
        products.forEach((product, index) => {
            setTimeout(() => {
                product.classList.add('slide-in');
            }, index * 100);
        });
    }

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

    // مصفوفة المنتجات
    const products = [
        {
            id: 1,
            title: "iPhone-12",
            color: "blue",
            imageUrl: "image/Apple-iPhone-12.webp",
            desc: "Latest Apple smartphone with A14 Bionic chip and Super Retina XDR display",
            price: 799
        },
        {
            id: 2,
            title: "iPhone-11",
            color: "white",
            imageUrl: "image/Apple-iPhone-11-Pro-Max.webp",
            desc: "Previous generation iPhone with A13 Bionic chip",
            price: 699
        },
        {
            id: 3,
            title: "iPhone-14",
            color: "gold",
            imageUrl: "image/Apple-iPhone-14-Pro-Max.webp",
            desc: "Newer model with improved camera and performance",
            price: 899
        },
        {
            id: 4,
            title: "iPhone-13-Pro-Max",
            color: "gold",
            imageUrl: "image/iPhone-13-Pro-Max_-1.webp",
            desc: "Pro model with advanced camera system",
            price: 999
        },
        {
            id: 5,
            title: "iPhone-15-Pro",
            color: "gray",
            imageUrl: "image/iPhone-15-Pro-2.webp",
            desc: "Latest flagship iPhone with dynamic island",
            price: 1099
        },
        {
            id: 6,
            title: "iPad Air",
            color: "gray",
            imageUrl: "image/pt_ipad_air__cr381zljqdiu_large.png",
            desc: "Serious performance in a thin and light design",
            price: 17000
        },
        {
            id: 7,
            title: "MacBook Air 13",
            color: "gray",
            imageUrl: "image/mba_13_15_5b2ef1589.png",
            desc: "Strikingly thin and fast so you can work, play, or create anywhere",
            price: 2000
        },
        {
            id: 8,
            title: "Apple Watch Ultra 2",
            color: "black",
            imageUrl: "image/product_u2__ebztafh9rvau_large.png",
            desc: "The ultimate sportsand adventure watch",
            price: 32000
        },
        {
            id: 9,
            title: "Apple Watch SE",
            color: "black",
            imageUrl: "image/product_u2__ebztafh9rvau_large.png",
            desc: "All the essentials.Light on price",
            price: 1000
        },
        {
            id: 10,
            title: "Apple Watch Ultra 2",
            color: "black",
            imageUrl: "image/product_se__frx4hb13romm_large.png",
            desc: "The ultimate sportsand adventure watch",
            price: 3000
        },
        {
            id: 11,
            title: "AirPods 4",
            color: "black",
            imageUrl: "image/compare_airpods_pro_2__c3r137ebxwae_large.png",
            desc: "The next evolution of sound and comfort",
            price: 2500
        },
        {
            id: 12,
            title: "AirPods Pro 2",
            color: "black",
            imageUrl: "image/compare_airpods_4__fy4e25bzx1u2_large.png",
            desc: "Pro-level Active Noise Cancellation and advancements in hearing health",
            price: 2500
        },
    ];

    // سلة التسوق
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartBadge = document.querySelector('.badge');
    const cartItemsContainer = document.querySelector('.cart-items');
    const viewAllBtn = document.querySelector('.view-all');

    // رسم المنتجات
    function drawProducts() {
        let productsHTML = products.map((item) => {
            return `
                <div class="product-item" data-id="${item.id}">
                    <img src="${item.imageUrl}" alt="${item.title}">
                    <div class="product-desc">
                        <h2>${item.title}</h2>
                        <p>${item.desc}</p>
                        <span>Color: ${item.color}</span>
                        <span class="product-price">${item.price}</span>
                    </div>
                    <div class="product-action">
                        <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
                        <i class="fa-solid fa-heart like-btn"></i>
                    </div>
                </div>
            `;
        }).join('');
        
        document.querySelector(".product").innerHTML = productsHTML;
        
        // إضافة معالجات الأحداث لأزرار Add to Cart
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                addToCart(productId);
            });
        });

        // إضافة معالجات الأحداث لأزرار الإعجاب
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                this.classList.toggle('liked');
            });
        });
    }

    // إضافة منتج إلى السلة
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                title: product.title,
                price: product.price,
                imageUrl: product.imageUrl,
                quantity: 1
            });
        }

        updateCart();
        showNotification(product.title);
    }

    // تحديث السلة
    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartBadge();
        updateCartDropdown();
    }

    // تحديث عداد السلة
    function updateCartBadge() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartBadge.textContent = totalItems;
    }

    // تحديث القائمة المنبثقة للسلة
function updateCartDropdown() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        return;
    }

    let cartHTML = cart.map(item => {
        const subtotal = item.price * item.quantity;
        return `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.imageUrl}" alt="${item.title}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price} × ${item.quantity} = $${subtotal}</div>
                </div>
                <i class="fas fa-times cart-item-remove" title="Remove"></i>
            </div>
        `;
    }).join('');

        // إضافة المجموع الكلي
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartHTML += `
            <div class="cart-total">
                <span>Total:</span>
                <span>$${total}</span>
            </div>
        `;

        cartItemsContainer.innerHTML = cartHTML;

        // إضافة معالجات الأحداث لأزرار الحذف
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = parseInt(this.closest('.cart-item').getAttribute('data-id'));
                removeFromCart(itemId);
            });
        });
    }

    // حذف منتج من السلة
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }

    // إظهار إشعار
    function showNotification(productName) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${productName} added to cart`,
            showConfirmButton: false,
            timer: 1500
        });
    }

    // main.js - بعد drawProducts() وقبل نهاية الملف
function drawSpecialOffers() {
    const specialOffers = products.filter(product => product.id <= 3); // أول 3 منتجات كعروض خاصة
    const offersContainer = document.querySelector('.offers-container');
    
    offersContainer.innerHTML = specialOffers.map(product => `
        <div class="offer-card" data-id="${product.id}">
            <div class="offer-badge">خصم 20%</div>
            <div class="offer-image">
                <img src="${product.imageUrl}" alt="${product.title}">
            </div>
            <div class="offer-content">
                <h3>${product.title}</h3>
                <div class="price">
                    <span class="original-price">$${product.price}</span>
                    <span class="discounted-price">$${(product.price * 0.8).toFixed(2)}</span>
                </div>
                <button class="add-to-cart" data-id="${product.id}">أضف إلى السلة</button>
            </div>
        </div>
    `).join('');
}

function drawBestSellers() {
    const bestSellers = products.slice(3, 6); // المنتجات من 4 إلى 6 كأكثر مبيعًا
    const productsGrid = document.querySelector('.products-grid');
    
    productsGrid.innerHTML = bestSellers.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-badge">الأكثر مبيعًا</div>
            <div class="product-image">
                <img src="${product.imageUrl}" alt="${product.title}">
                <div class="quick-view">معاينة سريعة</div>
            </div>
            <div class="product-content">
                <h3>${product.title}</h3>
                <p>${product.desc}</p>
                <div class="price">$${product.price}</div>
                <div class="product-actions">
                    <button class="add-to-cart" data-id="${product.id}">أضف إلى السلة</button>
                    <button class="wishlist-btn"><i class="far fa-heart"></i></button>
                </div>
            </div>
        </div>
    `).join('');
}

// في نهاية DOMContentLoaded
drawSpecialOffers();
drawBestSellers();


    drawProducts();
    updateCart();
});

//////////////////////////////////////////////////////

// function check (){
//     if(localStorage.getItem("username")){
//         window.location = "cartProduct.html"
//     }else{
//         window.location = "login.html"
//     }
// }

let veiwProductDiv = document.querySelector(".veiwProduct div")
function addToCart(id){
    let chooseItem = product.find((item) => item.id === di)
    veiwProductDiv.innerHTML =`<p>${chooseItem.title}</p>`
    veiwProduct.style.display = "block"
}
let cart = document.querySelector(".cart")
let veiwProduct = document.querySelector(".veiwProduct")
cart.addEventListener('click' , () =>{
    if(veiwProduct.innerHTML !=""){
        if(veiwProduct.style.display == "block"){
            veiwProduct.style.display = "none"
        }else{
            veiwProduct.style.display = "block"
        }
    }
})


