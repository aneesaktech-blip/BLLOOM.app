const brand = document.getElementById("brand");

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  const scale = Math.max(0.55, 1 - y / 320);
  brand.style.transform = `scale(${scale})`;
  brand.style.opacity = Math.max(0.3, 1 - y / 260);
});
