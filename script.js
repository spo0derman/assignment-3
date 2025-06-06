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

  function getItemWidth() {
    const item = carousel.querySelector(itemSelector);
    if (!item) return defaultScrollAmount;
    const style = window.getComputedStyle(item);
    const margin = parseInt(style.marginRight) + parseInt(style.marginLeft);
    return item.offsetWidth + margin;
  }

  leftButton.addEventListener('click', () => {
    const scrollAmount = getItemWidth();
    carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  rightButton.addEventListener('click', () => {
    const scrollAmount = getItemWidth();
    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
}

// Initialize carousels
setupCarousel({
  carouselSelector: '.categories',
  itemSelector: '.categories-item',
  leftNavSelector: '.categories-nav.left',
  rightNavSelector: '.categories-nav.right'
});

setupCarousel({
  carouselSelector: '.products',
  itemSelector: '.products-item',
  leftNavSelector: '.products-nav.left',
  rightNavSelector: '.products-nav.right'
});

const searchOverlay = document.querySelector(".search-overlay");
const main_overlay = document.querySelector(".dark-overlay");
const delivery = document.getElementById('delivery');
const nav = document.querySelector('nav');

const deliveryHeight = delivery.offsetHeight;
const navHeight = nav.offsetHeight;
const offsetHeight = deliveryHeight + navHeight;

// Initial top positions
nav.style.top = `${deliveryHeight}px`;
searchOverlay.style.top = `${offsetHeight}px`;
nav.style.position = 'fixed';
nav.style.transition = 'top 0.3s ease';
searchOverlay.style.position = 'fixed';
searchOverlay.style.transition = 'top 0.3s ease';

// Show/hide overlays on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    nav.style.top = '0';
    searchOverlay.style.top = `${navHeight}px`;
  } else {
    nav.style.top = `${deliveryHeight}px`;
    searchOverlay.style.top = `${offsetHeight}px`;
  }
  searchOverlay.classList.add("hidden");
  main_overlay.classList.add("hidden");
});

// Update nav for mobile
window.addEventListener('DOMContentLoaded', () => {
  updateNavbarForMobile();
  attachNavbarListeners();
});
window.addEventListener('resize', () => {
  updateNavbarForMobile();
  attachNavbarListeners();
});

function updateNavbarForMobile() {
  if (window.innerWidth <= 768) {
    const nav = document.querySelector('nav');
    nav.innerHTML = `
      <button class="material-symbols-rounded menu-toggle">menu</button>
      <a href="index.html" class="logo-link">
        <img src="logo.avif" alt="logo image" class="logo">
      </a>
      <ul class="nav-right">
        <li>
          <button class="search material-symbols-rounded open-search"> search </button>
        </li>
        <li>
          <button class="shopping-cart material-symbols-rounded"> shopping_bag </button>
        </li>
      </ul>
    `;

    // Reattach cart button logic here!
    const newCartBtn = document.querySelector('.shopping-cart');
    newCartBtn.addEventListener('click', () => {
      cartOverlay.classList.remove('hidden');
      cartOverlay.classList.add('open');
    });
  }
}

// Re-attach listeners for dynamic elements
function attachNavbarListeners() {
  const searchButton = document.querySelector(".open-search");
  const closeButton = document.querySelector(".close-search");
  const menuToggle = document.querySelector('.menu-toggle');

  if (searchButton) {
    searchButton.addEventListener("click", () => {
      searchOverlay.classList.remove("hidden");
      main_overlay.classList.remove("hidden");
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      searchOverlay.classList.add("hidden");
      main_overlay.classList.add("hidden");
    });
  }

  document.addEventListener('click', (event) => {
    const isClickInsideSearch = searchOverlay.contains(event.target);
    const isSearchButton = event.target.closest('.open-search');
    if (!isClickInsideSearch && !isSearchButton) {
      searchOverlay.classList.add("hidden");
      main_overlay.classList.add("hidden");
    }
  });

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      console.log("Menu clicked!");
      // Implement your menu toggle logic
    });
  }
}

