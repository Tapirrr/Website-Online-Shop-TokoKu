async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("../src/dataLogin.json");
  const data = await response.json();

  let berhasil = false;

  for (let i = 0; i < data.length; i++) {
    if (email === data[i].email && password === data[i].password) {
      sessionStorage.setItem("email", data[i].email);
      sessionStorage.setItem("profileImage", data[i].Image);

      berhasil = true;
      window.location.href = "homepage.html";
      break;
    }
  }

  if (!berhasil) {
    alert("email atau password salah!");
  }
}