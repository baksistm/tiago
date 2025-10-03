function logout() {
    sessionStorage.removeItem("adminSession");
    window.location.href = "login.html";
  }
  
  // Adiciona botão ao rodapé
  const footer = document.querySelector('.admin-footer');
  if (footer) {
    const btn = document.createElement('button');
    btn.textContent = 'Sair';
    btn.style.marginLeft = '10px';
    btn.style.padding = '5px 10px';
    btn.style.border = 'none';
    btn.style.borderRadius = '6px';
    btn.style.cursor = 'pointer';
    btn.style.background = '#f97316';
    btn.style.color = '#fff';
    btn.onclick = logout;
    footer.appendChild(btn);
  }
  