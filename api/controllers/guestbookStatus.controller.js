const guestbookStatusService = require('../services/guestbookStatus.service');

exports.getGuestbookStatus = async (req, res) => {
    try {
        let data = await guestbookStatusService.getGuestbookStatus();
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la récupération des comptes clients");
    }
}

exports.addGuestbookStatus = async (req, res) => {
    try {
        const { customer_id } = req.body;
        let data = await guestbookStatusService.addGuestbookStatus(customer_id);
        return res.status(data.status).json({ data: data.data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de l'ajout du statut du livre d'or");
    }
}

exports.modifyGuestbookStatus = async (req, res) => {
    try {
        const providerGuestbookStatus = req.body;
        let data = await guestbookStatusService.modifyGuestbookStatus(providerGuestbookStatus);
        return res.status(data.status).json({ data: data.data });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur lors de la modification du statut du livre d'or");
    }
}