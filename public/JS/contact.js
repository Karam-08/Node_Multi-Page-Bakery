const form = document.getElementById('contactForm');
const confirmation = document.getElementById('confirmation');

form.addEventListener('submit', function(e){
  e.preventDefault(); // Prevents actual form submission
  // Show confirmation message
  confirmation.style.display = 'block';
});