let cart = [];
var products = [];
function renderProducts() {
    let productsContainer = document.getElementById("products");
    productsContainer.innerHTML = "";
    for (const item of products) {
        productsContainer.insertAdjacentHTML('beforeend', `
            <div class="product-card">
            <img src="${item.img}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${item.price}</p>
                    <button onclick="addToCart(${item.id})" class="add-to-cart">Add to Cart</button>
            </div>`
        );
    }
    if(products.length === 0) {
        productsContainer.innerHTML = 'No products found';
    }
}
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td><input onchange="updateQuantity(${item.id})" type="number" value="${item.quantity}" class="quantity-input"></td>
            <td>$${item.price}</td>
            <td>$${item.price * item.quantity}</td>
            <td><button onclick = "removeItem(${item.id})" class="remove-item" data-id="${item.id}">Remove</button></td>
        `;
        cartItemsContainer.appendChild(row);
    });

    updateTotalPrice();
}

renderProducts();
renderCart();

function updateTotalPrice() {
    const totalPriceEl = document.getElementById('total-price');
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPriceEl.textContent = totalPrice.toFixed(2);
}

function addToCart(productId) {
    const product = products.find(product => product.id === productId);
    console.log(productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    renderCart();
}
function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
}
function updateQuantity(productId) {
    console.log(productId);
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = event.target.value;
        if (item.quantity < 0) {
            item.quantity = 0;
            event.target.value = 0;
        }
        event.target.parentElement.nextElementSibling.nextElementSibling.innerHTML = item.price * item.quantity;
        updateTotalPrice();
    }
}
function addProduct() {
    const name = event.target.previousElementSibling.previousElementSibling.previousElementSibling.value;
    const price = event.target.previousElementSibling.previousElementSibling.value;
    const img = event.target.previousElementSibling.value;
    const id = products.length + 1;
    products.push({ id, name, price , img});
    renderProducts();
    event.target.previousElementSibling.previousElementSibling.previousElementSibling.value = '';
    event.target.previousElementSibling.previousElementSibling.value = '';
    event.target.previousElementSibling.value = '';
}