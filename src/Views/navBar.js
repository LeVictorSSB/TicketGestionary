export function NavBar() {
  const navbar = document.createElement('nav');
  navbar.className = 'navbar navbar-expand-lg navbar-dark bg-primary';

  const path = window.location.pathname;

  let title = "Pass d'autonomie numérique";
  if (path.includes('/cria45')) {
    title += ' - C2B#CRIA45';
  } else if (path.includes('/distributeur')) {
    title += ' - Distributeur :';
  } else if (path.includes('/recepteur')) {
    title += ' - Récepteur:';
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
      </div>
    </div>
  `;

  return navbar;
}
