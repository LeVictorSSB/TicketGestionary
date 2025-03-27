import { TableController } from '../Controllers/table';

export function DistributeurView() {
  const view = document.createElement('div');
  view.className = 'table-view';

  // Titre avant le tableau
  const title = document.createElement('h4');
  title.textContent = 'Liste des Tickets';

  // Barre de recherche simplifiée
  const searchContainer = document.createElement('div');
  searchContainer.className = 'search-container row';
  searchContainer.innerHTML = `
    <div class="col-md-6 mb-3">
      <div class="input-group">
        <span class="input-group-text"><i class="fas fa-search"></i></span>
        <input type="text" id="search-id" class="form-control" placeholder="Rechercher par ID">
      </div>
    </div>
    <div class="col-md-6 mb-3">
      <div class="input-group">
        <span class="input-group-text"><i class="fas fa-search"></i></span>
        <input type="text" id="search-name" class="form-control" placeholder="Rechercher par Bénéficiaire / Structure">
      </div>
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
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="tickets-table-body">
        <!-- Les tickets seront ajoutés ici dynamiquement -->
      </tbody>
    </table>
  `;

  // Modal pour assigner un ticket
  const modalsContainer = document.createElement('div');
  modalsContainer.innerHTML = `
    <!-- Modal pour assigner un ticket -->
    <div class="modal fade" id="assignTicketModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Assigner le ticket à un particulier</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form id="assign-ticket-form" class="modal-form">
              <div class="form-group">
                <label for="particulier">Nom du particulier</label>
                <input type="text" class="form-control" id="particulier" required>
                <input type="hidden" id="assign-ticket-id">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
            <button type="button" class="btn btn-primary" id="submit-assign-ticket">Assigner</button>
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
          <td colspan="7" class="text-center">Aucun ticket trouvé</td>
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
        <td>
          ${ticket.statut === 'created' ? `
            <button class="btn btn-sm btn-warning btn-assign" data-id="${ticket.id}">
              Assigner
            </button>
          ` : ''}
        </td>
      `;
      tableBody.appendChild(row);
    });

    // Ajoute les écouteurs pour les boutons d'action
    addActionListeners();
  }

  // Initialisation du contrôleur
  const controller = new TableController(updateView);

  // Fonction pour empêcher la fermeture des modals sur "Enter"
  function preventModalCloseOnEnter(modalElement) {
    modalElement.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
      }
    });
  }

  // Fonction pour ajouter les écouteurs d'événements aux boutons d'action
  function addActionListeners() {
    // Boutons pour assigner un ticket
    view.querySelectorAll('.btn-assign').forEach((button) => {
      button.addEventListener('click', () => {
        const ticketId = button.getAttribute('data-id');
        view.querySelector('#assign-ticket-id').value = ticketId;
        const assignModal = new bootstrap.Modal(view.querySelector('#assignTicketModal'));
        assignModal.show();
      });
    });
  }

  // Une fois la vue ajoutée au DOM
  setTimeout(() => {
    // Initialisation des modals Bootstrap
    Array.from(view.querySelectorAll('.modal')).forEach((modalEl) => {
      new bootstrap.Modal(modalEl);
      preventModalCloseOnEnter(modalEl); // Appliquer la fonction à chaque modal
    });

    // Écouteur pour la soumission du formulaire d'assignation
    view.querySelector('#submit-assign-ticket').addEventListener('click', () => {
      const particulier = view.querySelector('#particulier').value.trim();
      const ticketId = view.querySelector('#assign-ticket-id').value;
      if (particulier && ticketId) {
        controller.assignTicket(ticketId, particulier);
        bootstrap.Modal.getInstance(view.querySelector('#assignTicketModal')).hide();
        view.querySelector('#assign-ticket-form').reset();
      }
    });

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
