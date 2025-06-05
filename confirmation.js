document.addEventListener('DOMContentLoaded', () => {
  // Inject the customer name
  const customerName = localStorage.getItem('customerName') || 'Customer';
  document.getElementById('customer-name').textContent = customerName;

  // Inject today's date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  document.getElementById('order-date').textContent = formattedDate;

  // Inject the total from the saved cart
  const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
  let subtotal = 0;
  savedCart.forEach(product => {
    subtotal += parseFloat(product.dollars + '.' + product.cents.slice(1)) * product.quantity;
  });
  document.getElementById('order-total').textContent = subtotal.toFixed(2);

});
