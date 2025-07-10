// Global variables
let products = [];
let currentProduct = null;

// Load products from JSON file
async function loadProducts() {
  try {
    const response = await fetch("products.json");
    const data = await response.json();
    products = data.products;
    return products;
  } catch (error) {
    console.error("Error loading products:", error);
    return [];
  }
}

// Get product ID from URL parameter
function getProductIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get("id")) || 1; // Default to product ID 1
}

// Find product by ID
function findProductById(id) {
  return products.find((product) => product.id === id);
}

// Generate star rating HTML
function generateStars(rating) {
  let starsHTML = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      starsHTML += '<i class="fa fa-star rating"></i>';
    } else {
      starsHTML += '<i class="fa fa-star"></i>';
    }
  }
  return starsHTML;
}

// Load product details into the page
function loadProductDetails(product) {
  if (!product) return;

  // Update page title and breadcrumb
  document.title = ` Fruitables - ${product.name}`;
  document.getElementById("page-title").textContent = product.name;
  document.getElementById("breadcrumb-product").textContent = product.name;

  // Update product image
  document.getElementById("product-image").src = product.image;
  document.getElementById("product-image").alt = product.name;

  // Update product information
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-category").textContent = product.category;
  document.getElementById(
    "product-price"
  ).textContent = `$${product.price.toFixed(2)}`;
  document.getElementById("product-description").textContent =
    product.description;
  document.getElementById("product-long-description").textContent =
    product.longDescription;

  // Update rating stars
  document.getElementById("product-rating").innerHTML = generateStars(
    product.rating
  );

  // Update specifications
  document.getElementById("spec-weight").textContent =
    product.specifications.weight;
  document.getElementById("spec-origin").textContent =
    product.specifications.origin;
  document.getElementById("spec-quality").textContent =
    product.specifications.quality;
  document.getElementById("spec-check").textContent =
    product.specifications.check;
  document.getElementById("spec-min-weight").textContent =
    product.specifications.minWeight;

  // Update description tab content
  document.getElementById("description-text").textContent = product.description;
  document.getElementById("long-description-text").textContent =
    product.longDescription;

  // Load reviews
  loadReviews(product.reviews);
}

// Load reviews into the reviews tab
function loadReviews(reviews) {
  const reviewsContainer = document.getElementById("reviews-container");

  if (reviews.length === 0) {
    reviewsContainer.innerHTML =
      '<p class="text-muted">No reviews yet. Be the first to review this product!</p>';
    return;
  }

  let reviewsHTML = "";
  reviews.forEach((review) => {
    reviewsHTML += `
      <div class="d-flex">
        <img
          src="img/avatar.jpg"
          class="img-fluid rounded-circle p-3"
          style="width: 100px; height: 100px"
          alt=""
        />
        <div class="">
          <p class="mb-2" style="font-size: 14px">${review.date}</p>
          <div class="d-flex justify-content-between" style="font-size: 16px;">
            <h5>${review.user}</h5>
            <div class="d-flex mb-3">
              ${generateStars(review.rating)}
            </div>
          </div>
          <p style="font-size: 16px;">${review.comment}</p>
        </div>
      </div>
    `;
  });

  reviewsContainer.innerHTML = reviewsHTML;
}

// Load categories sidebar
function loadCategories() {
  const categories = {};
  products.forEach((product) => {
    if (categories[product.category]) {
      categories[product.category]++;
    } else {
      categories[product.category] = 1;
    }
  });

  const categoriesList = document.getElementById("categories-list");
  let categoriesHTML = "";

  Object.entries(categories).forEach(([category, count]) => {
    categoriesHTML += `
      <li>
        <div class="d-flex justify-content-between fruite-name">
          <a href="#"><i class="fas fa-apple-alt me-2"></i>${category}</a>
          <span>(${count})</span>
        </div>
      </li>
    `;
  });

  categoriesList.innerHTML = categoriesHTML;
}

// Load featured products sidebar
function loadFeaturedProducts() {
  const featuredProducts = products.slice(0, 6); // Show first 6 products as featured
  const featuredContainer = document.getElementById("featured-products");

  let featuredHTML = "";
  featuredProducts.forEach((product) => {
    featuredHTML += `
      <div class="d-flex align-items-center justify-content-start">
        <div class="rounded" style="width: 100px; height: 100px">
          <img
            src="${product.image}"
            class="img-fluid rounded"
            alt="${product.name}"
          />
        </div>
        <div>
          <h6 class="mb-2">${product.name}</h6>
          <div class="d-flex mb-2">
            ${generateStars(product.rating)}
          </div>
          <div class="d-flex mb-2">
            <h5 class="fw-bold me-2">$${product.price.toFixed(2)}</h5>
            <h5 class="text-danger text-decoration-line-through">
              $${product.originalPrice.toFixed(2)}
            </h5>
          </div>
        </div>
      </div>
    `;
  });

  featuredContainer.innerHTML = featuredHTML;
}

