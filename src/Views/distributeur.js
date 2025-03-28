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
          <th>ID (Numéro)</th>
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

  // Modals
  const modalsContainer = document.createElement('div');
  modalsContainer.innerHTML = `
    <!-- Modal pour assigner un ticket -->
    <div class="modal fade" id="assignTicketModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Assigner le ticket à un bénéficiaire</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form id="assign-ticket-form" class="modal-form">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="particulier" class="form-label">Nom du bénéficiaire</label>
                  <input type="text" class="form-control" id="particulier" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="dateNaissance" class="form-label">Date de Naissance</label>
                  <input type="date" class="form-control" id="dateNaissance" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="adresse" class="form-label">Adresse</label>
                  <input type="text" class="form-control" id="adresse" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="situationProfessionnelle" class="form-label">Situation Professionnelle</label>
                  <input type="text" class="form-control" id="situationProfessionnelle" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="genre" class="form-label">Genre</label>
                  <select class="form-select" id="genre" required>
                    <option value="">Sélectionner un genre</option>
                    <option value="Homme">Homme</option>
                    <option value="Femme">Femme</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="besoinIdentifieNumerique" class="form-label">Besoin Numérique</label>
                  <input type="text" class="form-control" id="besoinIdentifieNumerique" required>
                </div>
              </div>
              <input type="hidden" id="assign-ticket-id">
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
            <button type="button" class="btn btn-primary" id="submit-assign-ticket">Assigner</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal pour voir les détails du ticket -->
    <div class="modal fade" id="ticketDetailsModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Détails du Bénéficiaire</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Nom du Particulier</label>
                <p id="details-particulier" class="form-control-plaintext"></p>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Date de Naissance</label>
                <p id="details-dateNaissance" class="form-control-plaintext"></p>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Adresse</label>
                <p id="details-adresse" class="form-control-plaintext"></p>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Situation Professionnelle</label>
                <p id="details-situationProfessionnelle" class="form-control-plaintext"></p>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Genre</label>
                <p id="details-genre" class="form-control-plaintext"></p>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Besoin Identifié Numérique</label>
                <p id="details-besoinIdentifieNumerique" class="form-control-plaintext"></p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
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
          <div class="d-flex align-items-center justify-content-between">
            <span class="ticket-status ${ticket.statut} me-2">
              ${controller.getStatusLabel(ticket)}
            </span>
            <div style="width: 40px; text-align: center;">
              ${ticket.statut === 'assigned'
    ? `<button class="btn btn-sm btn-link p-0 text-secondary btn-view-details" data-id="${ticket.id}" style="opacity: 0.7;">
    <i class="fas fa-eye"></i>
                </button>`
    : ''}
            </div>
          </div>
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
        preventModalCloseOnEnter(view.querySelector('#assignTicketModal'));
        assignModal.show();
      });
    });

    // Boutons pour voir les détails du ticket
    view.querySelectorAll('.btn-view-details').forEach((button) => {
      button.addEventListener('click', () => {
        const ticketId = button.getAttribute('data-id');
        const ticket = controller.getTicketById(ticketId);

        // Populate the modal with ticket details
        view.querySelector('#details-particulier').textContent = ticket.particulier || '';
        view.querySelector('#details-dateNaissance').textContent = ticket.dateNaissance || '';
        view.querySelector('#details-adresse').textContent = ticket.adresse || '';
        view.querySelector('#details-situationProfessionnelle').textContent = ticket.situationProfessionnelle || '';
        view.querySelector('#details-genre').textContent = ticket.genre || '';
        view.querySelector('#details-besoinIdentifieNumerique').textContent = ticket.besoinIdentifieNumerique || '';

        const detailsModal = new bootstrap.Modal(view.querySelector('#ticketDetailsModal'));
        preventModalCloseOnEnter(view.querySelector('#ticketDetailsModal'));
        detailsModal.show();
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

    // Écouteur pour la soumission du formulaire d'assignation
    view.querySelector('#submit-assign-ticket').addEventListener('click', () => {
      const ticketId = view.querySelector('#assign-ticket-id').value;
      const particulier = view.querySelector('#particulier').value.trim();
      const dateNaissance = view.querySelector('#dateNaissance').value;
      const adresse = view.querySelector('#adresse').value.trim();
      const situationProfessionnelle = view.querySelector('#situationProfessionnelle').value.trim();
      const genre = view.querySelector('#genre').value;
      const besoinIdentifieNumerique = view.querySelector('#besoinIdentifieNumerique').value.trim();

      if (ticketId && particulier && dateNaissance && adresse
        && situationProfessionnelle && genre && besoinIdentifieNumerique) {
        controller.assignTicket(
          ticketId,
          particulier,
          dateNaissance,
          adresse,
          situationProfessionnelle,
          genre,
          besoinIdentifieNumerique
        );
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
