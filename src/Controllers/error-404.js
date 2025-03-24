export function Error404() {
  const errorView = document.createElement('div');
  errorView.className = 'container text-center mt-5';

  errorView.innerHTML = `
    <div class="row">
      <div class="col-12">
        <h1 class="display-1">404</h1>
        <h2>Page non trouvée</h2>
        <p class="lead">La page que vous recherchez n'existe pas ou a été déplacée.</p>
        <a href="/" class="btn btn-primary">Retour à l'accueil</a>
      </div>
    </div>
  `;

  return errorView;
}
