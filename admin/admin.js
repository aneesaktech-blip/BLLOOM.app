// Tabs
document.querySelectorAll(".tab").forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  };
});

// Storage
const products = JSON.parse(localStorage.getItem("products")) || [];
const coupons = JSON.parse(localStorage.getItem("coupons")) || [];

// Stats
document.getElementById("stat-products").innerText = products.length;
document.getElementById("stat-coupons").innerText = coupons.length;

// Render
function render() {
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("coupons", JSON.stringify(coupons));

  const pl = document.getElementById("productList");
  pl.innerHTML = "";
  products.forEach(p => {
    pl.innerHTML += `<div>${p.name} — ₹${p.price}</div>`;
  });

  const cl = document.getElementById("couponList");
  cl.innerHTML = "";
  coupons.forEach(c => {
    cl.innerHTML += `<div>${c.code} — ${c.discount}%</div>`;
  });
}
render();

// Product form
document.getElementById("productForm").onsubmit = e => {
  e.preventDefault();
  const f = e.target;
  products.push({
    name: f[0].value,
    price: f[1].value,
    category: f[2].value,
    image: f[3].value
  });
  f.reset();
  render();
};

// Coupon form
document.getElementById("couponForm").onsubmit = e => {
  e.preventDefault();
  const f = e.target;
  coupons.push({
    code: f[0].value,
    discount: f[1].value
  });
  f.reset();
  render();
};
