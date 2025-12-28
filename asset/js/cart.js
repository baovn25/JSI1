let cart = JSON.parse(localStorage.getItem("cart")) || []
let currentProduct = null
const products = [
  {
    id: 1,
    name: "Product 1",
    price: 100000,
    image: "image1.jpg",
    rating: 4.5,
    description: "Description 1",
    specs: "Specs 1",
  },
  {
    id: 2,
    name: "Product 2",
    price: 200000,
    image: "image2.jpg",
    rating: 4.0,
    description: "Description 2",
    specs: "Specs 2",
  },
  // Add more products here
]

// Hiển thị chi tiết sản phẩm
function showProductDetail(productId) {
  currentProduct = products.find((p) => p.id === productId)

  document.getElementById("modalImage").src = currentProduct.image
  document.getElementById("modalTitle").textContent = currentProduct.name
  document.getElementById("modalRating").textContent = "⭐".repeat(Math.floor(currentProduct.rating))
  document.getElementById("modalPrice").textContent = currentProduct.price.toLocaleString() + "đ"
  document.getElementById("modalDescription").textContent = currentProduct.description
  document.getElementById("modalSpecs").textContent = currentProduct.specs
  document.getElementById("quantityInput").value = 1

  document.getElementById("productModal").classList.add("active")
}

// Thêm vào giỏ hàng
function addToCart() {
  const quantity = Number.parseInt(document.getElementById("quantityInput").value)
  const existingItem = cart.find((item) => item.id === currentProduct.id)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({
      id: currentProduct.id,
      name: currentProduct.name,
      price: currentProduct.price,
      image: currentProduct.image,
      quantity: quantity,
    })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
  document.getElementById("productModal").classList.remove("active")
  alert("Đã thêm vào giỏ hàng!")
}

// Cập nhật số lượng sản phẩm trong giỏ
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  document.getElementById("cartCount").textContent = count
}

// Hiển thị giỏ hàng
function showCart() {
  renderCartItems()
  updateCartSummary()
  document.getElementById("cartModal").classList.add("active")
}

// Render các item trong giỏ hàng
function renderCartItems() {
  const container = document.getElementById("cartItems")

  if (cart.length === 0) {
    container.innerHTML = '<p style="text-align: center; padding: 2rem;">Giỏ hàng trống</p>'
    return
  }

  container.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>${item.price.toLocaleString()}đ x ${item.quantity}</p>
            </div>
            <div class="cart-item-price">${(item.price * item.quantity).toLocaleString()}đ</div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Xóa</button>
        </div>
    `,
    )
    .join("")
}

// Xóa khỏi giỏ hàng
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId)
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
  renderCartItems()
  updateCartSummary()
}

// Cập nhật tóm tắt giỏ hàng
function updateCartSummary() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal >= 500000 ? 0 : subtotal > 0 ? 50000 : 0
  const total = subtotal + shipping

  document.getElementById("subtotal").textContent = subtotal.toLocaleString()
  document.getElementById("shipping").textContent = shipping.toLocaleString()
  document.getElementById("total").textContent = total.toLocaleString()
  document.getElementById("checkoutTotal").textContent = total.toLocaleString()
}

// Áp dụng mã khuyến mãi
function applyPromo() {
  const code = document.getElementById("promoCode").value
  let discount = 0

  if (code === "WELCOME20") {
    discount = 0.2
  } else if (code === "PROMO5") {
    discount = 0.1
  } else {
    alert("Mã khuyến mãi không hợp lệ")
    return
  }

  alert("Áp dụng mã khuyến mãi thành công!")
}
