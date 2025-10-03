(function () {
    const MIN_TOKEN_LENGTH = 10;
  
    function redirectToLogin() {
      window.location.href = "login.html";
    }
  
    try {
      const raw = sessionStorage.getItem("adminSession");
      if (!raw) { redirectToLogin(); return; }
  
      const session = JSON.parse(raw);
      if (!session || !session.token || String(session.token).length < MIN_TOKEN_LENGTH) {
        redirectToLogin(); return;
      }
  
      if (!session.expiresAt || Date.now() > session.expiresAt) {
        sessionStorage.removeItem("adminSession");
        redirectToLogin(); return;
      }
  
      // Renovar validade por mais 30 minutos
      session.expiresAt = Date.now() + (1000 * 60 * 30);
      sessionStorage.setItem("adminSession", JSON.stringify(session));
  
    } catch (err) {
      redirectToLogin();
    }
  })();
  