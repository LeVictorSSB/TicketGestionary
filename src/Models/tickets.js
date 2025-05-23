export class TicketModel {
  constructor() {
    this.tickets = JSON.parse(localStorage.getItem('tickets')) || [];
  }

  // Sauvegarde des tickets dans le localStorage
  saveTickets() {
    localStorage.setItem('tickets', JSON.stringify(this.tickets));
  }

  // Génère un ID unique pour un nouveau ticket
  generateUniqueId() {
    const part1 = Math.floor(1000 + Math.random() * 9000).toString(); // 4 digits
    const part2 = Math.floor(1000 + Math.random() * 9000).toString(); // 4 digits
    return `${part1}-${part2}`;
  }

  // Création d'un nouveau ticket
  createTicket(distributeur) {
    const newTicket = {
      id: this.generateUniqueId(),
      distributeur,
      dateCreation: new Date().toISOString(),
      particulier: null,
      dateNaissance: null,
      adresse: null,
      situationProfessionnelle: null,
      genre: null,
      besoinIdentifieNumerique: null,
      dateUtilisation: null,
      statut: 'created' // 'created', 'assigned', ou 'used'
    };

    this.tickets.push(newTicket);
    this.saveTickets();
    return newTicket;
  }

  // Assignation d'un ticket à un particulier
  assignTicket(
    id,
    particulier,
    dateNaissance,
    adresse,
    situationProfessionnelle,
    genre,
    besoinIdentifieNumerique
  ) {
    const ticket = this.tickets.find((t) => t.id === id);
    if (ticket) {
      ticket.particulier = particulier;
      ticket.dateNaissance = dateNaissance;
      ticket.adresse = adresse;
      ticket.situationProfessionnelle = situationProfessionnelle;
      ticket.genre = genre;
      ticket.besoinIdentifieNumerique = besoinIdentifieNumerique;
      ticket.statut = 'assigned';
      this.saveTickets();
      return ticket;
    }
    return null;
  }

  // Validation de l'utilisation d'un ticket
  useTicket(id) {
    const ticket = this.tickets.find((t) => t.id === id);
    if (ticket) {
      ticket.dateUtilisation = new Date().toISOString();
      ticket.statut = 'used';
      this.saveTickets();
      return ticket;
    }
    return null;
  }

  // Récupération de tous les tickets
  getAllTickets() {
    return this.tickets;
  }

  // Recherche de tickets par ID
  searchById(id) {
    return this.tickets.filter((ticket) => ticket.id.toLowerCase().includes(id.toLowerCase()));
  }

  // Recherche de tickets par nom (distributeur ou particulier)
  searchByName(name) {
    return this.tickets.filter(
      (ticket) => (
        ticket.distributeur && ticket.distributeur.toLowerCase().includes(name.toLowerCase()))
      || (ticket.particulier && ticket.particulier.toLowerCase().includes(name.toLowerCase()))
    );
  }
}
