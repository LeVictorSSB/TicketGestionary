export function NavBar() {
  const navbar = document.createElement('nav');
  navbar.className = 'navbar navbar-expand-lg navbar-dark bg-primary';

  navbar.innerHTML = `
    <div class="container">
      <a class="navbar-brand" href="/">Système de Tickets</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/" data-link>Tableau des Tickets</a>
          </li>
        </ul>
      </div>
    </div>
  `;

  return navbar;
}
