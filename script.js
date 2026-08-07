/* ==========================================================================
   AURA ARTISANAL ROASTERY & COFFEE BAR - JAVASCRIPT LOGIC
   ========================================================================== */

// --- DATA STORES ---

const MENU_ITEMS = [
  {
    id: 1,
    title: "Rose Velvet Signature Latte",
    category: "espresso",
    price: 6.50,
    image: "images/latte.jpg",
    tag: "Best Seller",
    desc: "Double shot of Ethiopia Yirgacheffe espresso infused with organic rosewater syrup and micro-foamed oat milk.",
    flavors: ["Floral", "Velvety", "Sweet"]
  },
  {
    id: 2,
    title: "Cascading Nitro Cold Brew",
    category: "cold",
    price: 5.75,
    image: "images/nitro.jpg",
    tag: "Chilled Special",
    desc: "18-hour cold steeped single-origin Colombia beans infused with pure nitrogen for a creamy, stout-like head.",
    flavors: ["Dark Cocoa", "Creamy", "Low Acid"]
  },
  {
    id: 3,
    title: "V60 Artisan Pour-Over",
    category: "manual",
    price: 6.00,
    image: "images/pourover.jpg",
    tag: "Barista Favorite",
    desc: "Hand-poured single-origin Guatemala Antigua brewed at precise 93°C water temperature for ultimate floral clarity.",
    flavors: ["Jasmine", "Citrus Zest", "Clean"]
  },
  {
    id: 4,
    title: "Fresh Baked Butter Croissant",
    category: "pastry",
    price: 4.50,
    image: "images/pastry.jpg",
    tag: "Baked Fresh Daily",
    desc: "Hand-rolled French butter croissant baked fresh every morning at 6:00 AM until golden and flaky.",
    flavors: ["Buttery", "Flaky", "Savory"]
  },
  {
    id: 5,
    title: "Iced Oat Matcha Tea Latte",
    category: "cold",
    price: 6.25,
    image: "images/matcha_cake.jpg",
    tag: "Organic Organic",
    desc: "Ceremonial grade Uji Matcha whisked with organic vanilla and layered over ice-cold oat milk.",
    flavors: ["Umami", "Earthy", "Refreshing"]
  },
  {
    id: 6,
    title: "Whole Bean Ethiopia Yirgacheffe (250g)",
    category: "manual",
    price: 18.50,
    image: "images/beans.jpg",
    tag: "Micro-Lot Bag",
    desc: "Medium-light roast arabica beans featuring bright acidity, bergamot orange, and jasmine blossom fragrance.",
    flavors: ["Bergamot", "Jasmine", "Sweet Plum"]
  }
];

const GALLERY_ITEMS = [
  { id: 1, category: "ambiance", image: "images/hero.jpg", title: "Atmospheric Main Lounge", desc: "Ambient globe lighting and warm leather seating." },
  { id: 2, category: "art", image: "images/latte.jpg", title: "Signature Rose Latte Art", desc: "Precision microfoam pouring by Head Barista." },
  { id: 3, category: "cold", image: "images/nitro.jpg", title: "Cascading Nitro Draft", desc: "Creamy nitrogen cascade served on ice." },
  { id: 4, category: "roastery", image: "images/pourover.jpg", title: "V60 Precision Extraction", desc: "Temperature-controlled hand pour-over process." },
  { id: 5, category: "pastries", image: "images/pastry.jpg", title: "Artisanal French Pastries", desc: "Golden flaky croissants & fruit danishes." },
  { id: 6, category: "art", image: "images/barista.jpg", title: "Swan Microfoam Artistry", desc: "Detail shot of microfoam texture." },
  { id: 7, category: "ambiance", image: "images/cozy_nook.jpg", title: "Cozy Reading Nook", desc: "Quiet window seat with oak bookshelf." },
  { id: 8, category: "roastery", image: "images/beans.jpg", title: "Golden Roasted Arabica Beans", desc: "Freshly roasted specialty coffee batch." },
  { id: 9, category: "pastries", image: "images/matcha_cake.jpg", title: "Matcha Latte & Pistachio Cake", desc: "Pairing iced matcha with artisanal cake." }
];

const ORIGINS = {
  ethiopia: {
    title: "Ethiopia Yirgacheffe - Grade 1 Organic",
    desc: "Elevation: 2,100m • Process: Natural Sun-Dried • Tasting Notes: Jasmine, Bergamot & Meyer Lemon. Light Roast roasted to preserve delicate florals."
  },
  colombia: {
    title: "Colombia Huila Pink Bourbon - Special Reserve",
    desc: "Elevation: 1,850m • Process: Honey Processed • Tasting Notes: Red Apple, Caramel Toffee, and Dark Cocoa. Medium Roast with velvety body."
  },
  guatemala: {
    title: "Guatemala Antigua Valley - Volcanic Soil",
    desc: "Elevation: 1,600m • Process: Fully Washed • Tasting Notes: Toasted Almond, Dark Chocolate, and Sweet Spice. Balanced medium roast."
  }
};

