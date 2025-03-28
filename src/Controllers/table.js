import { TicketModel } from '../Models/tickets';

export class TableController {
  constructor(updateView) {
    this.ticketModel = new TicketModel();
    this.updateView = updateView;
  }

  // Récupère tous les tickets
  getAllTickets() {
    return this.ticketModel.getAllTickets();
  }

  // Crée un nouveau ticket
  createTicket(distributeur) {
    const newTicket = this.ticketModel.createTicket(distributeur);
    this.updateView();
    return newTicket;
  }

  // Assigne un ticket à un particulier
  assignTicket(
    id,
    particulier,
    dateNaissance,
    adresse,
    situationProfessionnelle,
    genre,
    besoinIdentifieNumerique
  ) {
    const ticket = this.ticketModel.assignTicket(
      id,
      particulier,
      dateNaissance,
      adresse,
      situationProfessionnelle,
      genre,
      besoinIdentifieNumerique
    );
    this.updateView();
    return ticket;
  }

  // Valide l'utilisation d'un ticket
  useTicket(id) {
    const ticket = this.ticketModel.useTicket(id);
    this.updateView();
    return ticket;
  }

  // Supprime un ticket par ID
  deleteTicket(id) {
    const index = this.ticketModel.tickets.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.ticketModel.tickets.splice(index, 1);
      this.ticketModel.saveTickets();
      this.updateView();
      return true;
    }
    return false;
  }

  // Recherche des tickets par ID
  searchById(id) {
    return this.ticketModel.searchById(id);
  }

  // Recherche des tickets par nom
  searchByName(name) {
    return this.ticketModel.searchByName(name);
  }

  // Formate la date pour l'affichage (sans l'heure)
  formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  // Retourne le statut formaté pour l'affichage
  getStatusLabel(ticket) {
    const statusMap = {
      created: 'Non assigné',
      assigned: 'Assigné',
      used: 'Utilisé'
    };
    return statusMap[ticket.statut] || ticket.statut;
  }

  // Récupération d'un ticket par ID
  getTicketById(ticketId) {
    // Convert ticketId to string to ensure consistent comparison
    const stringId = String(ticketId);

    // Find the ticket with the matching ID in the ticketModel's tickets
    const ticket = this.ticketModel.tickets.find((t) => String(t.id) === stringId);

    // If ticket is found, return an object with all the required details
    if (ticket) {
      return {
        id: ticket.id,
        particulier: ticket.particulier || null,
        dateNaissance: ticket.dateNaissance || null,
        adresse: ticket.adresse || null,
        situationProfessionnelle: ticket.situationProfessionnelle || null,
        genre: ticket.genre || null,
        besoinIdentifieNumerique: ticket.besoinIdentifieNumerique || null
      };
    }

    // Return null if no ticket is found
    return null;
  }
}
