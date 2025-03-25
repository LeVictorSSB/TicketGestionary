import { Router } from './router';
import { NavBar } from './Views/navBar';

// Point d'entrée de l'application
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');

  // Ajout de la barre de navigation
  app.appendChild(NavBar());

  // Ajout du conteneur pour le contenu principal
  const mainContainer = document.createElement('div');
  mainContainer.className = 'container mt-4';
  mainContainer.id = 'main-container';
  app.appendChild(mainContainer);

  // Initialisation du routeur
  const router = new Router(mainContainer);
  router.init();
});