// Load related products carousel
function loadRelatedProducts(currentProductId) {
  const relatedProducts = products
    .filter(
      (product) =>
        product.id !== currentProductId &&
        product.category === currentProduct.category
    )
    .slice(0, 8); // Show up to 8 related products

  const relatedContainer = document.getElementById("related-products");

  let relatedHTML = "";
  relatedProducts.forEach((product) => {
    relatedHTML += `
      <div class="border border-primary rounded position-relative vesitable-item">
        <div class="vesitable-img">
          <img
            src="${product.image}"
            class="img-fluid w-100 rounded-top"
            alt="${product.name}"
          />
        </div>
        <div
          class="text-white bg-primary px-3 py-1 rounded position-absolute"
          style="top: 10px; right: 10px"
        >
          ${product.category}
        </div>
        <div class="p-4 pb-0 rounded-bottom">
          <h4>${product.name}</h4>
          <p>${product.description}</p>
          <div class="d-flex justify-content-between flex-lg-wrap">
            <p class="text-dark fs-5 fw-bold">$${product.price.toFixed(
              2
            )} / kg</p>
            <a
              href="product-detail.html?id=${product.id}"
              class="btn border border-secondary rounded-pill px-3 py-1 mb-4 addcart"
            ><i class="fa fa-shopping-bag me-2 addcart"></i> Add to cart</a>
          </div>
        </div>
      </div>
    `;
  });

  relatedContainer.innerHTML = relatedHTML;

  // Reinitialize carousel after loading content
  if (relatedProducts.length > 0) {
    $(".vegetable-carousel").owlCarousel({
      autoplay: true,
      smartSpeed: 1250,
      loop: true,
      margin: 20,
      dots: true,
      nav: true,
      navText: [
        '<i class="bi bi-arrow-left"></i>',
        '<i class="bi bi-arrow-right"></i>',
      ],
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        992: { items: 4 },
      },
    });
  }
}

// Initialize the page
async function initializePage() {
  await loadProducts();

  const productId = getProductIdFromUrl();
  currentProduct = findProductById(productId);

  if (currentProduct) {
    loadProductDetails(currentProduct);
    loadCategories();
    loadFeaturedProducts();
    loadRelatedProducts(productId);
  } else {
    console.error("Product not found");
    // Redirect to first product or show error
    window.location.href = "product-detail.html?id=1";
  }
}

// Add click handlers for featured products
function addFeaturedProductHandlers() {
  document.addEventListener("click", function (e) {
    if (e.target.closest("#featured-products .d-flex")) {
      const productElement = e.target.closest("#featured-products .d-flex");
      const productName = productElement.querySelector("h6").textContent;
      const product = products.find((p) => p.name === productName);

      if (product) {
        window.location.href = `product-detail.html?id=${product.id}`;
      }
    }
  });
}

// Initialize when DOM is loaded
$(document).ready(function () {
  initializePage();
  addFeaturedProductHandlers();
});
// Carousel oklarını başlığa taşı
$(".vegetable-carousel").on("initialized.owl.carousel", function () {
  var nav = $(".vegetable-carousel .owl-nav").html();
  $(".related-products-header .owl-nav-custom").html(nav);
  $(".owl-nav-custom .owl-prev").click(function () {
    $(".vegetable-carousel").trigger("prev.owl.carousel");
  });
  $(".owl-nav-custom .owl-next").click(function () {
    $(".vegetable-carousel").trigger("next.owl.carousel");
  });
});

// Adet arttır/azalt
$(".btn-plus").click(function () {
  var $input = $(this).closest(".quantity").find("input");
  $input.val(+($input.val() || 0) + 1);
});
$(".btn-minus").click(function () {
  var $input = $(this).closest(".quantity").find("input");
  var val = +($input.val() || 0);
  if (val > 0) $input.val(val - 1);
});

// Tab geçişleri
$(".nav-tabs .nav-link").click(function () {
  $(".nav-link.active, .tab-pane.active").removeClass("active");
  $(this).addClass("active");
  $($(this).data("bs-target")).addClass("active");
});