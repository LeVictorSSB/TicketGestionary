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
  assignTicket(id, particulier) {
    const ticket = this.ticketModel.assignTicket(id, particulier);
    this.updateView();
    return ticket;
  }

  // Valide l'utilisation d'un ticket
  useTicket(id) {
    const ticket = this.ticketModel.useTicket(id);
    this.updateView();
    return ticket;
  }

  // Recherche des tickets par ID
  searchById(id) {
    return this.ticketModel.searchById(id);
  }

  // Recherche des tickets par nom
  searchByName(name) {
    return this.ticketModel.searchByName(name);
  }

  // Formate la date pour l'affichage
  formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Retourne le statut formaté pour l'affichage
  getStatusLabel(ticket) {
    const statusMap = {
      'created': 'Créé',
      'assigned': 'Assigné',
      'used': 'Utilisé'
    };
    return statusMap[ticket.statut] || ticket.statut;
  }
}