// --- APP STATE ---
let cart = [];
let quizAnswers = { step1: null, step2: null, step3: null };
let currentLightboxIndex = 0;
let filteredGallery = [...GALLERY_ITEMS];
let currentCustomizingItem = null;

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  renderMenu("all");
  renderGallery("all");
  updateStoreStatus();
  setupScrollEffects();

  // Mobile toggle menu
  const mobileToggle = document.getElementById("mobile-toggle");
  const navLinks = document.getElementById("nav-links");
  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // Cart Drawer open/close
  document.getElementById("open-cart-btn").addEventListener("click", openCart);
});

// --- STORE OPEN / CLOSED STATUS ---
function updateStoreStatus() {
  const statusBadge = document.getElementById("store-status");
  const statusText = document.getElementById("status-text");
  
  const now = new Date();
  const hours = now.getHours();
  // Open 7 AM (7) to 11 PM (23)
  const isOpen = hours >= 7 && hours < 23;

  if (isOpen) {
    statusBadge.className = "status-badge";
    statusText.textContent = "Open Now • Closes 11 PM";
  } else {
    statusBadge.className = "status-badge closed";
    statusText.textContent = "Closed Now • Opens 7 AM";
  }
}

// --- NAVBAR SCROLL EFFECT ---
function setupScrollEffects() {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// --- RENDER MENU ---
function renderMenu(category) {
  const grid = document.getElementById("menu-grid");
  grid.innerHTML = "";

  const items = category === "all" 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === category);

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "menu-item-card";
    card.innerHTML = `
      <div class="menu-item-img">
        <img src="${item.image}" alt="${item.title}">
        <span class="item-tag">${item.tag}</span>
      </div>
      <div class="menu-item-body">
        <div class="menu-item-header">
          <h3 class="menu-item-title">${item.title}</h3>
          <span class="menu-item-price">$${item.price.toFixed(2)}</span>
        </div>
        <p class="menu-item-desc">${item.desc}</p>
        <div class="item-flavors">
          ${item.flavors.map(f => `<span class="flavor-pill">${f}</span>`).join('')}
        </div>
        <div class="menu-item-footer">
          <button class="btn btn-primary btn-sm" onclick="quickAddToCart(${item.id})">
            <i class="fa-solid fa-plus"></i> Quick Add
          </button>
          <button class="btn btn-outline btn-sm" onclick="openCustomizeModal(${item.id})">
            <i class="fa-solid fa-sliders"></i> Customize
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filterMenu(category) {
  document.querySelectorAll(".menu-tabs .tab-btn").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");
  renderMenu(category);
}

// --- BREW FINDER QUIZ LOGIC ---
function selectQuizOption(step, value) {
  if (step === 1) {
    quizAnswers.step1 = value;
    document.getElementById("quiz-step-1").style.display = "none";
    document.getElementById("quiz-step-2").style.display = "block";
    document.getElementById("step-dot-1").classList.remove("active");
    document.getElementById("step-dot-1").classList.add("completed");
    document.getElementById("step-dot-2").classList.add("active");
  } else if (step === 2) {
    quizAnswers.step2 = value;
    document.getElementById("quiz-step-2").style.display = "none";
    document.getElementById("quiz-step-3").style.display = "block";
    document.getElementById("step-dot-2").classList.remove("active");
    document.getElementById("step-dot-2").classList.add("completed");
    document.getElementById("step-dot-3").classList.add("active");
  } else if (step === 3) {
    quizAnswers.step3 = value;
    document.getElementById("quiz-step-3").style.display = "none";
    document.getElementById("step-dot-3").classList.remove("active");
    document.getElementById("step-dot-3").classList.add("completed");
    calculateQuizMatch();
  }
}

function calculateQuizMatch() {
  const resultDiv = document.getElementById("quiz-result");
  let matchedItem = MENU_ITEMS[0];

  if (quizAnswers.step1 === "cold") {
    matchedItem = MENU_ITEMS[1]; // Nitro Cold Brew
  } else if (quizAnswers.step2 === "black" || quizAnswers.step3 === "fruity") {
    matchedItem = MENU_ITEMS[2]; // V60 Pour Over
  } else if (quizAnswers.step3 === "vanilla") {
    matchedItem = MENU_ITEMS[4]; // Matcha Latte
  } else {
    matchedItem = MENU_ITEMS[0]; // Rose Velvet Signature Latte
  }

  document.getElementById("result-img").src = matchedItem.image;
  document.getElementById("result-title").textContent = matchedItem.title;
  document.getElementById("result-desc").textContent = matchedItem.desc;
  document.getElementById("result-price").textContent = `$${matchedItem.price.toFixed(2)}`;

  document.getElementById("result-add-btn").onclick = () => {
    quickAddToCart(matchedItem.id);
  };

  resultDiv.style.display = "block";
}

function resetQuiz() {
  quizAnswers = { step1: null, step2: null, step3: null };
  document.getElementById("quiz-result").style.display = "none";
  document.getElementById("quiz-step-1").style.display = "block";
  document.getElementById("step-dot-1").className = "quiz-step-item active";
  document.getElementById("step-dot-2").className = "quiz-step-item";
  document.getElementById("step-dot-3").className = "quiz-step-item";
}

// --- GALLERY LOGIC ---
function renderGallery(category) {
  const grid = document.getElementById("gallery-grid");
  grid.innerHTML = "";

  filteredGallery = category === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === category);

  filteredGallery.forEach((item, index) => {
    const el = document.createElement("div");
    el.className = "gallery-item";
    el.onclick = () => openLightbox(index);
    el.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="gallery-overlay">
        <span class="gallery-category">${item.category}</span>
        <h4 class="gallery-title">${item.title}</h4>
      </div>
    `;
    grid.appendChild(el);
  });
}

