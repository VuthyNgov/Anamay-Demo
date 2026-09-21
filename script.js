const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/profile.php?id=61589443176518",
  instagram: "https://www.instagram.com/anamaykh/",
  telegram: "https://t.me/phasukarphan"
};

function applySocialLinks() {
  document.querySelectorAll("[data-social]").forEach((link) => {
    const key = link.dataset.social;
    const url = SOCIAL_LINKS[key] || "#";

    link.href = url;

    if (url !== "#") {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });
}

function initMenu() {
  const openMenu = document.getElementById("openMenu");
  const closeMenu = document.getElementById("closeMenu");
  const sideMenu = document.getElementById("sideMenu");
  const menuBackdrop = document.getElementById("menuBackdrop");

  if (!openMenu || !closeMenu || !sideMenu || !menuBackdrop) return;

  function closeSideMenu() {
    sideMenu.classList.remove("is-open");
    menuBackdrop.classList.remove("is-visible");
  }

  openMenu.addEventListener("click", () => {
    sideMenu.classList.add("is-open");
    menuBackdrop.classList.add("is-visible");
  });

  closeMenu.addEventListener("click", closeSideMenu);
  menuBackdrop.addEventListener("click", closeSideMenu);
}

const basePath = document.body.classList.contains("home-page") ? "./" : "../";

const PRODUCTS = [

  {
    name: "Anamay Original",
    price: "$0.75",
    keywords: ["original", "classic", "coconut", "olive", "shea", "soap"],
    url: `${basePath}anamay-original/`,
    image: `${basePath}images/product-original.webp`
  },
  {
    name: "Anamay Turmeric & Honey",
    price: "$1.00",
    keywords: ["turmeric", "honey", "essential oil", "soap"],
    url: `${basePath}turmeric-honey/`,
    image: `${basePath}images/product-turmeric-honey.webp`
  },
  {
    name: "Anamay Jasmine",
    price: "$1.00",
    keywords: ["jasmine", "jasmine oil", "soap"],
    url: `${basePath}jasmine/`,
    image: `${basePath}images/product-jasmine.webp`
  }
];

// Add one new month to this array whenever the next four toilets are completed.
// The timeline, total counter, and upcoming month update automatically.
const TOILET_PROJECTS = [
  {
    month: "June",
    year: 2026,
    toilets: [
      {
        id: 1,
        village: "Tatrav",
        commune: "Svay Chek",
        district: "Angkor Thom",
        image: "images/toilets/2026-07/toilet-01.webp"
      },
      {
        id: 2,
        village: "Bostatrav",
        commune: "Svay Chek",
        district: "Angkor Thom",
        image: "images/toilets/2026-07/toilet-02.webp"
      },
      {
        id: 3,
        village: "Bostatrav",
        commune: "Svay Chek",
        district: "Angkor Thom",
        image: "images/toilets/2026-07/toilet-03.webp"
      },
      {
        id: 4,
        village: "Bostatrav",
        commune: "Svay Chek",
        district: "Angkor Thom",
        image: "images/toilets/2026-07/toilet-04.webp"
      }
    ]
  },
  {
    month: "July",
    year: 2026,
    toilets: [
      {
        id: 5,
        village: "Kiriminun",
        commune: "Ampil",
        district: "Prasat Bakong",
        image: "images/toilets/2026-08/toilet-05.webp"
      },
      {
        id: 6,
        village: "Kiriminun",
        commune: "Ampil",
        district: "Prasat Bakong",
        image: "images/toilets/2026-08/toilet-06.webp"
      },
      {
        id: 7,
        village: "Kiriminun",
        commune: "Ampil",
        district: "Prasat Bakong",
        image: "images/toilets/2026-08/toilet-07.webp"
      },
      {
        id: 8,
        village: "Kiriminun",
        commune: "Ampil",
        district: "Prasat Bakong",
        image: "images/toilets/2026-08/toilet-08.webp"
      }
    ]
  }
];

function initSearch() {
  const searchToggle = document.getElementById("searchToggle");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  if (!searchToggle || !searchInput || !searchResults) return;

  function renderResults(query) {
    const cleanQuery = query.trim().toLowerCase();

    const matches = cleanQuery
      ? PRODUCTS.filter((product) => {
          const haystack = [product.name, ...product.keywords].join(" ").toLowerCase();
          return haystack.includes(cleanQuery);
        })
      : PRODUCTS;

    searchResults.classList.add("is-visible");

    if (matches.length === 0) {
      searchResults.innerHTML = `<div class="search-empty">No product found. Try “Original”, “Turmeric”, “Honey”, or “Jasmine”.</div>`;
      return;
    }

    searchResults.innerHTML = matches.map((product) => `
      <a class="search-result-item" href="${product.url}">
        <img src="${product.image}" alt="${product.name}" />
        <div>
          <strong>${product.name}</strong>
          <span>${product.price}</span>
        </div>
      </a>
    `).join("");
  }

  searchToggle.addEventListener("click", () => {
    searchInput.classList.toggle("is-visible");

    if (searchInput.classList.contains("is-visible")) {
      searchInput.focus();
      renderResults(searchInput.value);
    } else {
      searchResults.classList.remove("is-visible");
    }
  });

  searchInput.addEventListener("input", () => {
    renderResults(searchInput.value);
  });

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const cleanQuery = searchInput.value.trim().toLowerCase();
      const firstMatch = PRODUCTS.find((product) => {
        const haystack = [product.name, ...product.keywords].join(" ").toLowerCase();
        return haystack.includes(cleanQuery);
      });

      if (firstMatch) {
        window.location.href = firstMatch.url;
      }
    }

    if (event.key === "Escape") {
      searchResults.classList.remove("is-visible");
      searchInput.classList.remove("is-visible");
    }
  });

  document.addEventListener("click", (event) => {
    const clickedInside = event.target.closest(".header-search");

    if (!clickedInside) {
      searchResults.classList.remove("is-visible");
    }
  });
}


