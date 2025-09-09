// Select all fade-up groups (hero is untouched)
const fadeGroups = document.querySelectorAll('.fade-up-group');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const children = entry.target.querySelectorAll(':scope > *');
      children.forEach((child, index) => {
        setTimeout(() => {
          child.classList.add('visible');
        }, index * 200); // stagger delay
      });
    }
  });
}, { threshold: 0.2 });

// Observe each fade-up group
fadeGroups.forEach(group => observer.observe(group));
