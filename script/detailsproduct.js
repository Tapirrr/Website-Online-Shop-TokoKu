const email = sessionStorage.getItem("email");
// Cek status login saat homepage dimuat
function checkLoginStatus() {
  const profileImage = sessionStorage.getItem("profileImage");
  const btnLogin = document.getElementById("btn-login");
  const btnProfile = document.getElementById("btn-profile");
  const navImg = document.getElementById("nav-profile-img");

  if (email) {
    btnLogin.classList.add("hidden");
    btnProfile.classList.remove("hidden");
    if (profileImage && navImg) {
      navImg.src = profileImage; // set foto sesuai user yang login
    }
  } else {
    btnLogin.classList.remove("hidden");
    btnProfile.classList.add("hidden");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  checkLoginStatus();
});

// const email = sessionStorage.getItem("email");
function cekLogin() {
  if (!email) {
    const konfirmasi = confirm("Kamu harus login dulu!\nMau ke halaman login?");
    if (konfirmasi) window.location.href = "../view/login.html";
    return false;
  }
  return true;
}

function navigate(homepage) {
  window.location.href = "homepage.html";
}

function beliSekarang() {
   if (!cekLogin()) return;
  if (!currentProduct) return;
  const qty = parseInt(document.getElementById("qty").textContent);
  const total = currentProduct.price * qty;

  const konfirmasi = confirm(
    `Beli ${qty}x ${currentProduct.name}\nTotal: Rp${total.toLocaleString("id-ID")}\n\nLanjutkan checkout?`
  );
  if (!konfirmasi) return;

  alert("Checkout berhasil! Terima kasih sudah berbelanja.");
}


function tambahKeKeranjang() {
   if (!cekLogin()) return;

  if (!currentProduct) return;
  const qty = parseInt(document.getElementById("qty").textContent);

  let keranjang = JSON.parse(localStorage.getItem("keranjang") ?? "[]");

  const existing = keranjang.find((item) => item.id === currentProduct.id);
  if (existing) {
    existing.qty += qty;
  } else {
    keranjang.push({
      id: currentProduct.id,
      name: currentProduct.name,
      price: currentProduct.price,
      image: currentProduct.image,
      qty: qty,
    });
  }

  



  localStorage.setItem("keranjang", JSON.stringify(keranjang));
  updateBadge();
  alert(`${qty}x ${currentProduct.name} ditambahkan ke keranjang!`);
}



function updateBadge() {
  const keranjang = JSON.parse(localStorage.getItem("keranjang") ?? "[]");
  const badge = document.getElementById("cart-badge");
  if (!badge) return;
  const total = keranjang.reduce((sum, item) => sum + item.qty, 0);
  if (total > 0) {
    badge.textContent = total;
    badge.classList.remove("hidden");
  } else {
    badge.classList.add("hidden");
  }
}

updateBadge();

const detailProduct = document.getElementById("detailProduct");

const SUPABASE_URL = "https://tjcjkbgbfusalufvvcgb.supabase.co";
const SUPABASE_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqY2prYmdiZnVzYWx1ZnZ2Y2diIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNDE0NjksImV4cCI6MjA5NTgxNzQ2OX0.dhj0YvdiOeKzTdpy7VrhJbsHZuio6jDsnfXrk2DUwiA";

const Params = new URLSearchParams(window.location.search);
const productId = Params.get("id");

