/************************************
Cart Overlay Logic
************************************/
const cartBtn = document.querySelector('.shopping-cart');
const cartOverlay = document.getElementById('cart-overlay');
// const main_overlay = document.querySelector(".dark-overlay");
const closeCartBtn = document.getElementById('close-cart-btn');
const cartItemsList = cartOverlay.querySelector('.cart-items');
const subtotalDollars = cartOverlay.querySelector('.cart-footer .dollars');
const subtotalCents = cartOverlay.querySelector('.cart-footer .cents');

cartBtn.addEventListener('click', () => {
  cartOverlay.classList.remove('hidden');
  cartOverlay.classList.add('open');
});

closeCartBtn.addEventListener('click', () => {
  cartOverlay.classList.add('hidden');
  cartOverlay.classList.remove('open');
});

/************************************
Subtotal & localStorage logic
************************************/
function updateSubtotal() {
  let subtotal = 0;
  cartItemsList.querySelectorAll('.cart-item').forEach(item => {
    const dollars = item.querySelector('.product-price .dollars').textContent;
    const cents = item.querySelector('.product-price .cents').textContent.slice(1);
    const price = parseFloat(`${dollars}.${cents}`);
    const qty = parseInt(item.querySelector('.quantity').textContent);
    subtotal += price * qty;
  });
  const [d, c] = subtotal.toFixed(2).split('.');
  subtotalDollars.textContent = d;
  subtotalCents.textContent = '.' + c;
  saveCart();
}

function saveCart() {
  const cart = [];
  cartItemsList.querySelectorAll('.cart-item').forEach(item => {
    const title = item.querySelector('h4').textContent;
    const image = item.querySelector('img').src;
    const dollars = item.querySelector('.dollars').textContent;
    const cents = item.querySelector('.cents').textContent;
    const quantity = parseInt(item.querySelector('.quantity').textContent);
    cart.push({ title, image, dollars, cents, quantity });
  });
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
  const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
  savedCart.forEach(product => {
    addItemToCart(product);
  });
}

/************************************
Quantity controls
************************************/
function attachQuantityListeners() {
  cartItemsList.querySelectorAll('.increase').forEach(btn => {
    btn.onclick = () => {
      const qtySpan = btn.previousElementSibling;
      let qty = parseInt(qtySpan.textContent);
      qty++;
      qtySpan.textContent = qty;
      updateSubtotal();
    };
  });

  cartItemsList.querySelectorAll('.decrease').forEach(btn => {
    btn.onclick = () => {
      const qtySpan = btn.nextElementSibling;
      let qty = parseInt(qtySpan.textContent);
      if (qty > 1) {
        qty--;
        qtySpan.textContent = qty;
        updateSubtotal();
      }
    };
  });
}

/************************************
Remove item
************************************/
function attachRemoveListeners() {
  cartItemsList.querySelectorAll('.remove-btn').forEach(btn => {
    btn.onclick = () => {
      const cartItem = btn.closest('.cart-item');
      const separator = cartItem.nextElementSibling;
      cartItem.remove();
      // Remove the separator if it exists and has the .seperator class
      if (separator && separator.classList.contains('seperator')) {
        separator.remove();
      }
      updateSubtotal();
    };
  });
}


/************************************
Initial listeners
************************************/
attachQuantityListeners();
attachRemoveListeners();

/************************************
Add-to-Cart Logic
************************************/
document.querySelectorAll('.product-cart').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    // open the cart overlay if it's not already open
    cartOverlay.classList.remove('hidden');
    cartOverlay.classList.add('open');
    main_overlay.classList.remove("hidden");

  });

  btn.addEventListener('click', () => {
    const card = btn.closest('.product-item');
    const title = card.querySelector('.product-title').textContent;
    const image = card.querySelector('.product-image').src;
    const dollars = card.querySelector('.dollars').textContent;
    const cents = card.querySelector('.cents').textContent;
    addItemToCart({ title, image, dollars, cents, quantity: 1 });
  });
});

const productPageAddBtn = document.querySelector('.add-to-cart-btn');
if (productPageAddBtn) {
  productPageAddBtn.addEventListener('click', () => {
    const container = document.querySelector('.product-detail');
    const title = container.querySelector('.product-detail__title').textContent;
    const image = container.querySelector('.product-detail__image').src;
    const dollars = container.querySelector('.dollars').textContent;
    const cents = container.querySelector('.cents').textContent;
    const qty = parseInt(container.querySelector('.qty-number').textContent);
    addItemToCart({ title, image, dollars, cents, quantity: qty });
  });
}

/************************************
Add item to cart
************************************/
function addItemToCart(product) {
  const existingItem = Array.from(cartItemsList.querySelectorAll('.cart-item')).find(item =>
    item.querySelector('h4').textContent === product.title
  );

  if (existingItem) {
    const qtySpan = existingItem.querySelector('.quantity');
    let qty = parseInt(qtySpan.textContent);
    qty += product.quantity;
    qtySpan.textContent = qty;
  } else {
    const li = document.createElement('li');
    li.classList.add('cart-item');
    li.innerHTML = `
      <div class="img-wrapper">
        <img src="${product.image}" alt="${product.title}" />
      </div>
      <div class="item-details">
        <div class="item-top">
          <h4>${product.title}</h4>
          <button class="remove-btn">&times;</button>
        </div>
        <div class="price_and_quantity">
          <div class="quantity-controls">
            <button class="decrease">-</button>
            <span class="quantity">${product.quantity}</span>
            <button class="increase">+</button>
          </div>
          <p class="product-price">
            $<span class="dollars">${product.dollars}</span><span class="cents">${product.cents}</span>
          </p>
        </div>
      </div>
    `;
    const separator = document.createElement('div');
    separator.classList.add('seperator');
    cartItemsList.appendChild(li);
    cartItemsList.appendChild(separator);
  }

  attachQuantityListeners();
  attachRemoveListeners();
  updateSubtotal();
}

/************************************
Load Cart from localStorage on page load
************************************/
loadCart();
// Add event listener for checkout button
document.querySelector('.checkout-btn').addEventListener('click', () => {
  window.location.href = 'checkout.html';
});
// Ensure the cart overlay is closed when navigating to checkout
cartOverlay.classList.add('hidden');
cartOverlay.classList.remove('open');