// const url = "https://api.coingecko.com/api/v3/search/trending";

// fetch(url)
//   .then((Response) => Response.json())
//   .then((data) => {
//     let hasil = " ";

//     data.coins.forEach((isi) => {
//       console.log(isi);

//       hasil += `
//             <img src="${isi.item.thumb}" alt=""> <br>

//             nama : ${isi.item.name} <br>
//             symbol: ${isi.item.symbol} <br>
//             <hr>
//             `;
//     });

//     document.getElementById("hasil").innerHTML = hasil;
//   });

const api = "https://fakestoreapi.com/products";

let dataStore = [];

// ambil data
fetch(api)
  .then((res) => res.json())
  .then((data) => {
    dataStore = data;
    renderProduk(data);
  });

// render produk
function renderProduk(data) {
  let html = "";

  data.forEach((item, index) => {
    html += `
 <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-72 flex flex-col">

  <!-- Gambar Produk -->
  <a href="../view/detailProduct.html?id=${item.id}" class="bg-gray-100 flex items-center justify-center h-56">
    <img 
      class="h-44 object-contain p-4 transition-transform duration-300 hover:scale-105" 
      src="${item.image}" 
      alt="${item.title}" 
    />
  </a>

  <!-- Detail Produk -->
  <div class="p-5 flex flex-col flex-grow">
    
    <!-- Judul -->
    <h5 class="text-left font-semibold text-gray-800 line-clamp-2 min-h-[48px]">
      ${item.title}
    </h5>

    <!-- Harga -->
    <p class="text-lg font-bold text-blue-600 mt-2">
      $${item.price}
    </p>

  <a href="" class="mt-auto bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white text-sm font-medium rounded-lg px-4 py-2 flex items-center justify-center gap-2">
       Tambah ke Keranjang
    </a>

  </div>
</div>

 
    `;
  });

  document.getElementById("Product").innerHTML = html;
}
