const brand = document.getElementById("brand");

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  const scale = Math.max(0.6, 1 - y / 300);
  brand.style.transform = `translate(-50%, -50%) scale(${scale})`;
});
