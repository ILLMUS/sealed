// Auto-rotate testimonials slider
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.remove('active');
    if(i === index) t.classList.add('active');
  });
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}

// Initialize
showTestimonial(currentTestimonial);
setInterval(nextTestimonial, 5000); // Change every 5s
