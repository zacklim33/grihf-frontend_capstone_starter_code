// Select elements
const toggleButton = document.querySelector('.toggle-button');
const navbar = document.querySelector('.navbar');

// Toggle the 'active' class on click
toggleButton.addEventListener('click', () => {
  navbar.classList.toggle('active');
});

// Close the menu when clicking outside
document.addEventListener('click', (event) => {
  if (!navbar.contains(event.target) && navbar.classList.contains('active')) {
    navbar.classList.remove('active');
  }
});
