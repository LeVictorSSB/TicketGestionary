export function Acceuil() {
    const acceuilView = document.createElement('div');
    acceuilView.className = 'container text-center mt-5';
  
    acceuilView.innerHTML = `
      <div class="row">
        <div class="col-12">
          <h1 class="display-1"></h1>
          <h2 class="mt-4 mb-4">À quelle organisation appartenez-vous ?</h2>
          <p class="lead mt-4 mb-4">Vous serez redirigé vers la page de connexion correspondante.</p>
          <div class="d-flex justify-content-center mt-5">
            <a href="/cria45" class="btn btn-secondary btn-lg mx-2">C2B - CRIA45</a>
            <a href="/distributeur" class="btn btn-primary btn-lg mx-2">Structure Distributrice</a>
            <a href="/recepteur" class="btn btn-success btn-lg mx-2">Structure Réceptrice</a>
          </div>
        </div>
      </div>
    `;
  
    return acceuilView;
}
