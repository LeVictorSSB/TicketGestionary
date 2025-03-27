import { TableController } from '../Controllers/table';

export function Cria45ViewAdmin() {
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
      <button id="btn-admin-panel" class="btn btn-primary" onclick="window.location.href='/cria45'">
        <i class="fas fa-tools"></i> Retour Espace CRIA45
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
          <th>Actions</th>
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

    <!-- Modal pour utiliser un ticket -->
    <div class="modal fade" id="useTicketModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Valider l'utilisation du ticket</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <p>Êtes-vous sûr de vouloir marquer ce ticket comme utilisé ?</p>
            <input type="hidden" id="use-ticket-id">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
            <button type="button" class="btn btn-success" id="submit-use-ticket">Valider l'utilisation</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal pour supprimer un ticket -->
    <div class="modal fade" id="deleteTicketModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmer la suppression du ticket</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <p>Êtes-vous sûr de vouloir supprimer définitivement ce ticket ?</p>
            <input type="hidden" id="delete-ticket-id">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
            <button type="button" class="btn btn-danger" id="submit-delete-ticket">Supprimer</button>
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
              Forcer l'Assignation
            </button>
          ` : ''}
          ${ticket.statut === 'assigned' ? `
            <button class="btn btn-sm btn-success btn-use" data-id="${ticket.id}">
              Forcer la Validation de l'Utilisation
            </button>
          ` : ''}
          <button class="btn btn-sm btn-danger btn-delete" data-id="${ticket.id}">
            Supprimer
          </button>
        </td>
      `;
      tableBody.appendChild(row);
    });

    // Ajoute les écouteurs pour les boutons d'action
    addActionListeners();
  }

  // Initialisation du contrôleur
  const controller = new TableController(updateView);

  // Fonction pour empêcher la fermeture des modals lors de l'appui sur "Enter"
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
        preventModalCloseOnEnter(view.querySelector('#assignTicketModal'));
        assignModal.show();
      });
    });

    // Boutons pour valider l'utilisation d'un ticket
    view.querySelectorAll('.btn-use').forEach((button) => {
      button.addEventListener('click', () => {
        const ticketId = button.getAttribute('data-id');
        view.querySelector('#use-ticket-id').value = ticketId;
        const useModal = new bootstrap.Modal(view.querySelector('#useTicketModal'));
        preventModalCloseOnEnter(view.querySelector('#useTicketModal'));
        useModal.show();
      });
    });

    // Boutons pour supprimer un ticket
    view.querySelectorAll('.btn-delete').forEach((button) => {
      button.addEventListener('click', () => {
        const ticketId = button.getAttribute('data-id');
        view.querySelector('#delete-ticket-id').value = ticketId;
        const deleteModal = new bootstrap.Modal(view.querySelector('#deleteTicketModal'));
        preventModalCloseOnEnter(view.querySelector('#deleteTicketModal'));
        deleteModal.show();
      });
    });
  }

  // Une fois la vue ajoutée au DOM
  setTimeout(() => {
    // Initialisation des modals Bootstrap
    Array.from(view.querySelectorAll('.modal')).forEach((modalEl) => {
      new bootstrap.Modal(modalEl);
      preventModalCloseOnEnter(modalEl);
    });

    // Écouteur pour le bouton de création de ticket
    view.querySelector('#btn-create-ticket').addEventListener('click', () => {
      const createModal = new bootstrap.Modal(view.querySelector('#createTicketModal'));
      preventModalCloseOnEnter(view.querySelector('#createTicketModal'));
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

    // Écouteur pour la validation d'utilisation
    view.querySelector('#submit-use-ticket').addEventListener('click', () => {
      const ticketId = view.querySelector('#use-ticket-id').value;
      if (ticketId) {
        controller.useTicket(ticketId);
        bootstrap.Modal.getInstance(view.querySelector('#useTicketModal')).hide();
      }
    });

    // Écouteur pour la suppression de ticket
    view.querySelector('#submit-delete-ticket').addEventListener('click', () => {
      const ticketId = view.querySelector('#delete-ticket-id').value;
      if (ticketId) {
        controller.deleteTicket(ticketId);
        bootstrap.Modal.getInstance(view.querySelector('#deleteTicketModal')).hide();
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
