// Usuários e senhas
const users = {
    "Bruno": "Bak33542772",
    "Tiago": "123789",
    "Matheus": "matheus123"
  };
  
  const form = document.getElementById("login-form");
  const errorMsg = document.getElementById("error-msg");
  
  function generateToken() {
    const arr = new Uint8Array(16);
    window.crypto.getRandomValues(arr);
    return Array.from(arr).map(b => b.toString(16).padStart(2, "0")).join("");
  }
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
  
    if (users[username] && users[username] === password) {
      const token = generateToken();
      const expiresAt = Date.now() + (1000 * 60 * 30); // 30 min
      const session = { user: username, token, expiresAt };
  
      sessionStorage.setItem("adminSession", JSON.stringify(session));
  
      window.location.href = "admin.html";
    } else {
      errorMsg.textContent = "Usuário ou senha inválidos!";
    }
  });
  