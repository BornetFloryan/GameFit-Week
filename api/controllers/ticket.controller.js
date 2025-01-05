const ticketService = require('../services/ticket.service');

exports.getTickets = async (req, res) => {
    try {
        let data = await ticketService.getTickets();
        return res.state(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.state(500).send("Erreur lors de la récupération des tickets");
    }
}

exports.getTicketsAnimationCategories = async (req, res) => {
    try {
        let data = await ticketService.getTicketsAnimationCategories();
        return res.state(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.state(500).send("Erreur lors de la récupération des catégories d'animation des tickets");
    }
}

exports.getTicketsAgeCategories = async (req, res) => {
    try {
        let data = await ticketService.getTicketsAgeCategories();
        return res.state(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.state(500).send("Erreur lors de la récupération des catégories d'âge des tickets");
    }
}

exports.getTicketPrices = async (req, res) => {
    try {
        let data = await ticketService.getTicketPrices(req.body);
        return res.state(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.state(500).send("Erreur lors de la récupération du prix du ticket");
    }
}

exports.addTickets = async (req, res) => {
    try {
        let data = await ticketService.addTickets(req.body);
        return res.state(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.state(500).send("Erreur lors de l'ajout du ticket");
    }
}

exports.deleteTicket = async (req, res) => {
    try {
        let data = await ticketService.deleteTicket(req.body);
        return res.state(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.state(500).send("Erreur lors de la suppression du ticket");
    }
}


