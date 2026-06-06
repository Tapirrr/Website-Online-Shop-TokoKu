// Cek status login saat homepage dimuat
function checkLoginStatus() {
  const email = sessionStorage.getItem("email");
  const btnLogin = document.getElementById("btn-login");
  const btnProfile = document.getElementById("btn-profile");

  if (email) {
    // Sudah login → sembunyikan Login, tampilkan Profile
    btnLogin.classList.add("hidden");
    btnProfile.classList.remove("hidden");
  } else {
    // Belum login → tampilkan Login, sembunyikan Profile
    btnLogin.classList.remove("hidden");
    btnProfile.classList.add("hidden");
  }
}
checkLoginStatus();

function filterHarga() {
  const filter = document.getElementById("filter-harga").value;
  let hasil = [...dataStore]; // copy dataStore biar data asli tidak berubah

  if (filter === "termahal") {
    hasil.sort((a, b) => b.price - a.price);
  } else if (filter === "termurah") {
    hasil.sort((a, b) => a.price - b.price);
  }

  renderProduk(hasil);
}

let kategoriAktif = "semua";

// generate tombol kategori dari data
function renderKategori(data) {
  const container = document.getElementById("filter-kategori");
  const kategoriList = [
    ...new Set(data.map((item) => item.category).filter(Boolean)),
  ];

  kategoriList.forEach((kat) => {
    const btn = document.createElement("button");
    btn.textContent = kat;
    btn.dataset.kategori = kat;
    btn.onclick = () => pilihKategori(btn);
    btn.className =
      "kategori-btn text-xs px-4 py-1.5 rounded-full border border-gray-300 text-gray-600 hover:border-blue-600 hover:text-blue-600 transition";
    container.appendChild(btn);
  });
}

// handle klik tombol kategori
function pilihKategori(btn) {
  kategoriAktif = btn.dataset.kategori;

  // update style tombol
  document.querySelectorAll(".kategori-btn").forEach((b) => {
    b.classList.remove("bg-blue-600", "text-white", "border-blue-600");
    b.classList.add("border-gray-300", "text-gray-600");
  });
  btn.classList.add("bg-blue-600", "text-white", "border-blue-600");
  btn.classList.remove("border-gray-300", "text-gray-600");

  filterProduk();
}

function tambahKeKeranjang(id) {
  const produk = dataStore.find(item => item.id === id);
  if (!produk) return;

  let keranjang = JSON.parse(localStorage.getItem("keranjang") ?? "[]");

  const existing = keranjang.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    keranjang.push({
      id: produk.id,
      name: produk.name,
      price: produk.price,
      image: produk.image,
      qty: 1
    });
  }

  localStorage.setItem("keranjang", JSON.stringify(keranjang));
  updateBadge();
  alert(`${produk.name} ditambahkan ke keranjang!`);
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

// fungsi utama filter — gabungan search + kategori + harga
function filterProduk() {
  const keyword = document.getElementById("search").value.toLowerCase().trim();
  const filter = document.getElementById("filter-harga").value;

  let hasil = [...dataStore];

  // filter kategori
  if (kategoriAktif !== "semua") {
    hasil = hasil.filter((item) => item.category === kategoriAktif);
  }

  // filter keyword
  if (keyword !== "") {
    hasil = hasil.filter(
      (item) =>
        item.name.toLowerCase().includes(keyword) ||
        item.category?.toLowerCase().includes(keyword),
    );
  }

  // sort harga
  if (filter === "termahal") hasil.sort((a, b) => b.price - a.price);
  else if (filter === "termurah") hasil.sort((a, b) => a.price - b.price);

  if (hasil.length === 0) {
    document.getElementById("Product").innerHTML = `
      <p class="text-gray-400 text-center col-span-full py-10">Produk tidak ditemukan</p>
    `;
    return;
  }

  renderProduk(hasil);
}

// search pakai filterProduk
function searchProduk() {
  filterProduk();
}

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



// filterHarga pakai filterProduk
function filterHarga() {
  filterProduk();
}

const SUPABASE_URL = "https://tjcjkbgbfusalufvvcgb.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqY2prYmdiZnVzYWx1ZnZ2Y2diIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNDE0NjksImV4cCI6MjA5NTgxNzQ2OX0.dhj0YvdiOeKzTdpy7VrhJbsHZuio6jDsnfXrk2DUwiA";
const api = `${SUPABASE_URL}/rest/v1/databarang`; // sesuaikan nama tabelnya

let dataStore = [];

// ambil data
fetch(api, {
  headers: {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    dataStore = data;
    renderKategori(data);
    renderProduk(data);
  });

// render produk
function renderProduk(data) {
  let html = "";

  data.forEach((item, index) => {
    html += `

  <div class="bg-white border border-gray-100 rounded-2xl overflow-hidden w-62 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

  <a href="../view/detailProduct.html?id=${item.id}" class="flex flex-col flex-grow">

   
    <div class="bg-gray-50 flex items-center justify-center h-52 relative">
      <img 
        class="h-40 object-contain p-4 transition-transform duration-300 hover:scale-105" 
        src="${item.image}" 
        alt="${item.name}" 
      />
      <span class="absolute top-2.5 left-2.5 bg-blue-50 text-blue-800 text-[11px] font-medium px-3 py-1 rounded-full">
        ${item.category ?? "-"}
      </span>
    </div>

    <!-- Detail -->
    <div class="p-4 flex flex-col flex-grow gap-2">

      <p class="text-xs text-gray-400 uppercase tracking-wide">${item.category ?? "-"}</p>

      <h5 class="text-sm font-medium text-gray-800 line-clamp-2 leading-snug min-h-[40px]">
        ${item.name}
      </h5>

      <!-- Rating -->
      <div class="flex items-center gap-1">
        ${renderStars(item.rating ?? 0)}
        <span class="text-xs text-gray-400 ml-1">${item.rating ?? 0}</span>
      </div>

      <!-- Stok -->
      <p class="text-xs ${item.stok > 0 ? "text-green-600" : "text-red-500"} font-medium">
        ${item.stok > 0 ? `Stok: ${item.stok}` : "Stok Habis"}
      </p>

      <!-- Harga -->
      <p class="text-base font-medium text-blue-600">
        Rp${Number(item.price).toLocaleString("id-ID")}
      </p>

      <!-- Tombol -->
      
      <button 
  onclick="event.preventDefault(); tambahKeKeranjang(${item.id})"
  ${item.stok <= 0 ? "disabled" : ""}
  class="mt-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:cursor-not-allowed active:scale-[0.98] transition-all text-white text-sm font-medium rounded-lg px-4 py-2.5 flex items-center justify-center gap-2">
  <span class="icon-[mdi--cart-outline] w-[24px] h-[24px] bg-white"></span>
  Tambah ke Keranjang
</button>
      </div>
      </a>
</div>
        
        
        `;
  });

  document.getElementById("Product").innerHTML = html;
}

function searchProduk() {
  const keyword = document.getElementById("search").value.toLowerCase().trim();

  if (keyword === "") {
    renderProduk(dataStore); // tampilkan semua produk kalau search kosong
    return;
  }

  const hasil = dataStore.filter(
    (item) =>
      item.name.toLowerCase().includes(keyword) ||
      item.category.toLowerCase().includes(keyword),
  );

  if (hasil.length === 0) {
    document.getElementById("Product").innerHTML = `
      <p class="text-gray-400 text-center col-span-full py-10">Produk tidak ditemukan</p>
    `;
    return;
  }

  renderProduk(hasil);
}

function navigate(homepage) {
  window.location.href = "homepage.html";
}
