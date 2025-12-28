const products = [] // Declare products variable
const cart = [] // Declare cart variable

document.addEventListener("DOMContentLoaded", () => {
  initializeEventListeners()
  renderFeaturedProducts()
  renderProducts()
  updateCartCount()
})

function initializeEventListeners() {
  // Điều hướng
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", handleNavigation)
  })

  // Đóng modal
  document.querySelectorAll(".close").forEach((closeBtn) => {
    closeBtn.addEventListener("click", function () {
      this.closest(".modal").classList.remove("active")
    })
  })

  // Nút giỏ hàng
  document.getElementById("cartBtn").addEventListener("click", showCart)

  // Filters
  document.querySelectorAll(".category-filter").forEach((filter) => {
    filter.addEventListener("change", filterProducts)
  })

  document.querySelectorAll(".price-filter").forEach((filter) => {
    filter.addEventListener("change", filterProducts)
  })

  document.getElementById("sortSelect").addEventListener("change", filterProducts)

  // Quantity Selector
  document.getElementById("decreaseQty").addEventListener("click", () => {
    const input = document.getElementById("quantityInput")
    if (input.value > 1) input.value--
  })

  document.getElementById("increaseQty").addEventListener("click", () => {
    document.getElementById("quantityInput").value++
  })

  // Thêm vào giỏ
  document.getElementById("addToCartBtn").addEventListener("click", addToCart)

  // Checkout
  document.getElementById("checkoutBtn").addEventListener("click", showCheckout)
  document.getElementById("checkoutForm").addEventListener("submit", submitCheckout)

  // Mã khuyến mãi
  document.getElementById("applyPromo").addEventListener("click", applyPromo)

  // Tìm kiếm
  document.getElementById("searchInput").addEventListener("input", searchProducts)

  // Click ngoài modal để đóng
  window.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      event.target.classList.remove("active")
    }
  })
}

// Render sản phẩm nổi bật
function renderFeaturedProducts() {
  const featured = products.filter((p) => p.bestseller || p.new).slice(0, 4)
  const container = document.getElementById("featuredProducts")
  container.innerHTML = featured.map(createProductCard).join("")

  container.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", function () {
      showProductDetail(Number.parseInt(this.dataset.productId))
    })
  })
}

// Render tất cả sản phẩm
function renderProducts() {
  const container = document.getElementById("productsGrid")
  container.innerHTML = products.map(createProductCard).join("")

  container.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", function () {
      showProductDetail(Number.parseInt(this.dataset.productId))
    })
  })
}

// Update cart count
function updateCartCount() {
  document.getElementById("cartCount").textContent = cart.length
}

// Handle navigation
function handleNavigation(event) {
  event.preventDefault()
  const targetId = event.target.getAttribute("href").substring(1)
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
  })
  event.target.classList.add("active")
  document.querySelectorAll(".section").forEach((section) => {
    section.style.display = "none"
  })
  document.getElementById(targetId).style.display = "block"
}

// Show cart
function showCart() {
  document.getElementById("cartModal").classList.add("active")
}

// Filter products
function filterProducts() {
  // Implement filter logic here
}

// Add to cart
function addToCart() {
  // Implement add to cart logic here
}

// Show checkout
function showCheckout() {
  document.getElementById("checkoutModal").classList.add("active")
}

// Submit checkout
function submitCheckout(event) {
  event.preventDefault()
  // Implement checkout logic here
}

// Apply promo code
function applyPromo() {
  // Implement promo code logic here
}

// Search products
function searchProducts(event) {
  const query = event.target.value.toLowerCase()
  const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(query))
  document.getElementById("productsGrid").innerHTML = filteredProducts.map(createProductCard).join("")
}

// Create product card
function createProductCard(product) {
  return `
    <div class="product-card" data-product-id="${product.id}">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price}</p>
    </div>
  `
}

// Show product detail
function showProductDetail(productId) {
  const product = products.find((p) => p.id === productId)
  document.getElementById("productDetailModal").classList.add("active")
  document.getElementById("productDetail").innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    <p>${product.price}</p>
    <button id="addToCartBtn">Thêm vào giỏ</button>
  `
}
