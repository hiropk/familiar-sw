document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");

    // アクセシビリティ対応
    const isOpen = hamburger.classList.contains("active");
    hamburger.setAttribute("aria-expanded", isOpen);
    nav.setAttribute("aria-hidden", !isOpen);
  });

  function closeDisplayMenu() {
    hamburger.classList.remove("active");
    nav.classList.remove("active");
    hamburger.setAttribute("aria-expanded", false);
    nav.setAttribute("aria-hidden", true);
  }

  // メニューの外側をクリックした時の処理
  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".nav") &&
      !e.target.closest(".hamburger") &&
      nav.classList.contains("active")
    ) {
      closeDisplayMenu();
    }
  });

  // 表示されたメニューの項目をクリックした時の処理
  const display_menu = document.querySelector(".nav__list");
  display_menu.addEventListener("click", () => {
    if (display_menu.closest("#nav-menu").classList.contains("active")) {
      closeDisplayMenu();
    }
  });

  const slides = document.querySelectorAll(".slides");
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  document.getElementById("nextBtn").addEventListener("click", nextSlide);
  document.getElementById("prevBtn").addEventListener("click", prevSlide);

  // 初回表示
  showSlide(currentIndex);
});
