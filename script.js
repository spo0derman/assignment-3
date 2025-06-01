function setupCarousel({
  carouselSelector,
  itemSelector,
  leftNavSelector,
  rightNavSelector,
  defaultScrollAmount = 300
}) {
  const carousel = document.querySelector(carouselSelector);
  const leftButton = document.querySelector(leftNavSelector);
  const rightButton = document.querySelector(rightNavSelector);

  if (!carousel || !leftButton || !rightButton) return;

  // Function to get the width of one card (including margin)
  function getItemWidth() {
    const item = carousel.querySelector(itemSelector);
    if (!item) return defaultScrollAmount;
    const style = window.getComputedStyle(item);
    const margin = parseInt(style.marginRight) + parseInt(style.marginLeft);
    return item.offsetWidth + margin;
  }

  // Event listeners for scrolling
  leftButton.addEventListener('click', () => {
    const scrollAmount = getItemWidth();
    carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  rightButton.addEventListener('click', () => {
    const scrollAmount = getItemWidth();
    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
}



// Initialize the categories carousel
setupCarousel({
  carouselSelector: '.categories',
  itemSelector: '.categories-item',
  leftNavSelector: '.categories-nav.left',
  rightNavSelector: '.categories-nav.right'
});

// Initialize the products carousel
setupCarousel({
  carouselSelector: '.products',
  itemSelector: '.products-item',
  leftNavSelector: '.products-nav.left',
  rightNavSelector: '.products-nav.right'
});

