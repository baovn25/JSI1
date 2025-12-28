// Contact page
document.addEventListener("DOMContentLoaded", () => {
  setupContactForm()
  updateCartCount()
})

// Setup contact form
function setupContactForm() {
  const form = document.getElementById("contactForm")
  if (form) {
    form.addEventListener("submit", handleContactSubmit)
  }
}

// Handle contact form submission
function handleContactSubmit(e) {
  e.preventDefault()

  const formData = {
    name: e.target[0].value,
    email: e.target[1].value,
    phone: e.target[2].value,
    message: e.target[3].value,
    timestamp: new Date().toLocaleString("vi-VN"),
  }

  // Save to localStorage
  const messages = JSON.parse(localStorage.getItem("contactMessages")) || []
  messages.push(formData)
  localStorage.setItem("contactMessages", JSON.stringify(messages))

  alert("✓ Cảm ơn bạn! Chúng tôi sẽ liên hệ với bạn sớm.")
  e.target.reset()
}

// Update cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  document.getElementById("cartCount").textContent = count
}
