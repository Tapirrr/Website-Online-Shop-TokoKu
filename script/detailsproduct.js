// const Params = new URLSearchParams(window.location.search)

// const productId = Params.get("id")
// const detailProduct = document.getElementById("detailProduct")

// const api = "https://fakestoreapi.com/products";

// let dataStore = [];

// // ambil data
// fetch(api)
//   .then((res) => res.json())
//   .then((data) => {
//     dataStore = data;
//     renderdetailProduct(productId);
//   });

//   function renderdetailProduct(productId) {
//   let html = "";

//   data.forEach((id, index) => {
//     html += `
//         <div>
//         <p>${item.title}</p>
//         <p>$${item.price}</p>
//         <img src="${item.image}" width="100">
//         <br>
//         <button onclick="lihat(${index})">Detail</button>
//         <button onclick="keranjang(${item.id})">+ Keranjang</button>
//         <br><br>
//       </div>
//     `;
//   });

//   document.getElementById("detailProduct").innerHTML = html;
// }
// renderdetailProduct(productId)

// const Params = new URLSearchParams(window.location.search)

// const productId = Params.get("id")

// let dataStore = [];

// // ambil data
// fetch(api)
//   .then(res => res.json())
//   .then(product => {
//       dataStore = product;
//     });

//     // render produk
//     function renderdetailProduct(item) {
//         let html = "";

//         id.forEach((id, index) => {
//             html += `
//           <h1>${item.title}</h1>
//   <a href="#" class="flex flex-col items-center bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs">
//       <img
//         class="object-cover w-full rounded-base h-64 md:h-auto md:w-48 mb-4 md:mb-0"
//         src="${item.image}"
//         alt="">
//       <div class="flex flex-col justify-between md:p-4 leading-normal">
//           <h5 class="mb-2 text-2xl font-bold tracking-tight text-heading">
//             ${item.title}
//           </h5>
//           <p class="mb-6 text-body">
//             ${item.description}
//           </p>
//           <div>
//               <button type="button" class="inline-flex items-center w-auto text-body bg-neutral-secondary-medium">
//                   Read more
//               </button>
//           </div>
//       </div>
//   </a>
//             `;
//         });

//         document.getElementById("detailProduct").innerHTML = html;
//     }
//     renderdetailProduct(productId);

// const api = "https://fakestoreapi.com/products/${productiId}";

const detailProduct = document.getElementById("detailProduct");

const SUPABASE_URL = "https://tjcjkbgbfusalufvvcgb.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqY2prYmdiZnVzYWx1ZnZ2Y2diIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNDE0NjksImV4cCI6MjA5NTgxNzQ2OX0.dhj0YvdiOeKzTdpy7VrhJbsHZuio6jDsnfXrk2DUwiA";

const Params = new URLSearchParams(window.location.search);
const productId = Params.get("id");
// console.log(productId);

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

async function ambildata(id) {
  try {
   const res = await fetch(`${SUPABASE_URL}/rest/v1/databarang?id=eq.${id}`, {
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`
      }
    });
    const data = await res.json();
     console.log("Response:", data); 
     console.log("Product:", data[0]); 
console.log("Keys:", Object.keys(data[0])); 
    console.log("Status:", res.status);
    const product = data[0];



    detailProduct.innerHTML = ` 

    <nav class="bg-[#134cbd] w-full z-20 top-0 border-b-2 sticky top-0 z-40">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <button onclick="navigate('home')" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="../assets/Gemini_Generated_Image_x6c4c1x6c4c1x6c4-removebg-preview (2).png" class="h-7" alt="" />
      <p class="h-7 font-bold self-center text-xl text-white font-semibold whitespace-nowrap">Toko<span class="text-white">Ku</span></p>
    </button>

    <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-3">

      <button onclick="" class="">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path fill="#fff" d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1zm6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5z" />
        </svg>
      </button>

      <!-- Tampil saat BELUM login -->
      <a id="btn-login" href="login.html"
         class="text-white bg-[#4270ca] hover:bg-white/30 font-medium rounded-lg text-sm px-4 py-2 transition">
        Login
      </a>

      <!-- Tampil saat SUDAH login (hidden by default) -->
      <a id="btn-profile" href="profile.html"
         class="hidden flex text-sm bg-neutral-primary rounded-full md:me-0 focus:ring-4 focus:ring-neutral-tertiary">
        <span class="sr-only">Open user profile</span>
        <img class="w-8 h-8 rounded-full"
             src="../assets/ChatGPT Image May 29, 2026, 08_00_37 AM.png"
             alt="user photo">
      </a>

    </div>

    <form class="max-w-md mx-auto">
      <label for="search" class="block mb-2.5 text-sm font-medium text-heading sr-only">Search</label>
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input type="search" id="search" class="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Search" required />
        <button type="button" class="absolute end-1.5 bottom-1.5 text-white bg-[#4270ca] hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none">Search</button>
      </div>
    </form>
  </div>
</nav>

      <div class="max-w-5xl mx-auto p-8 flex flex-col md:flex-row gap-10">

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
        Rp${Number(product.price).toLocaleString('id-ID')}
      </p>

      <!-- Deskripsi -->
      <div class="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <p class="text-sm text-gray-600 leading-relaxed">
          ${product.description ?? 'Tidak ada deskripsi'}
        </p>
      </div>

      <!-- Spesifikasi -->
      <div>
        <p class="text-base font-semibold text-gray-800 mb-2">Spesifikasi</p>
        <table class="w-full text-sm text-gray-600 border-t border-gray-200">
          <tr class="border-b border-gray-100">
            <td class="py-2.5 text-gray-500">Kategori</td>
            <td class="py-2.5 text-right text-gray-800">${product.category ?? '-'}</td>
          </tr>
          <tr class="border-b border-gray-100">
            <td class="py-2.5 text-gray-500">Rating</td>
            <td class="py-2.5 text-right text-gray-800">${product.rating ?? '-'}</td>
          </tr>
          <tr class="border-b border-gray-100">
            <td class="py-2.5 text-gray-500">Stok</td>
            <td class="py-2.5 text-right ${product.stok > 0 ? 'text-green-600' : 'text-red-500'} font-medium">
              ${product.stok > 0 ? product.stok : 'Habis'}
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

      <!-- Tombol -->
      <div class="flex gap-3 mt-2">
        <button
          onclick="tambahKeKeranjang(${product.id})"
          ${product.stok <= 0 ? 'disabled' : ''}
          class="flex-grow bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed active:scale-[0.98] transition-all text-white text-sm font-medium rounded-xl px-6 py-3">
          Beli Sekarang
        </button>
        <button
          onclick="tambahKeKeranjang(${product.id})"
          ${product.stok <= 0 ? 'disabled' : ''}
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
