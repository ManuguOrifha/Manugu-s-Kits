/**
 * KitZone — Football Kit Store
 * Complete shopping cart, authentication, order flow, and LIGHTBOX feature
 */

"use strict";

// ==================== KIT DATA (30+ Kits: National + Club) ====================
const kits = [
  // National Teams
  { id: 1, country: "Brazil", flag: "🇧🇷", type: "Home Shirt", price: 1499.99, category: "National", image: "brazil-home.jpg.jpeg" },
  { id: 2, country: "Brazil", flag: "🇧🇷", type: "Away Shirt", price: 1299.99, category: "National", image: "brazil-away.jpg.jpeg" },
  { id: 3, country: "Argentina", flag: "🇦🇷", type: "Home Shirt", price: 1499.99, category: "National", image: "argentina-home.jpg.jpeg" },
  { id: 4, country: "Argentina", flag: "🇦🇷", type: "Away Shirt", price: 1299.99, category: "National", image: "argentina-away.jpg.jpeg" },
  { id: 5, country: "France", flag: "🇫🇷", type: "Home Shirt", price: 1499.99, category: "National", image: "france-home.jpg.jpeg" },
  { id: 6, country: "France", flag: "🇫🇷", type: "Away Shirt", price: 1299.99, category: "National", image: "france-away.jpg.jpeg" },
  { id: 7, country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", type: "Home Shirt", price: 1499.99, category: "National", image: "england-home.jpg.jpeg" },
  { id: 8, country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", type: "Away Shirt", price: 1299.99, category: "National", image: "england-away.jpg.jpeg" },
  { id: 9, country: "Portugal", flag: "🇵🇹", type: "Home Shirt", price: 1499.99, category: "National", image: "portugal-home.jpg.jpeg" },
  { id: 10, country: "Portugal", flag: "🇵🇹", type: "Away Shirt", price: 1299.99, category: "National", image: "portugal-away.jpg.jpeg" },
  { id: 11, country: "Spain", flag: "🇪🇸", type: "Home Shirt", price: 1499.99, category: "National", image: "spain-home.jpg.jpeg" },
  { id: 12, country: "Spain", flag: "🇪🇸", type: "Away Shirt", price: 1299.99, category: "National", image: "spain-away.jpg.jpeg" },
  // Club Teams
  { id: 13, country: "Mamelodi Sundowns", flag: "🟡🔵", type: "Home Shirt", price: 1499.99, category: "Club", image: "sundowns-home.jpg.jpeg" },
  { id: 14, country: "Mamelodi Sundowns", flag: "🟡🔵", type: "Away Shirt", price: 1299.99, category: "Club", image: "sundowns-away.jpg.jpeg" },
  { id: 15, country: "Kaizer Chiefs", flag: "⚫🔴", type: "Home Shirt", price: 1499.99, category: "Club", image: "chiefs-home.jpg.jpeg" },
  { id: 16, country: "Kaizer Chiefs", flag: "⚫🔴", type: "Away Shirt", price: 1299.99, category: "Club", image: "chiefs-away.jpg.jpeg" },
  { id: 17, country: "Orlando Pirates", flag: "⚫⚪", type: "Home Shirt", price: 1499.99, category: "Club", image: "pirates-home.jpg.jpeg" },
  { id: 18, country: "Orlando Pirates", flag: "⚫⚪", type: "Away Shirt", price: 1299.99, category: "Club", image: "pirates-away.jpg.jpeg" },
  { id: 19, country: "Barcelona", flag: "🔵🔴", type: "Home Shirt", price: 1499.99, category: "Club", image: "barcelona-home.jpg.jpeg" },
  { id: 20, country: "Barcelona", flag: "🔵🔴", type: "Away Shirt", price: 1299.99, category: "Club", image: "barcelona-away.jpg.jpeg" },
  { id: 21, country: "Real Madrid", flag: "⚪", type: "Home Shirt", price: 1499.99, category: "Club", image: "real-home.jpg.jpeg" },
  { id: 22, country: "Real Madrid", flag: "⚪", type: "Away Shirt", price: 1299.99, category: "Club", image: "real-away.jpg.jpeg" },
  { id: 23, country: "Atlético Madrid", flag: "🔴⚪", type: "Home Shirt", price: 1499.99, category: "Club", image: "atletico-home.jpg.jpeg" },
  { id: 24, country: "Atlético Madrid", flag: "🔴⚪", type: "Away Shirt", price: 1299.99, category: "Club", image: "atletico-away.jpg.jpeg" },
  { id: 25, country: "Manchester City", flag: "🩵", type: "Home Shirt", price: 1499.99, category: "Club", image: "mancity-home.jpg.jpeg" },
  { id: 26, country: "Manchester City", flag: "🩵", type: "Away Shirt", price: 1299.99, category: "Club", image: "mancity-away.jpg.jpeg" },
  { id: 27, country: "Manchester United", flag: "🔴", type: "Home Shirt", price: 1499.99, category: "Club", image: "manutd-home.jpg.jpeg" },
  { id: 28, country: "Manchester United", flag: "🔴", type: "Away Shirt", price: 1299.99, category: "Club", image: "manutd-away.jpg.jpeg" },
  { id: 29, country: "Liverpool", flag: "🔴", type: "Home Shirt", price: 1499.99, category: "Club", image: "liverpool-home.jpg.jpeg" },
  { id: 30, country: "Liverpool", flag: "🔴", type: "Away Shirt", price: 1299.99, category: "Club", image: "liverpool-away.jpg.jpeg" }
];

// ==================== GLOBAL STATE ====================
let cart = JSON.parse(localStorage.getItem('kz_cart')) || [];
let users = JSON.parse(localStorage.getItem('kz_users')) || [];
let pendingKit = null;
let activeFilter = 'all';
let currentLightboxImages = [];
let currentLightboxIndex = 0;

// ==================== DOM REFERENCES ====================
const $ = id => document.getElementById(id);

const screens = {
  registration: $('registration-screen'),
  login: $('login-screen'),
  shopping: $('shopping-screen'),
  cart: $('cart-screen'),
  order: $('order-screen'),
  confirm: $('confirmation-screen')
};

// ==================== LIGHTBOX FUNCTIONS ====================
function openLightbox(imageUrl, kitName, allImages, startIndex) {
  currentLightboxImages = allImages;
  currentLightboxIndex = startIndex;
  
  const lightbox = $('lightbox');
  const lightboxImg = $('lightbox-img');
  const caption = $('lightbox-caption');
  
  lightboxImg.src = imageUrl;
  caption.textContent = kitName;
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  $('lightbox').style.display = 'none';
  document.body.style.overflow = '';
}

function showPrevImage() {
  if (currentLightboxImages.length === 0) return;
  currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length;
  const img = currentLightboxImages[currentLightboxIndex];
  $('lightbox-img').src = img.src;
  $('lightbox-caption').textContent = img.caption;
}

function showNextImage() {
  if (currentLightboxImages.length === 0) return;
  currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxImages.length;
  const img = currentLightboxImages[currentLightboxIndex];
  $('lightbox-img').src = img.src;
  $('lightbox-caption').textContent = img.caption;
}

// ==================== TOAST NOTIFICATIONS ====================
function showToast(message, type = 'info') {
  const container = $('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 2800);
}

// ==================== SCREEN MANAGEMENT ====================
function showScreen(name) {
  Object.entries(screens).forEach(([key, el]) => {
    if (el) el.style.display = key === name ? 'block' : 'none';
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== CART FUNCTIONS ====================
function saveCart() {
  localStorage.setItem('kz_cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount(bump = false) {
  const badge = $('cart-count');
  if (badge) {
    badge.textContent = cart.length;
    if (bump) {
      badge.classList.remove('bump');
      void badge.offsetWidth;
      badge.classList.add('bump');
    }
  }
}

function addToCart(kitId, size) {
  const kit = kits.find(k => k.id === kitId);
  if (!kit) return;
  cart.push({ ...kit, size, uniqueId: Date.now() + Math.random() });
  saveCart();
  updateCartCount(true);
  showToast(`${kit.flag} ${kit.country} ${kit.type} (${size}) added to cart!`, 'success');
  displayCart();
}

function removeFromCart(uniqueId) {
  cart = cart.filter(i => i.uniqueId !== uniqueId);
  saveCart();
  displayCart();
  showToast('Item removed from cart.', 'info');
}

window.removeFromCart = removeFromCart;

function displayCart() {
  const container = $('cart-items');
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p style="color:var(--muted);font-size:14px;">Head back and pick your kit</p>
      </div>
    `;
  } else {
    container.innerHTML = cart.map((item, idx) => `
      <div class="cart-item" style="animation-delay:${idx * 0.06}s">
        <img class="cart-item-img" src="${item.image}" alt="${item.country} ${item.type}" 
          onclick="openLightboxFromCart('${item.image}', '${item.country} ${item.type}', ${idx})"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
        <div class="cart-item-img-placeholder" style="display:none">${item.flag || '⚽'}</div>
        <div class="cart-item-info">
          <h4>${item.country} ${item.type}</h4>
          <span class="cart-item-size">${item.size}</span>
          <div class="cart-item-price">R${item.price.toFixed(2)}</div>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${item.uniqueId})">Remove</button>
      </div>
    `).join('');
  }
  
  const fmt = v => `R${v.toFixed(2)}`;
  $('subtotal-price').textContent = fmt(total);
  $('total-price').textContent = fmt(total);
}

window.openLightboxFromCart = function(imgSrc, caption, idx) {
  const allCartImages = cart.map((item, i) => ({
    src: item.image,
    caption: `${item.country} ${item.type}`
  }));
  openLightbox(imgSrc, caption, allCartImages, idx);
};

// ==================== KIT DISPLAY ====================
function displayKits(filter = 'all') {
  const list = $('kit-list');
  let filtered = filter === 'all' ? kits : kits.filter(k => k.category === filter);
  
  if (filtered.length === 0) {
    list.innerHTML = `<p style="color:var(--muted);padding:20px;">No kits found.</p>`;
    return;
  }
  
  // Build array of all images for lightbox navigation
  const allKitImages = filtered.map((kit, idx) => ({
    src: kit.image,
    caption: `${kit.country} ${kit.type}`
  }));
  
  list.innerHTML = filtered.map((kit, i) => `
    <div class="kit-item" style="animation-delay:${i * 0.05}s">
      <div class="kit-img-wrap" onclick="openLightbox('${kit.image}', '${kit.country} ${kit.type}', window.currentKitImages || [], ${i})">
        <img src="${kit.image}" alt="${kit.country} ${kit.type}" 
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
        <div class="kit-img-placeholder" style="display:none">${kit.flag}</div>
        <div class="kit-flag">${kit.flag}</div>
      </div>
      <div class="kit-body">
        <span class="kit-country-tag">${kit.country}</span>
        <h3>${kit.type}</h3>
        <span class="kit-price">R${kit.price.toFixed(2)}</span>
        <button class="add-cart-btn" onclick="event.stopPropagation(); promptForSize(${kit.id})">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  `).join('');
  
  // Store current images for lightbox navigation
  window.currentKitImages = allKitImages;
}

// Override openLightbox for kit grid usage
window.openLightbox = function(imgSrc, caption, allImages, startIndex) {
  if (!allImages || allImages.length === 0) {
    allImages = [{ src: imgSrc, caption: caption }];
    startIndex = 0;
  }
  openLightbox(imgSrc, caption, allImages, startIndex);
};

// ==================== SIZE MODAL ====================
function promptForSize(kitId) {
  pendingKit = kitId;
  $('size-modal').style.display = 'flex';
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
}

function closeSizeModal() {
  $('size-modal').style.display = 'none';
  pendingKit = null;
}

function handleSizeSelection(e) {
  const size = e.currentTarget.dataset.size;
  if (pendingKit && size) {
    addToCart(pendingKit, size);
    closeSizeModal();
  }
}

window.promptForSize = promptForSize;

// ==================== AUTHENTICATION ====================
function handleRegistration(e) {
  e.preventDefault();
  const username = $('new-username').value.trim();
  const password = $('new-password').value.trim();
  
  if (username.length < 4) {
    showToast('Username must be at least 4 characters.', 'error');
    return;
  }
  if (password.length < 6) {
    showToast('Password must be at least 6 characters.', 'error');
    return;
  }
  if (users.some(u => u.username === username)) {
    showToast('Username already taken.', 'error');
    return;
  }
  
  users.push({ username, password });
  localStorage.setItem('kz_users', JSON.stringify(users));
  showToast('Account created! Please sign in.', 'success');
  $('registration-form').reset();
  showScreen('login');
}

function handleLogin(e) {
  e.preventDefault();
  const username = $('username').value.trim();
  const password = $('password').value.trim();
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    $('login-form').reset();
    showScreen('shopping');
    displayKits(activeFilter);
    showToast(`Welcome back, ${username}! ⚽`, 'success');
  } else {
    showToast('Incorrect username or password.', 'error');
  }
}

// ==================== ORDER FLOW ====================
function handleOrder(e) {
  e.preventDefault();
  const email = $('email').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    showToast('Please enter a valid email address.', 'error');
    return;
  }
  
  $('confirmation-email').textContent = email;
  cart = [];
  saveCart();
  updateCartCount();
  $('address-form').reset();
  showScreen('confirm');
  showToast('Order placed! Delivery on Sunday 📦', 'success');
}

function viewCart() {
  showScreen('cart');
  displayCart();
}

function backToShopping() {
  showScreen('shopping');
  displayKits(activeFilter);
}

function proceedToCheckout() {
  if (cart.length === 0) {
    showToast('Your cart is empty. Add some kits first!', 'error');
    return;
  }
  showScreen('order');
}

// ==================== EVENT BINDINGS ====================
function bindEvents() {
  // Auth navigation
  $('login-link').addEventListener('click', e => { e.preventDefault(); showScreen('login'); });
  $('register-link').addEventListener('click', e => { e.preventDefault(); showScreen('registration'); });
  
  // Forms
  $('registration-form').addEventListener('submit', handleRegistration);
  $('login-form').addEventListener('submit', handleLogin);
  $('address-form').addEventListener('submit', handleOrder);
  
  // Cart navigation
  $('view-cart-btn').addEventListener('click', viewCart);
  $('back-to-shopping-btn').addEventListener('click', backToShopping);
  $('order-btn').addEventListener('click', proceedToCheckout);
  
  // Confirmation back to shop
  $('continue-shopping-btn').addEventListener('click', () => {
    showScreen('shopping');
    displayKits(activeFilter);
  });
  
  // Modal controls
  $('cancel-size').addEventListener('click', closeSizeModal);
  $('size-modal').addEventListener('click', e => {
    if (e.target === $('size-modal')) closeSizeModal();
  });
  
  // Lightbox events
  $('lightbox').addEventListener('click', e => {
    if (e.target === $('lightbox')) closeLightbox();
  });
  $('lightbox-close').addEventListener('click', closeLightbox);
  $('lightbox-prev').addEventListener('click', showPrevImage);
  $('lightbox-next').addEventListener('click', showNextImage);
  
  // Keyboard events for lightbox
  document.addEventListener('keydown', e => {
    if ($('lightbox').style.display === 'flex') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrevImage();
      if (e.key === 'ArrowRight') showNextImage();
    }
  });
  
  // Size buttons
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', handleSizeSelection);
  });
  
  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      displayKits(activeFilter);
    });
  });
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  // Splash screen
  setTimeout(() => {
    const splash = $('splash-screen');
    splash.classList.add('hide');
    setTimeout(() => splash.style.display = 'none', 800);
  }, 2000);
  
  bindEvents();
  updateCartCount();
});