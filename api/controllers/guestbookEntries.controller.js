const guestbookEntriesService = require('../services/guestbookEntries.service');

exports.getGuestbookEntries = async (req, res) => {
    try {
        let data = await guestbookEntriesService.getGuestbookEntries();
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des comptes clients");
    }
}

exports.addGuestbookEntry = async (req, res) => {
    try {
        let data = await guestbookEntriesService.addGuestbookEntry(req.body);
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de l'ajout de l'entrée du livre d'or");
    }
}

exports.getGuestbookEntriesByCustomerId = async (req, res) => {
    try {
        let data = await guestbookEntriesService.getGuestbookEntriesByCustomerId(req.params.customer_id);
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des entrées du livre d'or");
    }
}

exports.updateGuestbookEntry = async (req, res) => {
    try {
        let data = await guestbookEntriesService.updateGuestbookEntry(req.body);
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la mise à jour de l'entrée du livre d'or");
    }
}

exports.deleteGuestbookEntry = async (req, res) => {
    try {
        let data = await guestbookEntriesService.deleteGuestbookEntry(req.params.id);
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la suppression de l'entrée du livre d'or");
    }
}