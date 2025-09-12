document.getElementById('affiliateForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  const res = await fetch('/.netlify/functions/affiliate', {
    method: 'POST',
    body: JSON.stringify(data)
  });

  const result = await res.json();
  alert(result.message || 'Form submitted!');
});





document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".video.video-left");
  if (video) {
    // Create wrapper div
    const shareDiv = document.createElement("div");
    shareDiv.classList.add("share-buttons");

    // Current video URL
    const videoUrl = window.location.href;

    // Social links
    const platforms = [
      {
        name: "LinkedIn",
        url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(videoUrl)}`,
        icon: "fab fa-linkedin-in"
      },
      {
        name: "Facebook",
        url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`,
        icon: "fab fa-facebook-f"
      },
      {
        name: "Instagram",
        url: `https://www.instagram.com/`, // no direct share, opens IG
        icon: "fab fa-instagram"
      },
      {
        name: "Discord",
        url: `https://discord.com/channels/@me`, // opens Discord
        icon: "fab fa-discord"
      }
    ];

    // Build buttons
    platforms.forEach(p => {
      const a = document.createElement("a");
      a.href = p.url;
      a.target = "_blank";
      a.title = `Share on ${p.name}`;
      a.innerHTML = `<i class="${p.icon}"></i>`;
      shareDiv.appendChild(a);
    });

    // Inject after video
    video.parentElement.style.position = "relative";
    video.parentElement.appendChild(shareDiv);
  }
});

