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