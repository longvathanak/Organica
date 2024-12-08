// Sample data for products
const products = [
    { id: 1, name: "Fresh Orangey", price: 75.00},
    { id: 2, name: "Key Lime", price: 75.00 },
    { id: 3, name: "Fresh Watermelon", price: 75.00 },
    { id: 4, name: "Pomagranate Fruit", price: 75.00 },
    { id: 5, name: "Red onion", price: 75.00 },
    { id: 6, name: "Lens Results Broccoli", price: 75.00 },
    { id: 7, name: "Lens Results Spinach", price: 75.00 },
    { id: 8, name: "Strawberry", price: 75.00 },
    { id: 9, name: "Lorigun Artificial", price: 75.00 },
    { id: 10, name: "Leaf lettuce", price: 75.00 },
    // Add more products as needed
];

// Cart object to hold items
let cart = {};

// Function to update the cart display
function updateCartDisplay() {
    const cartPanel = document.querySelector('[data-side-panel="cart"] .panel-list');
    const subtotalDisplay = document.querySelector('.subtotal-value');
    const subtotalContainer = document.querySelector('.subtotal');
    const cartBadge = document.querySelector('.btn-badge');

    // Clear the current cart display
    cartPanel.innerHTML = '';
    let subtotal = calculateTotalPrice(); // Calculate the total price

    // Check if the cart is empty
    if (Object.keys(cart).length === 0) {
        cartPanel.innerHTML = '<li>No items in cart</li>';
        subtotalContainer.style.display = 'none'; // Hide the entire subtotal section
        cartBadge.textContent = '00';
        cartBadge.setAttribute('value', '0');
        subtotalDisplay.textContent = '$0.00'; // Set the subtotal to $0.00
        return;
    } else {
        subtotalContainer.style.display = 'block'; // Show the subtotal section
    }

    // Iterate over cart items and display them
    for (const [id, item] of Object.entries(cart)) {
        const listItem = document.createElement('li');
        listItem.className = 'panel-item';
        listItem.innerHTML = `
            <div class="panel-card">
                <figure class="item-banner">
                        <img src="./assets/images/product-small-2.jpg" width="46" height="46" loading="lazy" alt="${item.name}">
                    </figure>
                    <div>
                        <p class="item-title">${item.name}</p>
                        <span class="item-value">$${item.price.toFixed(2)} x ${item.quantity}</span>
                    </div>
                    <button class="item-close-btn" aria-label="Remove item" onclick="removeItem(${id})">
                        <ion-icon name="close-outline"></ion-icon>
                    </button>
            </div>
        `;
        cartPanel.appendChild(listItem);
    }

    // Update subtotal display
    subtotalDisplay.textContent = `$${subtotal.toFixed(2)}`;

    // Update cart badge
    updateCartBadge();
}

function updateCartBadge() {
    const cartBadge = document.querySelector('.btn-badge');
    const totalItems = Object.values(cart).reduce((total, item) => total + item.quantity, 0);
    cartBadge.textContent = totalItems.toString().padStart(2, '0');
    cartBadge.setAttribute('value', totalItems.toString());
}

// Function to add item to cart
function addItemToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Check if the item is already in the cart
    if (cart[productId]) {
        cart[productId].quantity += 1; // Increase quantity
    } else {
        cart[productId] = { name: product.name, price: product.price, quantity: 1 }; // Add new item
    }

    updateCartDisplay(); // Update the cart display
    updateCartBadge(); // Update the cart badge
}

function removeItem(productId) {
    delete cart[productId];
    updateCartDisplay(); // Update the cart display
    updateCartBadge(); // Update the cart badge
}

// Attach event listeners to Add to Cart buttons
document.querySelectorAll('.btn.btn-primary').forEach(button => {
    button.addEventListener('click', () => {
        const productId = parseInt(button.closest('.product-card').querySelector('.card-title a').getAttribute('data-id'));
        addItemToCart(productId);
    });
});

// Function to calculate the total price of the items in the cart
function calculateTotalPrice() {
    let totalPrice = 0;
    for (const [_, item] of Object.entries(cart)) {
        totalPrice += item.price * item.quantity;
    }
    return totalPrice;
}

// ====================================================================================================================================

const favoriteList = document.getElementById('favorite-list');
const favoriteBadge = document.querySelector('.btn-badge-fav');

let favoritedProducts = [];

// Generate favorited product cards dynamically
function updateFavoriteList() {
  favoriteList.innerHTML = '';
  favoritedProducts.forEach(product => {
    const listItem = createFavoriteItem(product);
    favoriteList.appendChild(listItem);
  });
  updateFavoriteBadge();
}

function createFavoriteItem(product) {
  const listItem = document.createElement('li');
  listItem.classList.add('panel-item');
  listItem.innerHTML = `
    <div class="panel-card">
      <figure class="item-banner">
        <img src="./assets/images/product-small-1.jpg" width="46" height="46" loading="lazy" alt="${product.name}">
      </figure>
      <div>
        <p class="item-title">${product.name}</p>
        <span class="item-value">$${product.price.toFixed(2)}</span>
      </div>
      <button class="item-close-btn" aria-label="Remove item">
        <ion-icon name="close-outline"></ion-icon>
      </button>
    </div>
  `;

  const removeBtn = listItem.querySelector('.item-close-btn');
  removeBtn.addEventListener('click', () => {
    const itemIndex = favoritedProducts.findIndex(p => p.id === product.id);
    if (itemIndex !== -1) {
      favoritedProducts.splice(itemIndex, 1);
      updateFavoriteList();
    }
  });

  return listItem;
}

function updateFavoriteBadge() {
  favoriteBadge.textContent = favoritedProducts.length.toString().padStart(2, '0');
  favoriteBadge.setAttribute('value', favoritedProducts.length);
}

function addToFavorites(product) {
  const itemIndex = favoritedProducts.findIndex(p => p.id === product.id);
  if (itemIndex === -1) {
    favoritedProducts.push(product);
    updateFavoriteList();
  }
}

// Add event listener to "Add to Favorite" buttons
document.querySelectorAll('.product-btn[aria-label="Add to Favorite"]').forEach(btn => {
  btn.addEventListener('click', () => {
    const productId = parseInt(btn.closest('.product-card').querySelector('a').dataset.id);
    const product = products.find(p => p.id === productId);
    if (product) {
      addToFavorites(product);
    }
  });
});

// Initialize the favorite list and badge count
function initFavorites() {
  // Retrieve the favorite products from local storage or other source
  favoritedProducts = JSON.parse(localStorage.getItem('favoritedProducts')) || [];
  updateFavoriteList();
}

initFavorites();
