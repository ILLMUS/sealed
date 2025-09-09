document.querySelectorAll('.scroll-to-btn').forEach(button => {
  button.addEventListener('click', e => {
    e.preventDefault();
    const targetId = button.getAttribute('data-target');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

