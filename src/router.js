import { LoginView } from './Views/login';
import { TableView } from './Views/admin';
import { ValidationView } from './Views/validation';
import { AssignementView } from './Views/assignement';
import { Error404 } from './Controllers/error-404';

export class Router {
  constructor(container) {
    this.container = container;
    this.routes = {
      '/': Error404,
      '/login': LoginView,
      '/admin': TableView,
      '/assignement': AssignementView,
      '/validation': ValidationView,
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
