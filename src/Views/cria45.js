import { TableController } from '../Controllers/table';

export function Cria45View() {
  const view = document.createElement('div');
  view.className = 'table-view';

  // Titre
  const title = document.createElement('h4');
  title.textContent = 'Liste des Tickets';
  title.className = 'mb-3';

  // Barre de recherche et bouton de création
  const searchContainer = document.createElement('div');
  searchContainer.className = 'search-container row';
  searchContainer.innerHTML = `
    <div class="col-md-4 mb-3">
      <div class="input-group">
        <span class="input-group-text"><i class="fas fa-search"></i></span>
        <input type="text" id="search-id" class="form-control" placeholder="Rechercher par ID">
      </div>
    </div>
    <div class="col-md-4 mb-3">
      <div class="input-group">
        <span class="input-group-text"><i class="fas fa-user"></i></span>
        <input type="text" id="search-name" class="form-control" placeholder="Rechercher par Bénéficiaire / Structure">
      </div>
    </div>
    <div class="col-md-4 mb-3 d-flex justify-content-end">
      <button id="btn-create-ticket" class="btn btn-success me-2">
        <i class="fas fa-plus"></i> Créer un ticket
      </button>
      <button id="btn-admin-panel" class="btn btn-danger" onclick="window.location.href='/cria45-admin'">
        <i class="fas fa-tools"></i> Zone d'Administration
      </button>
    </div>
  `;

  // Tableau des tickets
  const tableContainer = document.createElement('div');
  tableContainer.className = 'table-container';
  tableContainer.innerHTML = `
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Créé le</th>
          <th>Distribution prise en charge par</th>
          <th>Bénéficiaire</th>
          <th>Utilisé le</th>
          <th>Statut</th>
        </tr>
      </thead>
      <tbody id="tickets-table-body">
        <!-- Les tickets seront ajoutés ici dynamiquement -->
      </tbody>
    </table>
  `;

  // Modals pour les différentes actions
  const modalsContainer = document.createElement('div');
  modalsContainer.innerHTML = `
    <!-- Modal pour créer un ticket -->
    <div class="modal fade" id="createTicketModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Créer un nouveau ticket</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form id="create-ticket-form" class="modal-form">
              <div class="form-group">
                <label for="distributeur">Nom du distributeur</label>
                <input type="text" class="form-control" id="distributeur" required>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
            <button type="button" class="btn btn-primary" id="submit-create-ticket">Créer</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Assemblage de la vue
  view.appendChild(title);
  view.appendChild(searchContainer);
  view.appendChild(tableContainer);
  view.appendChild(modalsContainer);

  // Fonction pour mettre à jour la vue avec les données actuelles
  function updateView(tickets = null) {
    const tableBody = view.querySelector('#tickets-table-body');
    tableBody.innerHTML = '';

    const ticketsToDisplay = tickets || controller.getAllTickets();

    if (ticketsToDisplay.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center">Aucun ticket trouvé</td>
        </tr>
      `;
      return;
    }

    ticketsToDisplay.forEach((ticket) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${ticket.id}</td>
        <td>${controller.formatDate(ticket.dateCreation)}</td>
        <td>${ticket.distributeur}</td>
        <td>${ticket.particulier || '-'}</td>
        <td>${controller.formatDate(ticket.dateUtilisation)}</td>
        <td>
          <span class="ticket-status ${ticket.statut}">
            ${controller.getStatusLabel(ticket)}
          </span>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Initialisation du contrôleur
  const controller = new TableController(updateView);

  // Une fois la vue ajoutée au DOM
  setTimeout(() => {
    // Initialisation des modals Bootstrap
    Array.from(view.querySelectorAll('.modal')).forEach((modalEl) => {
      new bootstrap.Modal(modalEl); // Removed unused variable 'modal'
      preventModalCloseOnEnter(modalEl); // Prevent modal close on Enter key
    });

    // Écouteur pour le bouton de création de ticket
    view.querySelector('#btn-create-ticket').addEventListener('click', () => {
      const createModal = new bootstrap.Modal(view.querySelector('#createTicketModal'));
      createModal.show();
    });

    // Écouteur pour la soumission du formulaire de création
    view.querySelector('#submit-create-ticket').addEventListener('click', () => {
      const distributeur = view.querySelector('#distributeur').value.trim();
      if (distributeur) {
        controller.createTicket(distributeur);
        bootstrap.Modal.getInstance(view.querySelector('#createTicketModal')).hide();
        view.querySelector('#create-ticket-form').reset();
      }
    });

    // Fonction pour empêcher la fermeture des modals avec la touche Entrée
    function preventModalCloseOnEnter(modalElement) {
      modalElement.addEventListener('keydown', (event) => { // Changed to arrow function
        if (event.key === 'Enter') {
          event.preventDefault();
          event.stopPropagation();
        }
      });
    }

    // Écouteurs pour les barres de recherche
    view.querySelector('#search-id').addEventListener('input', (e) => {
      const searchValue = e.target.value.trim();
      if (searchValue) {
        const results = controller.searchById(searchValue);
        updateView(results);
      } else {
        updateView();
      }
    });

    view.querySelector('#search-name').addEventListener('input', (e) => {
      const searchValue = e.target.value.trim();
      if (searchValue) {
        const results = controller.searchByName(searchValue);
        updateView(results);
      } else {
        updateView();
      }
    });

    // Affichage initial des tickets
    updateView();
  }, 0);

  return view;
}
