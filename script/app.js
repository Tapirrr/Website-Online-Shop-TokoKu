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

// Jalankan saat halaman dimuat
checkLoginStatus();

const SUPABASE_URL = "https://tjcjkbgbfusalufvvcgb.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqY2prYmdiZnVzYWx1ZnZ2Y2diIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNDE0NjksImV4cCI6MjA5NTgxNzQ2OX0.dhj0YvdiOeKzTdpy7VrhJbsHZuio6jDsnfXrk2DUwiA";
const api = `${SUPABASE_URL}/rest/v1/databarang`; // sesuaikan nama tabelnya

let dataStore = [];

// ambil data
fetch(api, {
    headers: {
        "apikey": SUPABASE_KEY,
    "Authorization": `Bearer ${SUPABASE_KEY}`
    }
})
  .then((res) => res.json())
  .then((data) => {
    dataStore = data;
    renderProduk(data);
  });


  function renderStars(rate) {
  let stars = '';
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

// render produk
function renderProduk(data) {
  let html = "";

  data.forEach((item, index) => {
    html += `

  <div class="bg-white border border-gray-100 rounded-2xl overflow-hidden w-72 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

        <a href="../view/detailProduct.html?id=${item.id}" class="bg-gray-50 flex items-center justify-center h-52 relative">
          <img 
            class="h-40 object-contain p-4 transition-transform duration-300 hover:scale-105" 
            src="${item.image}" 
            alt="${item.name}" 
          />
          <span class="absolute top-2.5 left-2.5 bg-blue-50 text-blue-800 text-[11px] font-medium px-3 py-1 rounded-full">
            ${item.category ?? '-'}
          </span>
        </a>

        <div class="p-4 flex flex-col flex-grow gap-2">

          <p class="text-xs text-gray-400 uppercase tracking-wide">${item.category ?? '-'}</p>

          <h5 class="text-sm font-medium text-gray-800 line-clamp-2 leading-snug min-h-[40px]">
            ${item.name}
          </h5>

          <div class="flex items-center gap-1">
            ${renderStars(item.rating ?? 0)}
            <span class="text-xs text-gray-400 ml-1">${item.rating ?? 0} (${item.rating_count ?? 0})</span>
          </div>

          <p class="text-base font-medium text-blue-600">
            Rp${Number(item.price).toLocaleString('id-ID')}
          </p>

          <button class="mt-auto bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all text-white text-sm font-medium rounded-lg px-4 py-2.5 flex items-center justify-center gap-2">
            <span class="icon-[mdi--cart-outline]"></span>
            Tambah ke Keranjang
          </button>

        </div>
      </div>


 
    `;
  });

  document.getElementById("Product").innerHTML = html;
}