const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  const isClickInside = navLinks.contains(e.target) || menuToggle.contains(e.target);
  if (!isClickInside) {
    navLinks.classList.remove("open");
  }
});





