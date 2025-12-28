const products = [] // Declare the products variable
function filterProducts() {
  const selectedCategories = Array.from(document.querySelectorAll(".category-filter:checked")).map((f) => f.value)
  const selectedPrices = Array.from(document.querySelectorAll(".price-filter:checked")).map((f) => f.value)
  const sortBy = document.getElementById("sortSelect").value

  let filtered = products

  // Lọc theo danh mục
  if (selectedCategories.length > 0 && !selectedCategories.includes("all")) {
    filtered = filtered.filter((p) => selectedCategories.includes(p.category))
  }

  // Lọc theo giá
  if (selectedPrices.length > 0) {
    filtered = filtered.filter((p) => {
      for (const priceRange of selectedPrices) {
        if (priceRange === "0-50000" && p.price < 50000) return true
        if (priceRange === "50000-100000" && p.price >= 50000 && p.price <= 100000) return true
        if (priceRange === "100000" && p.price > 100000) return true
      }
      return false
    })
  }

  // Sắp xếp
  switch (sortBy) {
    case "price-low":
      filtered.sort((a, b) => a.price - b.price)
      break
    case "price-high":
      filtered.sort((a, b) => b.price - a.price)
      break
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating)
      break
    case "bestseller":
      filtered.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0))
      break
  }

  renderFilteredProducts(filtered)
}

// Render sản phẩm đã lọc
function renderFilteredProducts(filtered) {
  const container = document.getElementById("productsGrid")
  container.innerHTML =
    filtered.length > 0
      ? filtered.map(createProductCard).join("")
      : '<p style="grid-column: 1/-1; text-align: center;">Không tìm thấy sản phẩm</p>'

  container.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", function () {
      showProductDetail(Number.parseInt(this.dataset.productId))
    })
  })
}

// Tìm kiếm sản phẩm
function searchProducts(e) {
  const query = e.target.value.toLowerCase()
  const filtered = products.filter((p) => p.name.toLowerCase().includes(query))

  renderFilteredProducts(filtered)
}

// Tạo HTML thẻ sản phẩm
function createProductCard(product) {
  return `
        <div class="product-card" data-product-id="${product.id}" data-category="${product.category}" data-price="${product.price}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-content">
                <div class="product-name">${product.name}</div>
                <div class="product-rating">${"⭐".repeat(Math.floor(product.rating))}</div>
                <div class="product-price">${product.price.toLocaleString()}đ</div>
            </div>
        </div>
    `
}

function showProductDetail(productId) {
  // Implementation for showing product detail
  console.log(`Product detail for ID ${productId}`)
}
