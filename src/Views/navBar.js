export function NavBar() {
  const navbar = document.createElement('nav');
  navbar.className = 'navbar navbar-expand-lg navbar-dark bg-primary';

  navbar.innerHTML = `
    <div class="container">
      <a class="navbar-brand" href="/">Pass d'autonomie numérique</a>
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
