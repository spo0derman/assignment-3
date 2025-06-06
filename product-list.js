const productGrid = document.querySelector('.products-container .carousel');
const layoutButtons = document.querySelectorAll('.layout-button');

// Default to layout-2x2 on mobile view
if (window.innerWidth <= 768) {
  productGrid.classList.remove('layout-3x4', 'layout-3x3', 'layout-list');
  productGrid.classList.add('layout-2x2');

  // Set correct icon state
  layoutButtons.forEach(btn => {
    const img = btn.querySelector('img');
    const baseSrc = img.src.replace(/-(current|normal)\.png$/, '');
    const isTwoByTwo = btn.dataset.layout === 'layout-2x2';
    img.src = baseSrc + (isTwoByTwo ? '-current.png' : '-normal.png');

    btn.classList.remove('view-current', 'view-normal');
    btn.classList.add(isTwoByTwo ? 'view-current' : 'view-normal');
  });
}

// Layout button logic
layoutButtons.forEach(button => {
  button.addEventListener('click', () => {
    productGrid.classList.remove('layout-3x4', 'layout-3x3', 'layout-2x2', 'layout-list');
    const newLayout = button.dataset.layout;
    productGrid.classList.add(newLayout);

    layoutButtons.forEach(btn => {
      const img = btn.querySelector('img');
      const baseSrc = img.src.replace(/-(current|normal)\.png$/, '');
      img.src = baseSrc + '-normal.png';
      btn.classList.remove('view-current');
      btn.classList.add('view-normal');
    });

    const clickedImg = button.querySelector('img');
    const baseSrc = clickedImg.src.replace(/-(current|normal)\.png$/, '');
    clickedImg.src = baseSrc + '-current.png';
    button.classList.remove('view-normal');
    button.classList.add('view-current');
  });
});