function renderStars(rate) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (rate >= i) {
      stars += `<svg class="w-3.5 h-3.5 text-amber-500 fill-amber-500" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
    } else if (rate >= i - 0.5) {
      stars += `<svg class="w-3.5 h-3.5 text-amber-500 fill-amber-500" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77V2z"/></svg>`;
    } else {
      stars += `<svg class="w-3.5 h-3.5 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
    }
  }
  return stars;
}

let currentProduct = null;

function changeQty(val) {
  const qty = document.getElementById("qty");
  const current = parseInt(qty.textContent);
  const newVal = current + val;
  if (newVal >= 1 && newVal <= currentProduct.stok) {
    qty.textContent = newVal;
    // tambah ini setelah qty.textContent = newVal
document.getElementById("total-harga").textContent =
  `Rp${Number(currentProduct.price * newVal).toLocaleString("id-ID")}`;

// tambah validasi
if (newVal < 1) { alert("Minimal pembelian 1 item!"); return; }
if (newVal > currentProduct.stok) { alert(`Stok hanya tersisa ${currentProduct.stok}!`); return; }
  }
}


async function ambildata(id) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/databarang?id=eq.${id}`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });
    const data = await res.json();
    console.log("Response:", data);
    console.log("Product:", data[0]);
    console.log("Keys:", Object.keys(data[0]));
    console.log("Status:", res.status);
    const product = data[0];
    currentProduct = product;
    
    detailProduct.innerHTML = ` 

      <div class="mt-[50px] max-w-5xl mx-auto p-8 flex flex-col md:flex-row gap-10">

    <!-- Gambar -->
    <div class="bg-gray-100 rounded-2xl flex items-center justify-center w-full md:w-[520px] h-[420px] shrink-0">
      <img src="${product.image}" class="h-80 object-contain p-6" alt="${product.name}" />
      </div>

      <!-- Info -->
    <div class="flex flex-col gap-4 flex-grow">
    
      <!-- Nama -->
      <h2 class="text-2xl font-semibold text-gray-900 leading-snug">${product.name}</h2>
      
      <!-- Harga -->
      <p class="text-2xl font-semibold text-blue-600">
      Rp${Number(product.price).toLocaleString("id-ID")}
      </p>
      
      <!-- Deskripsi -->
      <div class="bg-gray-50 border border-gray-200 rounded-xl p-4">
      <p class="text-sm text-gray-600 leading-relaxed">
          ${product.description ?? "Tidak ada deskripsi"}
        </p>
      </div>

      <!-- Spesifikasi -->
      <div>
        <p class="text-base font-semibold text-gray-800 mb-2">Spesifikasi</p>
        <table class="w-full text-sm text-gray-600 border-t border-gray-200">
          <tr class="border-b border-gray-100">
            <td class="py-2.5 text-gray-500">Kategori</td>
            <td class="py-2.5 text-right text-gray-800">${product.category ?? "-"}</td>
          </tr>
          <tr class="border-b border-gray-100">
            <td class="py-2.5 text-gray-500">Rating</td>
            <td class="py-2.5 text-right text-gray-800">${product.rating ?? "-"}</td>
            </tr>
            <tr class="border-b border-gray-100">
            <td class="py-2.5 text-gray-500">Stok</td>
            <td class="py-2.5 text-right ${product.stok > 0 ? "text-green-600" : "text-red-500"} font-medium">
            ${product.stok > 0 ? product.stok : "Habis"}
            </td>
          </tr>
        </table>
      </div>
      
      <!-- Quantity -->
<div class="flex items-center gap-3">
  <span class="text-sm text-gray-600">Quantity:</span>
  <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden">
    <button onclick="changeQty(-1)" class="px-3 py-2 text-gray-600 hover:bg-gray-100 transition text-lg leading-none">−</button>
    <span id="qty" class="px-4 py-2 text-sm font-medium border-x border-gray-200">1</span>
    <button onclick="changeQty(1)" class="px-3 py-2 text-gray-600 hover:bg-gray-100 transition text-lg leading-none">+</button>
  </div>
</div>

<!-- Total Harga -->
<div class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
<span class="text-sm text-gray-500">Total Harga</span>
<span id="total-harga" class="text-base font-semibold text-blue-600">
Rp${Number(product.price).toLocaleString("id-ID")}
</span>
</div>

<!-- Tombol -->
<div class="flex gap-3 mt-2">
<button
onclick="beliSekarang()"
${product.stok <= 0 ? "disabled" : ""}
class="cursor-pointer flex-grow bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed active:scale-[0.98] transition-all text-white text-sm font-medium rounded-xl px-6 py-3">
Beli Sekarang
</button>
        <button
  onclick="tambahKeKeranjang()"
  ${product.stok <= 0 ? "disabled" : ""}
  class="border border-blue-600 text-blue-600 hover:bg-blue-50 disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed active:scale-[0.98] transition-all rounded-xl px-4 py-3">
  <span class="icon-[mdi--cart-outline]"></span>
</button>
      </div>
      
      </div>
      </div>`;
    } catch (error) {
      console.log("Monyet");
      console.log(error);
    }
  }
  
  ambildata(productId);


  function handleSearch(event) {
  event.preventDefault();
  const query = document.getElementById("search").value.trim();
  if (!query) return;
  window.location.href = `homepage.html?search=${encodeURIComponent(query)}`;
}
  
