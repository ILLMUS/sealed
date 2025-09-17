// Get all Read More buttons
const readMoreButtons = document.querySelectorAll('.read-more-btn');

// Get all modals
const modals = document.querySelectorAll('.modal');

// Open modal on button click
readMoreButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const modalId = btn.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'flex';
  });
});

// Close modal on click of close button
modals.forEach(modal => {
  const closeBtn = modal.querySelector('.close');
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Close modal on click outside content
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
});
