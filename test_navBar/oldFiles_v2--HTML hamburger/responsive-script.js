// responsive-script.js
document.addEventListener('DOMContentLoaded', () => {
  // Select elements properly
  const menuToggle = document.getElementById('menu-toggle');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navbar = document.querySelector('.navbar');

  if (!menuToggle || !hamburger || !navLinks || !navbar) {
      console.error('One or more elements not found!');
      return;
  }


  // Close menu and remove active state
  const closeMenu = () => {
        menuToggle.checked = false;
        hamburger.classList.remove('active'); // Remove active class
    };

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
      const isClickInside = navbar.contains(event.target);
      const isHamburger = event.target === hamburger || hamburger.contains(event.target);
      
      if (!isClickInside && !isHamburger && menuToggle.checked) closeMenu();
  });

  // Hamburger animation
  hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
  });

});