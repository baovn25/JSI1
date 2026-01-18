// Products page functionality
const products = [
  // Example product data
  {
    id: 1,
    name: "Product 1",
    price: 25000,
    image: "image1.jpg",
    category: "electronics",
    new: true,
    bestseller: false,
    rating: 4.5,
    description: "Description of Product 1",
    specs: "Specs of Product 1",
  },
  {
    id: 2,
    name: "Product 2",
    price: 75000,
    image: "image2.jpg",
    category: "clothing",
    new: false,
    bestseller: true,
    rating: 4.0,
    description: "Description of Product 2",
    specs: "Specs of Product 2",
  },
  // Add more products as needed
]

let filteredProducts = [...products]

function createProductCard(product) {
  return `
    <div class="product-card" data-product-id="${product.id}">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Price: ${product.price.toLocaleString()}đ</p>
      <p>Rating: ⭐${Math.floor(product.rating)}</p>
    </div>
  `
}

document.addEventListener("DOMContentLoaded", () => {
  renderAllProducts()
  setupFilters()
  updateCartCount()
})

// Render all products
function renderAllProducts() {
  const container = document.getElementById("productsGrid")
  if (!container) return

  container.innerHTML = filteredProducts.map(createProductCard).join("")

  container.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", function () {
      showProductDetail(Number.parseInt(this.dataset.productId))
    })
  })
}

// Setup filter event listeners
function setupFilters() {
  // Category filters
  document.querySelectorAll(".category-filter").forEach((filter) => {
    filter.addEventListener("change", applyFilters)
  })

  // Price filters
  document.querySelectorAll(".price-filter").forEach((filter) => {
    filter.addEventListener("change", applyFilters)
  })

  // Sort select
  const sortSelect = document.getElementById("sortSelect")
  if (sortSelect) {
    sortSelect.addEventListener("change", applySorting)
  }
}

// Apply all active filters
function applyFilters() {
  let result = [...products]

  // Category filter
  const selectedCategories = Array.from(document.querySelectorAll(".category-filter:checked"))
    .map((el) => el.value)
    .filter((val) => val !== "all")

  if (selectedCategories.length > 0) {
    result = result.filter((p) => selectedCategories.includes(p.category))
  }

  // Price filter
  const selectedPrices = Array.from(document.querySelectorAll(".price-filter:checked")).map((el) => el.value)

  if (selectedPrices.length > 0) {
    result = result.filter((p) => {
      return selectedPrices.some((range) => {
        if (range === "0-50000") return p.price < 50000
        if (range === "50000-100000") return p.price >= 50000 && p.price <= 100000
        if (range === "100000") return p.price > 100000
        return true
      })
    })
  }

  filteredProducts = result
  renderAllProducts()
}

// Apply sorting
function applySorting() {
  const sortValue = document.getElementById("sortSelect").value

  switch (sortValue) {
    case "newest":
      filteredProducts.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0))
      break
    case "bestseller":
      filteredProducts.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0))
      break
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price)
      break
    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price)
      break
    case "rating":
      filteredProducts.sort((a, b) => b.rating - a.rating)
      break
  }

  renderAllProducts()
}

// Show product detail modal
function showProductDetail(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  document.getElementById("modalImage").src = product.image
  document.getElementById("modalTitle").textContent = product.name
  document.getElementById("modalRating").textContent = "⭐".repeat(Math.floor(product.rating))
  document.getElementById("modalPrice").textContent = product.price.toLocaleString() + "đ"
  document.getElementById("modalDescription").textContent = product.description
  document.getElementById("modalSpecs").textContent = product.specs
  document.getElementById("quantityInput").value = 1

  const modal = document.getElementById("productModal")
  modal.dataset.currentProduct = productId
  modal.classList.add("active")

  // Setup modal close
  modal.querySelector(".close").onclick = () => modal.classList.remove("active")
}

// Add to cart
function addToCart() {
  const modal = document.getElementById("productModal")
  const productId = Number.parseInt(modal.dataset.currentProduct)
  const quantity = Number.parseInt(document.getElementById("quantityInput").value)
  const product = products.find((p) => p.id === productId)

  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
  modal.classList.remove("active")
  alert("✓ Đã thêm vào giỏ hàng!")
}

// Update cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  document.getElementById("cartCount").textContent = count
}

// Setup modal buttons
document.addEventListener("DOMContentLoaded", () => {
  const decreaseBtn = document.getElementById("decreaseQty")
  const increaseBtn = document.getElementById("increaseQty")
  const addBtn = document.getElementById("addToCartBtn")

  if (decreaseBtn) {
    decreaseBtn.addEventListener("click", () => {
      const input = document.getElementById("quantityInput")
      if (input.value > 1) input.value--
    })
  }

  if (increaseBtn) {
    increaseBtn.addEventListener("click", () => {
      document.getElementById("quantityInput").value++
    })
  }

  if (addBtn) {
    addBtn.addEventListener("click", addToCart)
  }
})
