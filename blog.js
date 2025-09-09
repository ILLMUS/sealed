const buttons = document.querySelectorAll('.read-more-btn');
const modals = document.querySelectorAll('.modal');
const closeBtns = document.querySelectorAll('.close');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = document.getElementById(btn.dataset.modal);
    modal.style.display = 'block';
  });
});

closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.parentElement.parentElement.style.display = 'none';
  });
});

window.addEventListener('click', e => {
  if(e.target.classList.contains('modal')){
    e.target.style.display = 'none';
  }
});


