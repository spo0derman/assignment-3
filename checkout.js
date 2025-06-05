document.addEventListener('DOMContentLoaded', () => {
  // Load the order summary in checkout
  const summaryList = document.querySelector('.summary-items');
  const totalPriceEl = document.querySelector('.summary-total .total-price');
  const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
  let subtotal = 0;

  savedCart.forEach(product => {
    const li = document.createElement('li');
    li.classList.add('summary-item');
    li.innerHTML = `
      <div class="img-wrapper">
        <img src="${product.image}" alt="${product.title}" width="40" />
      </div>
      <div class="item-details">
        <p>${product.title}</p>
        <p>Qty: ${product.quantity}</p>
      </div>
      <div class="item-price">
        $${(parseFloat(product.dollars + '.' + product.cents.slice(1)) * product.quantity).toFixed(2)}
      </div>
    `;
    summaryList.appendChild(li);
    subtotal += parseFloat(product.dollars + '.' + product.cents.slice(1)) * product.quantity;
  });

  totalPriceEl.textContent = `$${subtotal.toFixed(2)}`;

  // Handle checkout form submission
  const checkoutForm = document.getElementById('checkout-form');
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent actual form submission

    // Basic validation for required fields
    const requiredFields = checkoutForm.querySelectorAll('input[required], select[required]');
    let allValid = true;

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        allValid = false;
        field.classList.add('input-error');
      } else {
        field.classList.remove('input-error');
      }
    });

    if (!allValid) {
      alert('Please fill in all required fields.');
      return;
    }

    localStorage.removeItem('cart'); // Clear the cart from localStorage after checkout

    // Save customer name to localStorage for confirmation page
    const firstName = checkoutForm.querySelector('input[placeholder="First name (optional)"]').value;
    const lastName = checkoutForm.querySelector('input[placeholder="Last name"]').value;
    const customerName = `${firstName} ${lastName}`.trim() || 'Customer';
    localStorage.setItem('customerName', customerName);

    // Redirect to confirmation.html
    window.location.href = 'confirmation.html';
  });
});
