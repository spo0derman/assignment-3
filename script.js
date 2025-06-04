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


const searchButton = document.querySelector(".open-search");
const searchOverlay = document.querySelector(".search-overlay");
const closeButton = document.querySelector(".close-search");
const main_overlay = document.querySelector(".dark-overlay");


searchButton.addEventListener("click", () => {
  searchOverlay.classList.remove("hidden");
  main_overlay.classList.remove("hidden");
});

closeButton.addEventListener("click", () => {
  searchOverlay.classList.add("hidden");
  main_overlay.classList.add("hidden");
});

document.addEventListener('click', (event) => {
  const isClickInsideSearch = searchOverlay.contains(event.target);
  const isSearchButton = event.target.closest('.open-search');

  if (!isClickInsideSearch && !isSearchButton) {
    searchOverlay.classList.add("hidden");
    main_overlay.classList.add("hidden");
  }
});

// Get the height of the .delivery element
const delivery = document.getElementById('delivery');
const nav = document.querySelector('nav');


const deliveryHeight = delivery.offsetHeight;
const navHeight = nav.offsetHeight;
const offsetHeight = deliveryHeight + navHeight;

// Set initial top positions
nav.style.top = `${deliveryHeight}px`;
searchOverlay.style.top = `${offsetHeight}px`;

// Smooth top transition for nav
nav.style.position = 'fixed';
nav.style.transition = 'top 0.3s ease';

// Adjust searchOverlay to always appear below the nav
searchOverlay.style.position = 'fixed';
searchOverlay.style.transition = 'top 0.3s ease';

// Update nav and searchOverlay positions on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 0 ) {
    nav.style.top = '0';
    searchOverlay.style.top = `${navHeight}px`;
  } else {
    nav.style.top = `${deliveryHeight}px`;
    searchOverlay.style.top = `${offsetHeight}px`;
  }

  // Smooth fade out overlays on scroll
  searchOverlay.classList.add("hidden");
  main_overlay.classList.add("hidden");
});




