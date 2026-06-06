const email = sessionStorage.getItem("email") || "";
const profileImage = sessionStorage.getItem("profileImage");
const name = email.split("@")[0] || "Pengguna";
const initials = name.charAt(0).toUpperCase();

document.getElementById("user-email").textContent = email;
document.getElementById("user-name").textContent = name.charAt(0).toUpperCase() + name.slice(1);

// Kalau ada image, tampilkan foto — kalau tidak, tampilkan inisial
const avatarWrap = document.getElementById("avatar-wrap");
if (profileImage) {
  avatarWrap.innerHTML = `<img src="${profileImage}" class="w-full h-full object-cover rounded-full">`;
} else {
  document.getElementById("avatar-initials").textContent = initials;
}



    function logout() {
      if (confirm("Yakin mau logout?")) {
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("name");
        window.location.href = "homepage.html";
      }
    }
