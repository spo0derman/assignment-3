// This script handles the functionality of the categories carousel
document.querySelector('.categories-nav.left').addEventListener('click', () => {
  document.getElementById('categories').scrollBy({ left: -300, behavior: 'smooth' });
});

document.querySelector('.categories-nav.right').addEventListener('click', () => {
  document.getElementById('categories').scrollBy({ left: 300, behavior: 'smooth' });
});


const cat_carousel = document.getElementById('categories');
const cat_leftButton = document.querySelector('.categories-nav.left');
const cat_rightButton = document.querySelector('.categories-nav.right');

// Get the width of one card (including margin)
function getItemWidth() {
  const cat_item = cat_carousel.querySelector('.categories-item');
  const cat_style = window.getComputedStyle(cat_item);
  const cat_margin = parseInt(cat_style.marginRight) + parseInt(cat_style.marginLeft);
  return cat_item.offsetWidth + cat_margin;
}

cat_leftButton.addEventListener('click', () => {
  const cat_scrollAmount = getItemWidth();
  cat_carousel.scrollBy({ left: -cat_scrollAmount, behavior: 'smooth' });
});

cat_rightButton.addEventListener('click', () => {
  const cat_scrollAmount = getItemWidth();
  cat_carousel.scrollBy({ left: cat_scrollAmount, behavior: 'smooth' });
});


// This script handles the functionality of the products carousel
document.querySelector('.products-nav.left').addEventListener('click', () => {
  document.getElementById('products').scrollBy({ left: -300, behavior: 'smooth' });
});

document.querySelector('.products-nav.right').addEventListener('click', () => {
  document.getElementById('products').scrollBy({ left: 300, behavior: 'smooth' });
});


const prod_carousel = document.getElementById('products');
const prod_leftButton = document.querySelector('.products-nav.left');
const prod_rightButton = document.querySelector('.products-nav.right');

// Get the width of one card (including margin)
function getItemWidth() {
  const prod_item = prod_carousel.querySelector('.products-item');
  const prod_style = window.getComputedStyle(item);
  const prod_margin = parseInt(prod_style.marginRight) + parseInt(style.marginLeft);
  return prod_item.offsetWidth + prod_margin;
}

leftButton.addEventListener('click', () => {
  const prod_scrollAmount = getItemWidth();
  prod_carousel.scrollBy({ left: -prod_scrollAmount, behavior: 'smooth' });
});

rightButton.addEventListener('click', () => {
  const prod_scrollAmount = getItemWidth();
  prod_carousel.scrollBy({ left: prod_scrollAmount, behavior: 'smooth' });
});

