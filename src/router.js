import { Cria45View } from './Views/cria45';
import { LoginView } from './Views/login';
import { RecepteurView } from './Views/recepteur';
import { DistributeurView } from './Views/distributeur';
import { Error404 } from './Controllers/error-404';
import { Acceuil } from './Controllers/acceuil'; // Import the Acceuil controller

export class Router {
  constructor(container) {
    this.container = container;
    this.routes = {
      '/': Acceuil, // Set Acceuil as the view for the '/' route
      '/login': LoginView,
      '/cria45': Cria45View,
      '/distributeur': DistributeurView,
      '/recepteur': RecepteurView,
      404: Error404
    };

    // Pour gérer la navigation via l'historique du navigateur
    window.addEventListener('popstate', () => this.handleRoute());
  }

  init() {
    // Traite la route initiale
    this.handleRoute();

    // Gestion des liens pour la navigation interne
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-link]')) {
        e.preventDefault();
        this.navigateTo(e.target.href);
      }
    });
  }

  handleRoute() {
    const path = window.location.pathname || '/';
    const View = this.routes[path] || this.routes['404'];

    this.container.innerHTML = '';
    this.container.appendChild(View());
  }

  navigateTo(url) {
    history.pushState(null, null, url);
    this.handleRoute();
  }
}
