$(document).ready(function () {
  // Carousel başlatma
  $(".vegetable-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    center: false,
    dots: true,
    loop: true,
    margin: 25,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    responsiveClass: true,
    responsive: {
      0: { items: 1 },
      576: { items: 1 },
      768: { items: 2 },
      992: { items: 3 },
      1200: { items: 4 },
    },
  });

  // Okları başlığın sağına taşı
  $(".vegetable-carousel").on("initialized.owl.carousel", function () {
    $(".related-products-header .owl-nav-custom").html(
      $(".vegetable-carousel .owl-nav").html()
    );
    // Oklar tıklanınca carousel'i hareket ettir
    $(".related-products-header .owl-nav-custom .owl-prev").click(function () {
      $(".vegetable-carousel").trigger("prev.owl.carousel");
    });
    $(".related-products-header .owl-nav-custom .owl-next").click(function () {
      $(".vegetable-carousel").trigger("next.owl.carousel");
    });
  });

  // Quantity arttırma ve azaltma
  $(".btn-plus").click(function () {
    const $input = $(this).closest(".quantity").find("input");
    let val = parseInt($input.val()) || 0;
    $input.val(val + 1);
  });
  $(".btn-minus").click(function () {
    const $input = $(this).closest(".quantity").find("input");
    let val = parseInt($input.val()) || 0;
    if (val > 0) {
      $input.val(val - 1);
    }
  });
});
const tabButtons = document.querySelectorAll(".nav-tabs .nav-link");
const tabPanes = document.querySelectorAll(".tab-pane");

tabButtons.forEach((btn, idx) => {
  btn.addEventListener("click", function () {
    // Tüm tabları pasif yap
    tabButtons.forEach((b) => b.classList.remove("active"));
    tabPanes.forEach((p) => p.classList.remove("active"));

    // Tıklanan tabı aktif yap
    btn.classList.add("active");
    const target = btn.getAttribute("data-bs-target");
    document.querySelector(target).classList.add("active");
  });
});