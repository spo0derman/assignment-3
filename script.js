document.querySelector('.categories-nav.left').addEventListener('click', () => {
  document.getElementById('categories').scrollBy({ left: -300, behavior: 'smooth' });
});

document.querySelector('.categories-nav.right').addEventListener('click', () => {
  document.getElementById('categories').scrollBy({ left: 300, behavior: 'smooth' });
});


const carousel = document.getElementById('categories');
const leftButton = document.querySelector('.categories-nav.left');
const rightButton = document.querySelector('.categories-nav.right');

// Get the width of one card (including margin)
function getItemWidth() {
  const item = carousel.querySelector('.item');
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

