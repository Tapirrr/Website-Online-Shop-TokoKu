let keranjang = JSON.parse(localStorage.getItem("keranjang") ?? "[]");

function simpanKeranjang() {
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
}

function renderKeranjang() {
  const container = document.getElementById("cart-items");

  if (keranjang.length === 0) {
    container.innerHTML = `
      <div class="flex flex-col items-center justify-center py-20 gap-3">
        <p class="text-gray-400 text-sm">Keranjang kamu masih kosong</p>
        <button onclick="window.location.href='homepage.html'" class="text-sm text-blue-600 hover:underline">Mulai belanja →</button>
      </div>
    `;
    document.getElementById("cart-total").textContent = "Rp0";
    document.getElementById("total-item").textContent = "0 item";
    return;
  }

  let html = "";
  let total = 0;
  let totalItem = 0;

  keranjang.forEach((item, index) => {
    total += item.price * item.qty;
    totalItem += item.qty;
    html += `
      <div class="bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 items-start">
        <img src="${item.image}" class="w-20 h-20 object-contain bg-gray-50 rounded-xl p-2 shrink-0" />
        <div class="flex flex-col flex-grow gap-1">
          <p class="text-sm font-medium text-gray-800 line-clamp-2">${item.name}</p>
          <p class="text-sm font-semibold text-blue-600">Rp${Number(item.price).toLocaleString('id-ID')}</p>
          <div class="flex items-center gap-2 mt-2">
            <button onclick="kurangQty(${index})" class="w-7 h-7 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 flex items-center justify-center text-base transition">−</button>
            <span class="text-sm font-medium w-5 text-center">${item.qty}</span>
            <button onclick="tambahQty(${index})" class="w-7 h-7 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 flex items-center justify-center text-base transition">+</button>
            <button onclick="hapusItem(${index})" class="ml-auto text-xs text-red-400 hover:text-red-600 transition">Hapus</button>
          </div>
        </div>
        <p class="text-sm font-semibold text-gray-700 shrink-0">
          Rp${Number(item.price * item.qty).toLocaleString('id-ID')}
        </p>
      </div>
    `;
  });

  container.innerHTML = html;
  document.getElementById("cart-total").textContent = `Rp${total.toLocaleString('id-ID')}`;
  document.getElementById("total-item").textContent = `${totalItem} item`;
}

function kurangQty(index) {
  if (keranjang[index].qty <= 1) {
    hapusItem(index);
    return;
  }
  keranjang[index].qty -= 1;
  simpanKeranjang();
  renderKeranjang();
}

function tambahQty(index) {
  keranjang[index].qty += 1;
  simpanKeranjang();
  renderKeranjang();
}

function hapusItem(index) {
  keranjang.splice(index, 1);
  simpanKeranjang();
  renderKeranjang();
}

function checkout() {
  if (keranjang.length === 0) {
    alert("Keranjang kosong!");
    return;
  }
  const total = keranjang.reduce((sum, item) => sum + item.price * item.qty, 0);
  const konfirmasi = confirm(`Total belanja: Rp${total.toLocaleString('id-ID')}\nLanjutkan checkout?`);
  if (konfirmasi) {
    keranjang = [];
    simpanKeranjang();
    renderKeranjang();
    alert("Checkout berhasil! Terima kasih sudah berbelanja.");
  }
}

renderKeranjang();

function navigate(homepage) {
  window.location.href = "homepage.html";
}
