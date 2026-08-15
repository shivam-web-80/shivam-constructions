document.addEventListener("DOMContentLoaded", () => {
  /* ---------- MOBILE MENU ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.classList.toggle("open", isOpen);
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- HERO SLIDESHOW + DOTS ---------- */
  const slides = document.querySelectorAll(".hero-slide");
  const dotsContainer = document.getElementById("heroDots");
  let currentSlide = 0;

  if (slides.length && dotsContainer) {
    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll("span");

    function goToSlide(index) {
      slides[currentSlide].classList.remove("active");
      dots[currentSlide].classList.remove("active");
      currentSlide = index;
      slides[currentSlide].classList.add("active");
      dots[currentSlide].classList.add("active");
    }

    setInterval(() => {
      goToSlide((currentSlide + 1) % slides.length);
    }, 5000);
  }

  /* ---------- PROJECT FILTERS ---------- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const miniCards = document.querySelectorAll(".mini-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;

      miniCards.forEach((card) => {
        const match = filter === "all" || card.dataset.status === filter;
        card.style.display = match ? "" : "none";
      });
    });
  });

  /* ---------- SITE PROGRESS GALLERY TABS ---------- */
  const galleryTabs = document.querySelectorAll(".gallery-tab");
  const galleryPanels = document.querySelectorAll("[data-gallery-panel]");

  galleryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      galleryTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const target = tab.dataset.gallery;

      galleryPanels.forEach((panel) => {
        panel.hidden = panel.dataset.galleryPanel !== target;
      });
    });
  });

  /* ---------- LIGHTBOX ---------- */
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML =
    '<button class="lightbox-close" aria-label="Close">&times;</button><img alt="" />';
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector("img");
  const lightboxClose = lightbox.querySelector(".lightbox-close");

  document
    .querySelectorAll(".gallery-grid img, .image-card img")
    .forEach((img) => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add("open");
      });
    });

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightboxImg.src = "";
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  /* ---------- FINANCE CHART ANIMATION ON SCROLL ---------- */
  const barChart = document.getElementById("barChart");

  if (barChart && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            barChart.classList.add("in-view");
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(barChart);
  } else if (barChart) {
    barChart.classList.add("in-view");
  }
});
