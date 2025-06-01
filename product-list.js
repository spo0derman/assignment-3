const productGrid = document.querySelector('.products-container .carousel');
const layoutButtons = document.querySelectorAll('.layout-button');

layoutButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove old layout classes from product grid
    productGrid.classList.remove('layout-3x4', 'layout-3x3', 'layout-2x2', 'layout-list');
    
    // Add the new layout class
    const newLayout = button.dataset.layout;
    productGrid.classList.add(newLayout);

    // Update icons: remove 'view-current', add 'view-normal', switch images
    layoutButtons.forEach(btn => {
      const img = btn.querySelector('img');
      const baseSrc = img.src.replace(/-(current|normal)\.png$/, '');
      img.src = baseSrc + '-normal.png';
      btn.classList.remove('view-current');
      btn.classList.add('view-normal');
    });

    // Set clicked button as active and update its icon
    const clickedImg = button.querySelector('img');
    const baseSrc = clickedImg.src.replace(/-(current|normal)\.png$/, '');
    clickedImg.src = baseSrc + '-current.png';
    button.classList.remove('view-normal');
    button.classList.add('view-current');
  });
});
