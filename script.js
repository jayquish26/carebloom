document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in, if not, redirect to login page
  const loggedIn = localStorage.getItem("loggedIn");
  if (!loggedIn && window.location.pathname === "/index.html") {
    window.location.href = "login.html"; // Redirect to login page if not logged in
    return;
  }

  // Existing script functionality follows...
  const hamburger = document.getElementById("hamburger-menu");
  const menuLinks = document.querySelector(".menu-links");
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const logoutLink = document.getElementById("logout-link");
  const startBtn = document.getElementById("start-btn");
  const sections = document.querySelectorAll(".main-section");
  const links = document.querySelectorAll('[data-section]');

  // Load dark mode if enabled before
  const isDark = localStorage.getItem("darkMode") === "true";
  if (isDark) {
    document.body.classList.add("dark-mode");
    darkModeToggle.textContent = "☀️";
  }

  // Dark mode toggle
  darkModeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const darkNow = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", darkNow);
    darkModeToggle.textContent = darkNow ? "☀️" : "🌙";
  });

  // Hamburger menu toggle
  hamburger?.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    const isOpen = menuLinks?.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Scroll to sections
  function showSection(id) {
    sections.forEach(sec => sec.classList.remove("active"));
    const target = document.getElementById(id);
    if (target) {
      target.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("data-section");
      showSection(target);
      if (menuLinks?.classList.contains("open")) {
        menuLinks.classList.remove("open");
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Start button scroll
  startBtn?.addEventListener("click", () => {
    document.getElementById("resources")?.scrollIntoView({ behavior: "smooth" });
  });

  // Logout functionality
  logoutLink?.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPasswordHash");
    localStorage.removeItem("darkMode");
    window.location.href = "login.html";
  });

  // Show home by default
  const hash = window.location.hash.replace("#", "");
  const defaultSection = hash || "home";
  showSection(defaultSection);
});