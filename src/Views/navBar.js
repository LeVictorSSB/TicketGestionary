export function NavBar() {
  const navbar = document.createElement('nav');
  navbar.className = 'navbar navbar-expand-lg navbar-dark bg-primary';

  const path = window.location.pathname;

  let title = "<h2>Pass d'Autonomie Numérique</h2>";
  if (path.includes('/cria45')) {
    title += 'Espace C2B#CRIA45';
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
            <a class="nav-link" href="/" data-link>Tableau des Tickets</a>
          </li>
        </ul>
        <img src="https://files.catbox.moe/bt6qh4.png" alt="Reso Logo" class="navbar-logo" style="height: 80px;">
        ${additionalImage}
      </div>
    </div>
  `;

  return navbar;
}