function filterGallery(category) {
  document.querySelectorAll(".gallery-filters .tab-btn").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");
  renderGallery(category);
}

function openLightbox(index) {
  currentLightboxIndex = index;
  const item = filteredGallery[index];
  document.getElementById("lightbox-img").src = item.image;
  document.getElementById("lightbox-caption").textContent = `${item.title} — ${item.desc}`;
  document.getElementById("lightbox").classList.add("active");
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("active");
}

function prevLightboxImage() {
  currentLightboxIndex = (currentLightboxIndex - 1 + filteredGallery.length) % filteredGallery.length;
  openLightbox(currentLightboxIndex);
}

function nextLightboxImage() {
  currentLightboxIndex = (currentLightboxIndex + 1) % filteredGallery.length;
  openLightbox(currentLightboxIndex);
}

// --- SHOPPING CART & CUSTOMIZATION ---

function quickAddToCart(itemId) {
  const menuItem = MENU_ITEMS.find(i => i.id === itemId);
  if (!menuItem) return;

  const existingIndex = cart.findIndex(c => c.id === itemId && !c.customized);
  if (existingIndex > -1) {
    cart[existingIndex].qty += 1;
  } else {
    cart.push({
      id: menuItem.id,
      title: menuItem.title,
      price: menuItem.price,
      image: menuItem.image,
      options: "Standard 12oz, Whole Milk",
      qty: 1,
      customized: false
    });
  }

  updateCartUI();
  showToast(`Added "${menuItem.title}" to your order!`);
}

function openCustomizeModal(itemId) {
  const menuItem = MENU_ITEMS.find(i => i.id === itemId);
  if (!menuItem) return;

  currentCustomizingItem = menuItem;
  document.getElementById("custom-modal-img").src = menuItem.image;
  document.getElementById("custom-modal-title").textContent = `Customize: ${menuItem.title}`;
  document.getElementById("custom-modal-base-price").textContent = `$${menuItem.price.toFixed(2)} Base`;
  
  recalculateCustomPrice();
  document.getElementById("customize-modal").classList.add("active");
}

function closeCustomizeModal() {
  document.getElementById("customize-modal").classList.remove("active");
}

function recalculateCustomPrice() {
  if (!currentCustomizingItem) return;
  let base = currentCustomizingItem.price;

  const sizeSelect = document.getElementById("custom-size");
  const milkSelect = document.getElementById("custom-milk");
  const shotSelect = document.getElementById("custom-shot");

  const extraSize = parseFloat(sizeSelect.options[sizeSelect.selectedIndex].getAttribute("data-extra") || 0);
  const extraMilk = parseFloat(milkSelect.options[milkSelect.selectedIndex].getAttribute("data-extra") || 0);
  const extraShot = parseFloat(shotSelect.options[shotSelect.selectedIndex].getAttribute("data-extra") || 0);

  const total = base + extraSize + extraMilk + extraShot;
  document.getElementById("custom-calculated-price").textContent = `$${total.toFixed(2)}`;
}

