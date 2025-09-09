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