function initGalleries() {
  document.querySelectorAll("[data-gallery]").forEach((gallery) => {
    const mainImage = gallery.querySelector(".main-gallery-image");
    const thumbnails = Array.from(gallery.querySelectorAll(".thumbnail"));

    if (!mainImage || thumbnails.length === 0) return;

    const slides = thumbnails.map((thumbnail) => thumbnail.dataset.image);
    let currentIndex = 0;
    let slideTimer;

    function showImage(index) {
      const safeIndex = ((index % slides.length) + slides.length) % slides.length;

      mainImage.src = slides[safeIndex];

      thumbnails.forEach((item, idx) => {
        item.classList.toggle("is-active", idx === safeIndex);
      });

      currentIndex = safeIndex;
    }

    function startAutoSlide() {
      clearInterval(slideTimer);

      slideTimer = setInterval(() => {
        showImage(currentIndex + 1);
      }, 3500);
    }

    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => {
        showImage(index);
        startAutoSlide();
      });
    });

    showImage(0);
    startAutoSlide();
  });
}

function initToiletTimeline() {
  const timeline = document.getElementById("toiletTimeline");
  const totalCount = document.getElementById("toiletTotalCount");
  const popover = document.getElementById("toiletMonthPopover");
  const popoverKicker = document.getElementById("toiletPopoverKicker");
  const popoverTitle = document.getElementById("toiletPopoverTitle");
  const cardGrid = document.getElementById("toiletCardGrid");
  const closeButton = document.getElementById("toiletPopoverClose");

  if (!timeline || !totalCount || !popover || !popoverKicker || !popoverTitle || !cardGrid || !closeButton) return;

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const total = TOILET_PROJECTS.reduce((sum, project) => sum + project.toilets.length, 0);
  totalCount.textContent = total;

  function getNextMonth(project) {
    const monthIndex = monthNames.indexOf(project.month);
    const nextIndex = (monthIndex + 1) % 12;
    return {
      month: monthNames[nextIndex],
      year: nextIndex === 0 ? project.year + 1 : project.year
    };
  }

  const latestProject = TOILET_PROJECTS[TOILET_PROJECTS.length - 1];
  const upcoming = latestProject ? getNextMonth(latestProject) : null;

  const completedNodes = TOILET_PROJECTS.map((project, index) => `
    <button
      class="toilet-timeline-node is-complete"
      type="button"
      data-project-index="${index}"
      aria-expanded="false"
      aria-controls="toiletMonthPopover"
    >
      <span class="toilet-timeline-month">${project.month} ${project.year}</span>
      <span class="toilet-timeline-dot" aria-hidden="true"></span>
      <span class="toilet-timeline-count">${project.toilets.length} toilets</span>
    </button>
  `).join("");

  const upcomingNode = upcoming ? `
    <div class="toilet-timeline-node is-upcoming" aria-label="${upcoming.month} ${upcoming.year}, upcoming">
      <span class="toilet-timeline-month">${upcoming.month} ${upcoming.year}</span>
      <span class="toilet-timeline-dot" aria-hidden="true"></span>
      <span class="toilet-timeline-count">Upcoming</span>
    </div>
  ` : "";

  timeline.innerHTML = completedNodes + upcomingNode;

  const completedButtons = Array.from(timeline.querySelectorAll(".toilet-timeline-node.is-complete"));
  let activeIndex = null;
  let pinned = false;
  let closeTimer = null;

  function clearCloseTimer() {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
  }

  function setExpandedButton(index) {
    completedButtons.forEach((button) => {
      const buttonIndex = Number(button.dataset.projectIndex);
      const expanded = buttonIndex === index && !popover.hidden;
      button.classList.toggle("is-active", expanded);
      button.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
  }

  function renderProject(index, shouldPin = false) {
    const project = TOILET_PROJECTS[index];
    if (!project) return;

    clearCloseTimer();
    activeIndex = index;
    pinned = shouldPin;

    popoverKicker.textContent = `${project.toilets.length} toilets completed`;
    popoverTitle.textContent = `${project.month} ${project.year}`;

    cardGrid.innerHTML = project.toilets.map((toilet) => `
      <figure class="toilet-card">
        <div class="toilet-card-image-wrap">
          <img
            src="${basePath}${toilet.image}"
            alt="Toilet #${toilet.id} in ${toilet.village} Village, ${toilet.district} District"
            loading="lazy"
          />
        </div>
        <figcaption class="toilet-card-info">
          <h4>Toilet #${toilet.id}</h4>
          <p class="toilet-card-village">${toilet.village} Village</p>
          <p>${toilet.commune} Commune · ${toilet.district} District</p>
          <small>Completed ${project.month} ${project.year}</small>
        </figcaption>
      </figure>
    `).join("");

    popover.hidden = false;
    requestAnimationFrame(() => {
      popover.classList.add("is-visible");
    });
    setExpandedButton(index);
  }

  function closePopover(force = false) {
    clearCloseTimer();
    if (pinned && !force) return;

    pinned = false;
    popover.classList.remove("is-visible");
    setExpandedButton(null);

    window.setTimeout(() => {
      if (!popover.classList.contains("is-visible")) {
        popover.hidden = true;
        cardGrid.innerHTML = "";
        activeIndex = null;
      }
    }, 180);
  }

  function scheduleClose() {
    clearCloseTimer();
    if (pinned) return;
    closeTimer = window.setTimeout(() => closePopover(), 180);
  }

  completedButtons.forEach((button) => {
    const index = Number(button.dataset.projectIndex);

    button.addEventListener("mouseenter", () => {
      if (pinned) return;
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        renderProject(index, false);
      }
    });

    button.addEventListener("mouseleave", () => {
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        scheduleClose();
      }
    });

    button.addEventListener("focus", () => {
      if (!pinned) renderProject(index, false);
    });

    button.addEventListener("blur", scheduleClose);

    button.addEventListener("click", () => {
      if (pinned && activeIndex === index) {
        closePopover(true);
      } else {
        renderProject(index, true);
      }
    });
  });

  popover.addEventListener("mouseenter", clearCloseTimer);
  popover.addEventListener("mouseleave", scheduleClose);

  closeButton.addEventListener("click", () => {
    closePopover(true);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !popover.hidden) {
      closePopover(true);
    }
  });
}

function initSizeOptions() {
  const productPrice = document.getElementById("productPrice");
  const sizeOptions = document.querySelectorAll(".size-option");

  if (!productPrice || sizeOptions.length === 0) return;

  sizeOptions.forEach((option) => {
    option.addEventListener("click", () => {
      sizeOptions.forEach((item) => {
        item.classList.remove("is-selected");
        item.setAttribute("aria-checked", "false");
      });

      option.classList.add("is-selected");
      option.setAttribute("aria-checked", "true");

      productPrice.textContent = option.dataset.price;
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applySocialLinks();
  initMenu();
  initSearch();
  initGalleries();
  initToiletTimeline();
  initSizeOptions();
});
