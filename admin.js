// Lista manual dos arquivos da pasta "codes"
// Você pode atualizar sempre que colocar novos
const files = [
  { name: "Códigos", file: "codes/codes.zip" },
];

const fileList = document.getElementById("file-list");

files.forEach(f => {
  const card = document.createElement("div");
  card.classList.add("file-card");
  card.innerHTML = `
    <span>${f.name}</span>
    <a href="${f.file}" download>Baixar</a>
  `;
  fileList.appendChild(card);
});

// logout.js
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
          // Remove dados de login (se houver)
          localStorage.removeItem("loggedIn");
          sessionStorage.removeItem("loggedIn");

          // Redireciona para o index.html
          window.location.href = "index.html";
      });
  }
});
