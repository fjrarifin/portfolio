const cursorGlow = document.getElementById("cursorGlow");

document.addEventListener("mousemove", (e) => {
  cursorGlow.style.left = e.clientX + "px";
  cursorGlow.style.top = e.clientY + "px";
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".project-card, .skill-card").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "all 0.6s ease";
  observer.observe(el);
});

// Data proyek dengan gambar
const projectsData = {
  salesOps: {
    title: "Sales Ops",
    description:
      "Platform pengecekan penjualan untuk Sales Assistant dan SPG/SPB vendor dengan fitur real-time monitoring, reporting analytics, dan integrasi WhatsApp untuk notifikasi otomatis.",
    tags: [
      "Laravel 11",
      "Livewire",
      "MySQL",
      "SQL Server",
      "API",
      "Whatsapp Chat Bot",
    ],
    images: [
      "img/sales-ops-1.png",
      "img/sales-ops-2.png",
      "img/sales-ops-3.png",
      "img/sales-ops-4.png",
    ],
  },
  officeOps: {
    title: "Office Ops",
    description:
      "Sistem manajemen HR untuk management dan performance evaluation serta terintegtasi dengan Sales Ops dalam melakukan pengecekan penjualan. Dilengkapi dengan dashboard analytics dan automated reporting.",
    tags: [
      "Laravel 11",
      "Livewire",
      "MySQL",
      "SQL Server",
      "API",
      "Whatsapp Chat Bot",
    ],
    images: [
      "img/office-ops-1.png",
      "img/office-ops-2.png",
      "img/office-ops-3.png",
      "img/office-ops-4.png",
      "img/office-ops-5.png",
      "img/office-ops-6.png",
      "img/office-ops-7.png",
    ],
  },
};

let currentSlideIndex = 0;
let currentProject = null;

function openModal(projectId) {
  currentProject = projectsData[projectId];
  currentSlideIndex = 0;

  document.getElementById("modalTitle").textContent = currentProject.title;
  document.getElementById("modalDescription").textContent =
    currentProject.description;

  // Setup slides
  const slidesContainer = document.getElementById("slidesContainer");
  slidesContainer.innerHTML = "";
  currentProject.images.forEach((img, index) => {
    const slide = document.createElement("div");
    slide.className = "slide" + (index === 0 ? " active" : "");
    slide.innerHTML = `<img src="${img}" alt="${currentProject.title} - Image ${
      index + 1
    }" onerror="this.src='https://via.placeholder.com/900x500/1a1f3a/00b7ff?text=${
      currentProject.title
    }'">`;
    slidesContainer.appendChild(slide);
  });

  // Setup dots
  const dotsContainer = document.getElementById("dotsContainer");
  dotsContainer.innerHTML = "";
  currentProject.images.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = "dot" + (index === 0 ? " active" : "");
    dot.onclick = () => goToSlide(index);
    dotsContainer.appendChild(dot);
  });

  // Setup tags
  const tagsContainer = document.getElementById("modalTags");
  tagsContainer.innerHTML = "";
  currentProject.tags.forEach((tag) => {
    const tagSpan = document.createElement("span");
    tagSpan.className = "tag";
    tagSpan.textContent = tag;
    tagsContainer.appendChild(tagSpan);
  });

  updateSlideCounter();

  const modal = document.getElementById("projectModal");
  modal.style.display = "flex";
  setTimeout(() => modal.classList.add("active"), 10);
}

function closeModal() {
  const modal = document.getElementById("projectModal");
  modal.classList.remove("active");
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

function closeModalOnOutside(event) {
  if (event.target.id === "projectModal") {
    closeModal();
  }
}

function changeSlide(direction) {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  slides[currentSlideIndex].classList.remove("active");
  dots[currentSlideIndex].classList.remove("active");

  currentSlideIndex += direction;

  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  } else if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1;
  }

  slides[currentSlideIndex].classList.add("active");
  dots[currentSlideIndex].classList.add("active");
  updateSlideCounter();
}

function goToSlide(index) {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  slides[currentSlideIndex].classList.remove("active");
  dots[currentSlideIndex].classList.remove("active");

  currentSlideIndex = index;

  slides[currentSlideIndex].classList.add("active");
  dots[currentSlideIndex].classList.add("active");
  updateSlideCounter();
}

function updateSlideCounter() {
  const counter = document.getElementById("slideCounter");
  const total = currentProject.images.length;
  counter.textContent = `${currentSlideIndex + 1} / ${total}`;
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  const modal = document.getElementById("projectModal");
  if (modal.classList.contains("active")) {
    if (e.key === "ArrowLeft") changeSlide(-1);
    if (e.key === "ArrowRight") changeSlide(1);
    if (e.key === "Escape") closeModal();
  }
});

// Auto-play slideshow (optional)
let autoPlayInterval;
function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        changeSlide(1);
    }, 4000);
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

//Uncomment to enable auto-play
document.getElementById('projectModal').addEventListener('click', () => {
    if (document.getElementById('projectModal').classList.contains('active')) {
        startAutoPlay();
    }
});
