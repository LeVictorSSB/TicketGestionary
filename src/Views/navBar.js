export function NavBar() {
  const navbar = document.createElement('nav');
  const path = window.location.pathname;

  if (path.includes('/cria45-admin')) {
    navbar.className = 'navbar navbar-expand-lg navbar-dark bg-danger'; // Red navbar
  } else {
    navbar.className = 'navbar navbar-expand-lg navbar-dark bg-primary'; // Default blue navbar
  }

  let title = "<h2>Pass d'Autonomie Numérique</h2>";
  if (path.includes('/cria45-admin')) {
    title = "<h2>Pass d'Autonomie Numérique - Zone d'Administration</h2>";
  } else if (path.includes('/cria45')) {
    title += '<span style="color:rgb(181, 180, 180);">Espace C2B#CRIA45</span>';
  } else if (path.includes('/distributeur')) {
    title += '<span style="color:rgb(181, 180, 180);">Espace Distributeur :</span> Emmaüs Connect';
  } else if (path.includes('/recepteur')) {
    title += '<span style="color:rgb(181, 180, 180);">Espace Récepteur :</span> Relais Numérique - Ingré';
  }

  let additionalImage = '';
  if (path.includes('/cria45')) {
    additionalImage = '';
  } else if (path.includes('/distributeur')) {
    additionalImage = '<img src="https://files.catbox.moe/mju5gf.svg" alt="Distributeur Logo" class="navbar-logo" style="height: 100px; margin-left: 10px;">';
  } else if (path.includes('/recepteur')) {
    additionalImage = '<img src="https://files.catbox.moe/ino85e.png" alt="Recepteur Logo" class="navbar-logo" style="height: 80px; margin-left: 10px;">';
  }

  navbar.innerHTML = `
    <div class="container">
      <a class="navbar-brand" href="/">${title}</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            
          </li>
        </ul>
        <img src="https://files.catbox.moe/bt6qh4.png" alt="Reso Logo" class="navbar-logo" style="height: 80px;">
        ${additionalImage}
      </div>
    </div>
  `;

  return navbar;
}
