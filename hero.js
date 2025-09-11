// Replace createLine with createRipple
function createRipple(x, y) {
  var ripple = document.createElement('div');
  ripple.className = 'ripple';
  ripple.style.left = (x - 25) + 'px';
  ripple.style.top = (y - 25) + 'px';
  ripple.style.width = ripple.style.height = '50px';
  hero.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 1000);
}

// On mouse move, trigger ripples
hero.onmousemove = function(e) {
  createRipple(e.offsetX, e.offsetY);
};
