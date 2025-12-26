// Dropdown menu
const menuBtn = document.getElementById("menuBtn");
const dropdown = document.getElementById("dropdown");

menuBtn.addEventListener("click", () => {
  dropdown.style.display =
    dropdown.style.display === "flex" ? "none" : "flex";
});

// Shrink BLLOOM on scroll
const heroBrand = document.getElementById("heroBrand");
const navLogo = document.getElementById("navLogo");

window.addEventListener("scroll", () => {
  const y = window.scrollY;

  const scale = Math.max(0.5, 1 - y / 300);
  heroBrand.style.transform = `scale(${scale})`;
  heroBrand.style.opacity = Math.max(0, 1 - y / 250);

  navLogo.style.transform = `scale(${Math.min(1, y / 200)})`;
});
