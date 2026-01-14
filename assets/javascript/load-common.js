// 共通部分を読み込む関数
async function loadCommon() {
  // ヘッダーの読み込み
  const headerElement = document.querySelector("header");
  if (headerElement) {
    const isNewsPage = window.location.pathname.includes("/news/");
    const headerPath = isNewsPage
      ? "../../common/header-news.html"
      : "./common/header.html";

    try {
      const response = await fetch(headerPath);
      if (response.ok) {
        const html = await response.text();
        headerElement.innerHTML = html;

        // ヘッダー読み込み後にmain.jsの初期化を実行
        setTimeout(() => {
          initializeMain();
        }, 0);
      }
    } catch (error) {
      console.error("ヘッダーの読み込みに失敗しました:", error);
    }
  }

  // フッターの読み込み
  const footerElement = document.querySelector("footer");
  if (footerElement) {
    const footerPath = window.location.pathname.includes("/news/")
      ? "../../common/footer.html"
      : "./common/footer.html";

    try {
      const response = await fetch(footerPath);
      if (response.ok) {
        const html = await response.text();
        footerElement.innerHTML = html;
      }
    } catch (error) {
      console.error("フッターの読み込みに失敗しました:", error);
    }
  }
}

// main.jsの初期化関数
function initializeMain() {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");

  if (!hamburger || !nav) return;

  // 既に初期化済みの場合はスキップ
  if (hamburger.hasAttribute("data-initialized")) return;
  hamburger.setAttribute("data-initialized", "true");

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
  if (display_menu) {
    display_menu.addEventListener("click", () => {
      if (display_menu.closest("#nav-menu").classList.contains("active")) {
        closeDisplayMenu();
      }
    });
  }

  // スライドショーの初期化（安全情報セクション用）
  const slides = document.querySelectorAll(".slides");
  if (slides.length > 0) {
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

    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    if (nextBtn) nextBtn.addEventListener("click", nextSlide);
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);

    // 初回表示
    showSlide(currentIndex);
  }
}

// DOMContentLoaded時に実行
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadCommon);
} else {
  loadCommon();
}
