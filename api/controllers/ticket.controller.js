const ticketService = require('../services/ticket.service');

exports.getTickets = async (req, res) => {
    try {
        let data = await ticketService.getTickets();
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des tickets");
    }
}

exports.getTicketsAnimationCategories = async (req, res) => {
    try {
        let data = await ticketService.getTicketsAnimationCategories();
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des catégories d'animation des tickets");
    }
}

exports.getTicketsAgeCategories = async (req, res) => {
    try {
        let data = await ticketService.getTicketsAgeCategories();
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des catégories d'âge des tickets");
    }
}

exports.getTicketPrices = async (req, res) => {
    try {
        let data = await ticketService.getTicketPrices();
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération du prix du ticket");
    }
}

exports.addTickets = async (req, res) => {
    try {
        let data = await ticketService.addTickets(req.body);
        return res.status(201).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de l'ajout du ticket");
    }
}

exports.deleteTicket = async (req, res) => {
    try {
        let data = await ticketService.deleteTicket(req.body.ticket_id);
        return res.status(204).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la suppression du ticket");
    }
}

exports.getTicketById = async (req, res) => {
    try {
        let data = await ticketService.getTicketById(req.params.id);
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération du ticket par ID");
    }
}

exports.getTicketPricesPriceById = async (req, res) => {
    try {
        let data = await ticketService.getTicketPricesPriceById(req.params.id);
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération du prix du ticket par ID");
    }
}

exports.getTicketPriceByCategories = async (req, res) => {
    try {
        let data = await ticketService.getTicketPriceByCategories(req.params.animationCategoryId, req.params.ageCategoryId);
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération du prix du ticket par catégories");
    }
}

exports.getTicketsAnimationCategoryById = async (req, res) => {
    try {
        let data = await ticketService.getTicketsAnimationCategoryById(req.params.id);
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération de la catégorie d'animation du ticket par ID");
    }
}

exports.getTicketsAgeCategoryById = async (req, res) => {
    try {
        let data = await ticketService.getTicketsAgeCategoryById(req.params.id);
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération de la catégorie d'âge du ticket par ID");
    }
}

exports.getTicketsByCustomerId = async (req, res) => {
    try {
        let data = await ticketService.getTicketsByCustomerId(req.params.customerId);
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des tickets par ID client");
    }
}