function confirmAddCustomizedItem(e) {
  e.preventDefault();
  if (!currentCustomizingItem) return;

  const size = document.getElementById("custom-size").value;
  const milk = document.getElementById("custom-milk").value;
  const sweet = document.getElementById("custom-sweet").value;
  const shot = document.getElementById("custom-shot").value;

  const priceText = document.getElementById("custom-calculated-price").textContent;
  const price = parseFloat(priceText.replace("$", ""));

  const optionsStr = `${size}, ${milk}, ${sweet}${shot !== 'No Extra Shot' ? ', ' + shot : ''}`;

  cart.push({
    id: currentCustomizingItem.id + "_" + Date.now(),
    title: currentCustomizingItem.title,
    price: price,
    image: currentCustomizingItem.image,
    options: optionsStr,
    qty: 1,
    customized: true
  });

  closeCustomizeModal();
  updateCartUI();
  openCart();
  showToast(`Added custom "${currentCustomizingItem.title}" to cart!`);
}

function updateCartUI() {
  const countEl = document.getElementById("cart-count");
  const listEl = document.getElementById("cart-items-list");
  
  const totalCount = cart.reduce((acc, item) => acc + item.qty, 0);
  countEl.textContent = totalCount;

  listEl.innerHTML = "";
  let subtotal = 0;

  if (cart.length === 0) {
    listEl.innerHTML = `
      <div style="text-align:center; padding:40px 0; color:var(--text-muted);">
        <i class="fa-solid fa-mug-empty" style="font-size:3rem; margin-bottom:12px; color:var(--accent-gold);"></i>
        <p>Your coffee basket is empty.</p>
        <a href="#menu" onclick="closeCart()" class="btn btn-outline btn-sm" style="margin-top:16px;">Browse Menu</a>
      </div>
    `;
  } else {
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.qty;
      subtotal += itemTotal;

      const cartItemDiv = document.createElement("div");
      cartItemDiv.className = "cart-item";
      cartItemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.title}</div>
          <div class="cart-item-options">${item.options}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        </div>
        <div class="cart-qty-ctrl">
          <button class="cart-qty-btn" onclick="changeQty(${index}, -1)">-</button>
          <span style="font-size:0.85rem; font-weight:700;">${item.qty}</span>
          <button class="cart-qty-btn" onclick="changeQty(${index}, 1)">+</button>
        </div>
      `;
      listEl.appendChild(cartItemDiv);
    });
  }

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  document.getElementById("cart-subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("cart-tax").textContent = `$${tax.toFixed(2)}`;
  document.getElementById("cart-total").textContent = `$${total.toFixed(2)}`;
  document.getElementById("checkout-final-amount").textContent = `$${total.toFixed(2)}`;
}

function changeQty(index, delta) {
  if (!cart[index]) return;
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  updateCartUI();
}

function openCart() {
  document.getElementById("cart-drawer").classList.add("open");
}

function closeCart() {
  document.getElementById("cart-drawer").classList.remove("open");
}

function openCheckoutModal() {
  if (cart.length === 0) {
    showToast("Your cart is empty! Add drinks first.");
    return;
  }
  closeCart();
  document.getElementById("checkout-modal").classList.add("active");
}

function closeCheckoutModal() {
  document.getElementById("checkout-modal").classList.remove("active");
}

function processOrderCheckout(e) {
  e.preventDefault();
  const orderType = document.getElementById("order-type").value;
  const orderId = "AURA-" + Math.floor(100000 + Math.random() * 900000);

  closeCheckoutModal();
  cart = [];
  updateCartUI();

  alert(`🎉 Order Confirmed!\n\nOrder ID: ${orderId}\nType: ${orderType}\n\nThank you for choosing AURA Roastery! We will text you status updates.`);
  showToast(`Order ${orderId} placed successfully!`);
}

// --- STORY ORIGINS ---
function switchOrigin(key) {
  document.querySelectorAll(".origin-chip").forEach(c => c.classList.remove("active"));
  event.target.classList.add("active");

  const data = ORIGINS[key];
  if (data) {
    document.getElementById("origin-title").textContent = data.title;
    document.getElementById("origin-desc").textContent = data.desc;
  }
}

// --- RESERVATION & NEWSLETTER ---
function handleReservationSubmit(e) {
  e.preventDefault();
  alert("🎉 Table Reservation Submitted!\nWe have reserved your spot. A confirmation SMS & Email has been sent.");
  e.target.reset();
  showToast("Table reservation confirmed!");
}

function handleNewsletterSubmit(e) {
  e.preventDefault();
  const code = "COFFEEVIP15";
  alert(`☕ Welcome to the Aura Coffee Club!\nYour 15% Discount Code is: ${code}`);
  e.target.reset();
  showToast(`Subscribed! Promo Code: ${code}`);
}

// --- TOAST UTILITY ---
function showToast(message) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid fa-circle-info" style="color:var(--accent-gold);"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
