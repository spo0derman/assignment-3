document.querySelectorAll('.thumbnail .img-wrapper').forEach(thumbnail => {
  thumbnail.addEventListener('click', () => {
    // Remove .tbn-selected from all thumbnails
    document.querySelectorAll('.thumbnail .img-wrapper').forEach(item => {
      item.classList.remove('tbn-selected');
      item.classList.add('tbn-unselected');
    });
    
    // Add .tbn-selected to clicked thumbnail
    thumbnail.classList.add('tbn-selected');
    thumbnail.classList.remove('tbn-unselected');
  });
});

// If you also want the arrows to trigger the selection change:
document.querySelectorAll('.carousel-button').forEach(button => {
  button.addEventListener('click', () => {
    // Example: find which thumbnail should be "selected"
    // and add .tbn-selected to it.
    // For demonstration, here’s a simple approach:
    
    // Get all thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail .img-wrapper');
    
    // Find currently selected index
    const currentIndex = Array.from(thumbnails).findIndex(tn => tn.classList.contains('tbn-selected'));
    
    // Determine next index
    let nextIndex;
    if (button.classList.contains('left')) {
      nextIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    } else {
      nextIndex = (currentIndex + 1) % thumbnails.length;
    }
    
    // Update classes
    thumbnails.forEach(item => {
      item.classList.remove('tbn-selected');
      item.classList.add('tbn-unselected');
    });
    thumbnails[nextIndex].classList.add('tbn-selected');
    thumbnails[nextIndex].classList.remove('tbn-unselected');
  });
});

const buyOptions = document.querySelectorAll('input[name="buy-option"]');
const qtyNumber = document.querySelector('.qty-number');
const qtyBtns = document.querySelectorAll('.qty-btn');

buyOptions.forEach(option => {
  option.addEventListener('change', () => {
    if (option.parentNode && option.parentNode.textContent.includes('Buy 2 with 10% off')) {
      qtyNumber.textContent = '2';
    } else {
      qtyNumber.textContent = '1';
    }
  });
});

qtyBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    let qty = parseInt(qtyNumber.textContent);
    if (btn.textContent.trim() === '+') {
      qty++;
    } else if (btn.textContent.trim() === '−' && qty > 1) {
      qty--;
    }
    qtyNumber.textContent = qty;
  });
});

// Update the quantity number based on the selected buy option