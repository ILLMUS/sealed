const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let columns = canvas.width / 20;
let drops = Array.from({ length: columns }).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#00ffcc';
  ctx.font = '16px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = Math.random() > 0.5 ? "1" : "0";
    ctx.fillText(text, i * 20, drops[i] * 20);

    if (drops[i] * 20 > canvas.height || Math.random() > 0.95) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 50);




let currentIndex = 0;

function slideShow() {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(-${currentIndex * 100}%)`;
    });

    currentIndex = (currentIndex + 1) % slides.length;
}

setInterval(slideShow, 4000);









